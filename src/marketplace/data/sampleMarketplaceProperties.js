// Seed sample data for All India Warehouse & Industrial Real Estate Classifieds Portal
// Compliant with "All India Warehouse - Property Listing Portal Requirements and TypeScript Technical Specification"

export const CATEGORIES_DATA = {
  INDUSTRIAL: {
    label: "Industrial",
    subTypes: ["Factory", "Industrial shed", "Industrial plot", "Manufacturing unit"]
  },
  WAREHOUSE: {
    label: "Warehouse",
    subTypes: ["Warehouse/Godown", "Logistics park", "Bonded warehouse", "Cold storage"]
  },
  LAND: {
    label: "Land",
    subTypes: ["Industrial land", "Commercial land", "Agricultural land", "Residential plot"]
  },
  OFFICE: {
    label: "Office",
    subTypes: ["Office space", "Co-working", "IT/Business park unit", "Showroom/Shop"]
  }
};

export const STATES_LIST = [
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Telangana",
  "Gujarat",
  "Haryana",
  "Delhi NCR"
];

export const CITIES_BY_STATE = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Hosur", "Salem", "Tiruppur"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Haryana": ["Gurugram", "Faridabad", "Sonipat"],
  "Delhi NCR": ["Delhi", "Noida", "Greater Noida", "Ghaziabad"]
};

export const LOCALITIES_BY_CITY = {
  "Chennai": [
    "Porur",
    "Sriperumbudur",
    "Oragadam",
    "Ambattur",
    "Guindy",
    "Madhavaram",
    "Redhills",
    "Poonamallee",
    "Maraimalai Nagar",
    "Thirumazhisai",
    "Ennore / Manali"
  ],
  "Bengaluru": [
    "Hoskote",
    "Nelamangala",
    "Peenya",
    "Bommasandra",
    "Dobbaspet",
    "Whitefield",
    "Devanahalli",
    "Electronic City"
  ],
  "Pune": [
    "Chakan MIDC",
    "Talegaon",
    "Ranjangaon",
    "Bhosari",
    "Hinjawadi",
    "Hadapsar",
    "Sanaswadi"
  ],
  "Mumbai": [
    "Bhiwandi",
    "Panvel",
    "Taloja",
    "Thane",
    "JNPT Port Area",
    "Vasai-Virar",
    "Vashi",
    "Mahape"
  ],
  "Hyderabad": [
    "Shamshabad Cargo",
    "Medchal",
    "Patancheru",
    "Kothur",
    "Adibatla",
    "Cherlapally"
  ],
  "Ahmedabad": [
    "Sanand GIDC",
    "Changodar",
    "Bavla",
    "Aslali",
    "Naroda"
  ],
  "Gurugram": [
    "Manesar Industrial Area",
    "Udyog Vihar",
    "Pataudi Road",
    "Sohna Road"
  ]
};

