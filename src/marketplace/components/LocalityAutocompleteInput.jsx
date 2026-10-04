import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Check, Building2 } from 'lucide-react';
import { searchLocalitiesInCity } from '../data/localitySearchHelper';

export default function LocalityAutocompleteInput({
  city = 'Chennai',
  selectedLocalities = [], // array of strings e.g. ['Porur', 'Ambattur'] or single string
  onChange, // callback (localitiesArray or singleString)
  placeholder = 'Search up to 3 localities or landmarks...',
  isMulti = false,
  autoFocus = false,
  inputHeight = '50px'
}) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Normalize selected values as an array
  const activeList = Array.isArray(selectedLocalities) 
    ? selectedLocalities 
    : (selectedLocalities ? [selectedLocalities] : []);

  // Update suggestions whenever city or inputValue changes
  useEffect(() => {
    const results = searchLocalitiesInCity(city, inputValue);
    setSuggestions(results);
    setHighlightedIndex(-1);
  }, [city, inputValue]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    if (isMulti) {
      if (!activeList.includes(item.name)) {
        const updated = [...activeList, item.name];
        if (onChange) onChange(updated);
      }
      setInputValue('');
    } else {
      setInputValue(item.name);
      if (onChange) onChange(item.name);
    }
    setIsOpen(false);
  };

  const handleRemoveChip = (name, e) => {
    if (e) e.stopPropagation();
    const updated = activeList.filter(l => l !== name);
    if (onChange) onChange(isMulti ? updated : (updated[0] || ''));
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      
      {/* Input container with chips and search icon */}
      <div 
        onClick={() => {
          if (inputRef.current) inputRef.current.focus();
          setIsOpen(true);
        }}
        style={{
          minHeight: inputHeight,
          background: '#f8fafc',
          border: isOpen ? '1.5px solid #004274' : '1.5px solid #cbd5e1',
          borderRadius: '10px',
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px',
          cursor: 'text',
          boxShadow: isOpen ? '0 0 0 3px rgba(0, 66, 116, 0.1)' : 'none',
          transition: 'all 0.15s ease'
        }}
      >
        <Search size={18} color="#64748b" style={{ flexShrink: 0, marginRight: '2px' }} />

        {/* Selected Locality Chips (Multi-Select Support) */}
        {isMulti && activeList.map((loc) => (
          <span
            key={loc}
            style={{
              background: '#e0f2fe',
              color: '#004274',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid #bae6fd'
            }}
          >
            <span>{loc}</span>
            <button
              type="button"
              onClick={(e) => handleRemoveChip(loc, e)}
              style={{
                background: 'none',
                border: 'none',
                color: '#004274',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 900
              }}
            >
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          autoFocus={autoFocus}
          placeholder={activeList.length === 0 ? placeholder : (isMulti ? 'Add more areas...' : '')}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
            if (!isMulti && onChange) {
              onChange(e.target.value);
            }
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            minWidth: '120px',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '0.94rem',
            fontWeight: 600,
            color: '#0f2744',
            padding: '6px 0'
          }}
        />

        {/* Clear Button */}
        {(inputValue || activeList.length > 0) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setInputValue('');
              if (onChange) onChange(isMulti ? [] : '');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Google Maps / NoBroker Style Suggestions Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.16)',
            zIndex: 1000,
            maxHeight: '320px',
            overflowY: 'auto',
            animation: 'aiwFadeIn 0.15s ease'
          }}
        >
          {suggestions.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '0.86rem' }}>
              No matching localities found in <strong>{city}</strong> for "{inputValue}"
            </div>
          ) : (
            <div>
              {suggestions.map((item, idx) => {
                const isSelected = activeList.includes(item.name);
                const isHighlighted = idx === highlightedIndex;

                return (
                  <div
                    key={item.name + idx}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    style={{
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      background: isHighlighted ? '#f1f5f9' : (isSelected ? '#f0fdf4' : '#ffffff'),
                      borderBottom: '1px solid #f8fafc',
                      transition: 'background 0.1s ease'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isSelected ? '#dcfce7' : '#f1f5f9',
                      color: isSelected ? '#15803d' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <MapPin size={16} color={isSelected ? '#15803d' : '#e11d48'} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        color: isSelected ? '#15803d' : '#0f2744',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.name}
                      </div>
                      <div style={{
                        fontSize: '0.74rem',
                        color: '#64748b',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.formatted}
                      </div>
                    </div>

                    {isSelected && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Check size={14} />
                        <span>Selected</span>
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Bottom "powered by Google" strip (Exact NoBroker format) */}
              <div style={{
                padding: '8px 16px',
                background: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '6px',
                fontSize: '0.72rem',
                color: '#94a3b8',
                fontWeight: 600
              }}>
                <span>verified places in {city}</span>
                <span>•</span>
                <span style={{ color: '#4285F4', fontWeight: 800 }}>G</span>
                <span style={{ color: '#EA4335', fontWeight: 800 }}>o</span>
                <span style={{ color: '#FBBC05', fontWeight: 800 }}>o</span>
                <span style={{ color: '#4285F4', fontWeight: 800 }}>g</span>
                <span style={{ color: '#34A853', fontWeight: 800 }}>l</span>
                <span style={{ color: '#EA4335', fontWeight: 800 }}>e</span>
                <span>Maps Places</span>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
