import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  Building2, 
  Clock, 
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PhoneRegistrationModal({ onRegistered }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  // 30-Second Timer upon opening website
  useEffect(() => {
    // Check if user is already registered in localStorage or dismissed in this session
    const isAlreadyRegistered = localStorage.getItem('aiw_registered_user_phone');
    const isDismissed = sessionStorage.getItem('aiw_phone_prompt_dismissed');

    if (isAlreadyRegistered || isDismissed) {
      return;
    }

    // Start 30-second delay timer
    const timerId = setTimeout(() => {
      // Re-check before showing in case registered in another tab
      if (!localStorage.getItem('aiw_registered_user_phone')) {
        setIsOpen(true);
      }
    }, 30000); // 30 seconds

    // Global hook for easy manual trigger or debugging
    window.openPhoneRegistrationModal = () => setIsOpen(true);

    return () => clearTimeout(timerId);
  }, []);

  // OTP resend countdown
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('aiw_phone_prompt_dismissed', 'true');
  };

  const validatePhone = (val) => {
    const clean = val.replace(/\D/g, '');
    // Valid Indian phone number: 10 digits starting with 6, 7, 8, or 9
    return /^[6-9]\d{9}$/.test(clean);
  };

  const handlePhoneInputChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    setPhone(val);
    if (errorMsg) setErrorMsg('');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');

    if (!cleanPhone) {
      setErrorMsg('Please enter your mobile phone number');
      return;
    }

    if (!validatePhone(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate OTP dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setResendTimer(30);
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input box
    if (value && index < 3) {
      const nextInput = document.getElementById(`phone-reg-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    
    // Accept demo OTP 1234 or any 4 digits
    if (enteredCode.length < 4) {
      setErrorMsg('Please enter the complete 4-digit verification code');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const cleanPhone = phone.replace(/\D/g, '');
    const userName = name.trim() || 'Verified Industrial Client';

    try {
      // 1. Register with backend API
      try {
        await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userName,
            phone: `+91 ${cleanPhone}`,
            email: `${cleanPhone}@user.allindiawarehouse.in`,
            role: 'occupier',
            company: ''
          })
        });
      } catch (backendErr) {
        console.warn('Backend registration notice:', backendErr);
      }

      // Also record as a verified registration lead
      try {
        await fetch('/api/marketplace/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userName,
            phone: `+91 ${cleanPhone}`,
            property_id: 'general-visitor-registration',
            property_title: 'All India Warehouse Visitor Registration (30s Prompt)',
            property_city: 'Pan-India',
            message: 'Visitor registered phone number after 30s site prompt.'
          })
        });
      } catch (leadErr) {}

      // 2. Store registration in local storage
      localStorage.setItem('aiw_registered_user_phone', `+91 ${cleanPhone}`);
      localStorage.setItem('aiw_registered_user_name', userName);
      
      const userObj = {
        name: userName,
        phone: `+91 ${cleanPhone}`,
        email: `${cleanPhone}@user.allindiawarehouse.in`,
        role: 'occupier',
        registeredAt: new Date().toISOString()
      };
      localStorage.setItem('aiw_auth_user', JSON.stringify(userObj));

      if (onRegistered) {
        onRegistered(userObj);
      }

      setIsSubmitting(false);
      setStep('success');
      triggerConfetti();

      // Auto close after 3.5s
      setTimeout(() => {
        handleClose();
      }, 3500);

    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Registration encountered an issue. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'aiwFadeIn 0.3s ease-out'
      }}
      onClick={handleClose}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '460px',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'aiwScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div style={{ height: '5px', background: 'linear-gradient(90deg, #0f2744 0%, #e11d48 100%)' }} />

        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
            transition: 'all 0.15s ease'
          }}
          aria-label="Close registration prompt"
        >
          <X size={18} />
        </button>

        <div style={{ padding: '24px 28px' }}>
          
          {/* STEP 1: Enter Phone Number */}
          {step === 'input' && (
            <div>
              {/* Badge & Title */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '12px' }}>
                <ShieldCheck size={14} />
                <span>VERIFIED BUYER & OCCUPIER ACCESS</span>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f2744', lineHeight: 1.25, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                Unlock Direct Owner Contacts & Daily Rate Updates
              </h2>

              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 18px 0', lineHeight: 1.45 }}>
                Enter your valid phone number to register and access verified warehouse listings across India.
              </p>

              {/* Benefits Checklist */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>
                  <Check size={14} color="#059669" strokeWidth={3} />
                  <span>Instant access to direct warehouse owner phone numbers</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#334155', fontWeight: 600, marginBottom: '6px' }}>
                  <Check size={14} color="#059669" strokeWidth={3} />
                  <span>Exclusive Grade-A rental rate sheets & availability</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                  <Check size={14} color="#059669" strokeWidth={3} />
                  <span>Instant WhatsApp alerts for newly posted industrial space</span>
                </div>
              </div>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px', lineHeight: 1.4 }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSendOtp}>
                {/* Optional Name */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Full Name / Company (Optional)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0 12px', background: '#ffffff', transition: 'border-color 0.2s' }}>
                    <User size={16} color="#94a3b8" style={{ marginRight: '8px', flexShrink: 0 }} />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar / ABC Logistics"
                      style={{ border: 'none', outline: 'none', width: '100%', height: '40px', fontSize: '0.88rem', color: '#0f172a' }}
                    />
                  </div>
                </div>

                {/* Valid Phone Number */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#0f2744', marginBottom: '6px' }}>
                    Mobile Number <span style={{ color: '#e11d48' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #0f2744', borderRadius: '8px', padding: '0 12px', background: '#ffffff', boxShadow: '0 1px 3px rgba(15,39,68,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', borderRight: '1px solid #e2e8f0', paddingRight: '8px', marginRight: '8px', fontWeight: 800, color: '#0f2744', fontSize: '0.88rem' }}>
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={handlePhoneInputChange}
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                      autoFocus
                      required
                      style={{ border: 'none', outline: 'none', width: '100%', height: '42px', fontSize: '0.94rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.02em' }}
                    />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
                    Must be a valid 10-digit Indian phone number
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '13px',
                    background: '#e11d48',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.35)',
                    transition: 'background 0.2s'
                  }}
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Register Phone Number</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.73rem', color: '#94a3b8' }}>
                  🔒 100% Secure • No spam • Direct Industrial Marketplace Access
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: Verify OTP */}
          {step === 'otp' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fee2e2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Lock size={22} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f2744', fontWeight: 800 }}>
                  Confirm Verification Code
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '6px' }}>
                  We sent a 4-digit code to <strong>+91 {phone}</strong>
                </p>
                <div style={{ display: 'inline-block', background: '#f1f5f9', border: '1px dashed #cbd5e1', padding: '3px 10px', borderRadius: '6px', fontSize: '0.76rem', color: '#475569', marginTop: '6px' }}>
                  Default Demo OTP: <strong style={{ color: '#0f2744' }}>1234</strong>
                </div>
              </div>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '14px', textAlign: 'center' }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleVerifyAndRegister}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
                  {[0, 1, 2, 3].map((idx) => (
                    <input 
                      key={idx}
                      id={`phone-reg-otp-${idx}`}
                      type="text"
                      maxLength="1"
                      value={otp[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      style={{
                        width: '52px',
                        height: '56px',
                        textAlign: 'center',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#0f2744',
                        border: '2px solid #cbd5e1',
                        borderRadius: '10px',
                        outline: 'none',
                        background: '#f8fafc'
                      }}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '13px',
                    background: '#0f2744',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isSubmitting ? 'Verifying & Registering...' : 'Verify & Complete Registration'}
                </button>

                <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748b' }}>
                  <button
                    type="button"
                    onClick={() => setStep('input')}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Change Number
                  </button>

                  <button 
                    type="button" 
                    disabled={resendTimer > 0} 
                    onClick={() => setResendTimer(30)}
                    style={{ background: 'none', border: 'none', color: resendTimer > 0 ? '#94a3b8' : '#e11d48', fontWeight: 700, cursor: resendTimer > 0 ? 'default' : 'pointer' }}
                  >
                    {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 14px rgba(22, 163, 74, 0.2)' }}>
                <CheckCircle2 size={36} />
              </div>

              <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#0f2744', fontWeight: 900 }}>
                Phone Number Registered!
              </h2>

              <p style={{ fontSize: '0.88rem', color: '#475569', marginTop: '8px', lineHeight: 1.5 }}>
                Your mobile number <strong style={{ color: '#0f2744' }}>+91 {phone}</strong> has been successfully verified & registered.
              </p>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '12px 14px', margin: '18px 0', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#15803d', fontWeight: 700, marginBottom: '4px' }}>
                  <Sparkles size={15} />
                  <span>Verified Features Now Active:</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#166534', lineHeight: 1.4 }}>
                  ✓ Direct Warehouse Owner Contacts Unlocked<br />
                  ✓ Instant Rate Consultation & WhatsApp Alerts<br />
                  ✓ 1-Hour Dedicated Logistics Advisor Support
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                Continue Browsing Warehouses
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