export const SAMPLE_MARKETPLACE_PROPERTIES = [
  // 1. Porur, Chennai - Warehouse for Rent
  {
    id: "aiw-prop-porur-01",
    code: "PROP-100245",
    slug: "prime-grade-a-distribution-warehouse-porur-chennai",
    title: "Prime Grade-A Distribution Warehouse near Mount-Poonamallee Trunk Road",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Warehouse/Godown",
    state: "Tamil Nadu",
    city: "Chennai",
    locality: "Porur",
    address: "Mount-Poonamallee High Road, Near Porur Toll Plaza, Chennai - 600116",
    pincode: "600116",
    landmark: "Behind Porur Junction, 12 mins to Chennai Bypass",
    area_sqft: 45000,
    totalArea: 45000,
    areaUnit: "SQFT",
    price_or_rent_psf: 32,
    monthlyRent: 1440000,
    deposit: 8640000,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "K. R. Natarajan (Landlord)",
    poster_phone: "+91 98840 12341",
    maskedPhone: "+91 98840 •••••",
    created_at: "2026-10-02T10:00:00.000Z",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 36,
      loadingDocks: 8,
      truckAccess: true,
      powerKva: 150,
      floorLoadTon: 6,
      roadWidthFt: 80,
      floors: 1,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "36 Ft Clear Height (PEB Structure)",
      dockCount: "8 Hydraulic Dock Levellers with Canopies",
      flooring: "FM2 Laser Screed Floor (6 Ton/m² Load Bearing)",
      powerCapacity: "150 kVA Dedicated Transformer + 100% DG Backup",
      fireSafety: "K-14 Early Suppression Fast Response (ESFR) Sprinklers + Fire Hydrant Ring",
      truckApron: "45-meter Concrete Truck Apron for 40ft Multi-Axle Trailers"
    },
    features: [
      "ESFR Fire Sprinklers",
      "8 Hydraulic Docks",
      "36 Ft Clear Height",
      "40ft Multi-Axle Container Access",
      "LED High Bay Lighting",
      "24x7 Gated Security & CCTV"
    ],
    amenities: ["ESFR Sprinklers", "Hydraulic Docks", "High Bay LED", "Security Cabin", "Rainwater Harvesting", "DG Backup"],
    description: "Exceptional Grade-A warehouse located in prime Porur corridor with zero water-logging history. Features 36 ft clear height, 8 hydraulic docks, FM2 heavy-duty flooring, and direct connectivity to Chennai Bypass, Outer Ring Road, and Chennai Port. Fully compliant with NBC fire safety standards."
  },

  // 2. Porur, Chennai - Heavy Industrial Manufacturing Shed for Sale
  {
    id: "aiw-prop-porur-02",
    code: "PROP-100246",
    slug: "heavy-industrial-manufacturing-shed-porur-chennai",
    title: "Heavy Industrial Manufacturing Shed with 10T Overhead Crane Provision",
    dealType: "SALE",
    purpose: "sale",
    propertyType: "INDUSTRIAL",
    type: "Industrial Shed",
    subType: "Factory",
    state: "Tamil Nadu",
    city: "Chennai",
    locality: "Porur",
    address: "Industrial Estate Extension, Porur Industrial Belt, Chennai - 600116",
    pincode: "600116",
    landmark: "5 mins from Chennai Bypass Junction",
    area_sqft: 28000,
    totalArea: 28000,
    areaUnit: "SQFT",
    price: 112000000,
    price_or_rent_psf: 4000,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "DEALER",
    poster_role: "dealer",
    poster_name: "Apex Industrial Realty (Verified Partner)",
    poster_phone: "+91 98840 98765",
    maskedPhone: "+91 98840 •••••",
    created_at: "2026-10-02T11:00:00.000Z",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 32,
      loadingDocks: 4,
      truckAccess: true,
      powerKva: 250,
      floorLoadTon: 8,
      roadWidthFt: 60,
      floors: 1,
      possessionStatus: "Immediate"
    },
    specs: {
      clearHeight: "32 Ft Clear Height with 10-Ton EOT Crane Gantry Beams",
      dockCount: "4 Drive-in Loading Bays",
      flooring: "Heavy Duty VDF Industrial Flooring",
      powerCapacity: "250 kVA HT Power Connection",
      fireSafety: "Fire Hydrant System with 1 Lakh Litre Overhead Sump",
      truckApron: "35-meter Apron for Heavy Commercial Vehicles"
    },
    features: [
      "10-Ton EOT Crane Ready",
      "250 kVA HT Power",
      "Heavy Duty VDF Floor",
      "CMDA & Fire NOC Approved",
      "Separate Admin Office Block",
      "Industrial Effluent Drainage"
    ],
    amenities: ["10T Crane Provision", "HT Power 250kVA", "Admin Block", "Workers Restroom", "CCTV Survelliance"],
    description: "Ready-to-occupy heavy engineering and manufacturing plant in Porur. Fitted with 10-Ton crane gantry girders, 250 kVA sanctioned HT power, 32 ft apex height, and concrete vehicular apron. 100% clear freehold title with all statutory approvals in place."
  },

  // 3. Sriperumbudur, Chennai - Mega Logistics Park for Rent
  {
    id: "aiw-prop-sriperumbudur-01",
    code: "PROP-100247",
    slug: "grade-a-mega-logistics-park-sriperumbudur-chennai",
    title: "1,20,000 Sq.Ft Grade-A Mega Logistics Hub on Chennai-Bengaluru Highway (NH-48)",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Logistics park",
    state: "Tamil Nadu",
    city: "Chennai",
    locality: "Sriperumbudur",
    address: "NH-48 National Highway Corridor, Sriperumbudur Industrial Hub, Chennai - 602105",
    pincode: "602105",
    landmark: "Direct Highway Frontage, Opposite Hyundai SIPCOT Zone",
    area_sqft: 120000,
    totalArea: 120000,
    areaUnit: "SQFT",
    price_or_rent_psf: 28,
    monthlyRent: 3360000,
    deposit: 20160000,
    negotiable: true,
    ownership: "LEASEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "DEALER",
    poster_role: "dealer",
    poster_name: "Trans-India Logistics Advisory",
    poster_phone: "+91 98400 54321",
    maskedPhone: "+91 98400 •••••",
    created_at: "2026-10-01T14:00:00.000Z",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 40,
      loadingDocks: 24,
      truckAccess: true,
      powerKva: 500,
      floorLoadTon: 8,
      roadWidthFt: 120,
      floors: 1,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "40 Ft Clear Height (Grade-A International Standard)",
      dockCount: "24 Docks with Automatic Dock Levellers & Seals",
      flooring: "Superflat FM2 Floor (8 Ton/m² Static Point Load)",
      powerCapacity: "500 kVA Substation on Site",
      fireSafety: "NFPA Standard ESFR Sprinklers + Smoke Evacuation Vents",
      truckApron: "55-meter Apron with Dedicated Trailer Parking (50+ Bays)"
    },
    features: [
      "24 Hydraulic Docks",
      "40 Ft Clear Height",
      "Direct NH-48 Highway Access",
      "50+ Trailer Parking Bays",
      "IGBC Green Platinum Certified",
      "Driver Canteen & Dormitory"
    ],
    amenities: ["24 Docks", "ESFR Sprinklers", "50 Trailer Bays", "Substation 500kVA", "IGBC Platinum", "Driver Dormitory"],
    description: "State-of-the-art mega distribution center in Sriperumbudur right on NH-48. Ideal for e-commerce giants, 3PL leaders, and electronics manufacturing supply chains. Zero downtime infrastructure with dual-source power and top-tier security."
  },

  // 4. Oragadam, Chennai - Industrial Land / Plot for Sale
  {
    id: "aiw-prop-oragadam-01",
    code: "PROP-100248",
    slug: "prime-industrial-land-oragadam-chennai",
    title: "5.5 Acres Approved Heavy Industrial Land with 100ft Road Width",
    dealType: "SALE",
    purpose: "sale",
    propertyType: "LAND",
    type: "Land",
    subType: "Industrial land",
    state: "Tamil Nadu",
    city: "Chennai",
    locality: "Oragadam",
    address: "Oragadam-Sriperumbudur 6-Lane Expressway, Chennai - 602105",
    pincode: "602105",
    landmark: "Near Daimler & Renault Nissan Automotive Park",
    area_sqft: 239580,
    totalArea: 5.5,
    areaUnit: "ACRE",
    price: 165000000,
    price_or_rent_psf: 688,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: false,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "Venkatesan Chettiar (Direct Owner)",
    poster_phone: "+91 94440 11223",
    maskedPhone: "+91 94440 •••••",
    created_at: "2026-09-28T09:30:00.000Z",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      roadWidthFt: 100,
      landType: "INDUSTRIAL",
      approval: "DTCP & SIPCOT Approved",
      possessionStatus: "Immediate",
      truckAccess: true
    },
    specs: {
      clearHeight: "High-Elevation Compound Wall Encased",
      dockCount: "Customized Plot Boundary Entry/Exit Gates",
      flooring: "Levelled Hard Rock Soil Base (Ready for Factory Construction)",
      powerCapacity: "Adjacent 110 kV TANGEDCO Substation Feeder Line",
      fireSafety: "Direct Access to SIPCOT Industrial Fire Station",
      truckApron: "100ft Wide Concrete Road Frontage"
    },
    features: [
      "DTCP Industrial Approval",
      "100ft Road Frontage",
      "High Soil Bearing Capacity",
      "Adjacent to 110kV Substation",
      "Clear Freehold Title Deed",
      "Zero Red-Tape Clearance"
    ],
    amenities: ["100ft Road Width", "High Soil Load", "TANGEDCO Feeder", "DTCP Approved", "Compound Wall"],
    description: "Prime 5.5-acre industrial plot on 6-lane Oragadam expressway. Rectangular shape with 350+ feet frontage, hard soil load-bearing capacity, and clear DTCP industrial zoning approval. Immediate title registration."
  },

  // 5. Ambattur, Chennai - IT / Industrial Commercial Office for Rent
  {
    id: "aiw-prop-ambattur-01",
    code: "PROP-100249",
    slug: "plug-and-play-commercial-office-ambattur-chennai",
    title: "Furnished 18,000 Sq.Ft Commercial IT & Logistics Corporate Office",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "OFFICE",
    type: "Commercial Office",
    subType: "Office space",
    state: "Tamil Nadu",
    city: "Chennai",
    locality: "Ambattur",
    address: "Ambattur Industrial Estate 3rd Main Road, Chennai - 600058",
    pincode: "600058",
    landmark: "Next to Ambattur Telephone Exchange & Bus Terminus",
    area_sqft: 18000,
    totalArea: 18000,
    areaUnit: "SQFT",
    price_or_rent_psf: 55,
    monthlyRent: 990000,
    deposit: 5940000,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: false,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "S. Balaji (Estate Administrator)",
    poster_phone: "+91 98841 87654",
    maskedPhone: "+91 98841 •••••",
    created_at: "2026-09-30T12:00:00.000Z",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      floors: 3,
      seats: 180,
      cabins: 8,
      powerKva: 100,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "11 Ft False Ceiling with Central HVAC",
      dockCount: "Ground Floor Loading Bay with Goods Lift",
      flooring: "Vitrified Tile & Anti-Static Carpet Flooring",
      powerCapacity: "100 kVA Dedicated Transformer with 100% DG Backup",
      fireSafety: "Smoke Detectors, Wet Riser & Fire Extinguishers on all floors",
      truckApron: "Reserved Parking for 30 Cars & 100 Two-Wheelers"
    },
    features: [
      "180 Workstations Installed",
      "8 Executive Cabins & Boardroom",
      "Centralized VRV Air Conditioning",
      "100% DG Power Backup",
      "2 Passenger Lifts + 1 Goods Lift",
      "Cafeteria & Server Room"
    ],
    amenities: ["Plug & Play", "Central HVAC", "100% DG Backup", "Goods Lift", "Cafeteria", "30 Car Parking"],
    description: "Fully furnished Grade-A corporate office in Ambattur Industrial Estate. Configured with 180 workstations, 8 cabins, 2 boardrooms, high-speed fiber lines, server room, and cafeteria. Ideal for supply chain tech companies and logistics headquarters."
  },

  // 6. Hoskote, Bengaluru - Temperature Controlled Cold Storage for Rent
  {
    id: "aiw-prop-hoskote-01",
    code: "PROP-100250",
    slug: "multi-chamber-cold-storage-facility-hoskote-bengaluru",
    title: "Multi-Chamber Temperature Controlled Cold Storage (-25°C to +15°C)",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Cold storage",
    state: "Karnataka",
    city: "Bengaluru",
    locality: "Hoskote",
    address: "Hoskote-Malur Industrial Corridor, Bengaluru Rural - 562114",
    pincode: "562114",
    landmark: "Direct Access to STRR (Satellite Town Ring Road)",
    area_sqft: 35000,
    totalArea: 35000,
    areaUnit: "SQFT",
    price_or_rent_psf: 65,
    monthlyRent: 2275000,
    deposit: 13650000,
    negotiable: false,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "DEALER",
    poster_role: "dealer",
    poster_name: "ColdChain India Real Estate",
    poster_phone: "+91 97410 33445",
    maskedPhone: "+91 97410 •••••",
    created_at: "2026-10-01T08:00:00.000Z",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 34,
      loadingDocks: 6,
      truckAccess: true,
      powerKva: 400,
      floorLoadTon: 6,
      roadWidthFt: 80,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "34 Ft Clear Height with Selective Cold Racking (5,000 Pallet Positions)",
      dockCount: "6 Temperature-Controlled Inflatable Dock Seals",
      flooring: "Insulated Polyurethane Screed Floor with Heating Grid",
      powerCapacity: "400 kVA Dedicated Line with N+1 Redundant Compressors",
      fireSafety: "Aspirating Smoke Detection (VESDA) + Dry Pipe Sprinklers",
      truckApron: "45-meter Concrete Staging Apron with Reefer Plug Points"
    },
    features: [
      "5,000 Pallet Racking Positions",
      "-25°C Deep Freeze to +15°C Chill",
      "6 Inflatable Air-Lock Docks",
      "24/7 Temperature Telemetry",
      "Reefer Truck Charging Points",
      "FSSAI & Pharma Compliant"
    ],
    amenities: ["5000 Pallets", "Air-lock Docks", "Reefer Plugs", "400kVA DG", "VESDA Fire System", "FSSAI Certified"],
    description: "World-class multi-commodity cold chain warehouse in Hoskote with multi-temperature zoning. Equipped with modern screw compressors, insulated docks, temperature data logging, and pharma-grade cleanrooms."
  }
];
