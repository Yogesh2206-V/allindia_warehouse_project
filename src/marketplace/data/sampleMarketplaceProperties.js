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
  "Delhi NCR",
  "West Bengal"
];

export const CITIES_BY_STATE = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Hosur", "Salem", "Tiruppur"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Haryana": ["Gurugram", "Faridabad", "Sonipat"],
  "Delhi NCR": ["Delhi", "Noida", "Greater Noida", "Ghaziabad"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"]
};

export const POPULAR_CITIES = [
  // A
  { name: "Ahmedabad", state: "Gujarat", image: "https://images.unsplash.com/photo-1609137144822-26157f4955b2?w=600&auto=format&fit=crop&q=80", count: 34, tag: "Sanand & Changodar GIDC" },
  { name: "Agra", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80", count: 14, tag: "Leather & Foundry Corridor" },
  { name: "Amritsar", state: "Punjab", image: "https://images.unsplash.com/photo-1594910243455-89f52f865f57?w=600&auto=format&fit=crop&q=80", count: 18, tag: "Northern Trade Gateway" },
  { name: "Aurangabad", state: "Maharashtra", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 16, tag: "Shendra-Bidkin DMIC" },
  { name: "Alwar", state: "Rajasthan", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 12, tag: "Matsya Industrial Area" },
  
  // B
  { name: "Bengaluru", state: "Karnataka", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 48, tag: "Hoskote & Nelamangala Hub" },
  { name: "Bhiwandi", state: "Maharashtra", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80", count: 52, tag: "India's Fulfillment Capital" },
  { name: "Bhopal", state: "Madhya Pradesh", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 20, tag: "Mandideep Industrial Area" },
  { name: "Bhubaneswar", state: "Odisha", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80", count: 15, tag: "Mancheswar & Infocity Hub" },
  { name: "Bhavnagar", state: "Gujarat", image: "https://images.unsplash.com/photo-1609137144822-26157f4955b2?w=600&auto=format&fit=crop&q=80", count: 11, tag: "Alang Port Corridor" },
  { name: "Bilaspur", state: "Chhattisgarh", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 14, tag: "Sirgitti Industrial Area" },
  
  // C
  { name: "Chennai", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 54, tag: "Sriperumbudur & Oragadam" },
  { name: "Coimbatore", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80", count: 24, tag: "SIDCO & Sulur Logistics Hub" },
  { name: "Chandigarh", state: "Punjab/Haryana", image: "https://images.unsplash.com/photo-1594910243455-89f52f865f57?w=600&auto=format&fit=crop&q=80", count: 19, tag: "Industrial Area Phase 1 & 2" },
  { name: "Cuttack", state: "Odisha", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80", count: 10, tag: "Choudwar Industrial Belt" },
  
  // D
  { name: "Delhi", state: "Delhi NCR", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80", count: 32, tag: "Okhla & Alipur Freight Hub" },
  { name: "Dehradun", state: "Uttarakhand", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80", count: 12, tag: "Selaqui Pharma Hub" },
  { name: "Durgapur", state: "West Bengal", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=80", count: 16, tag: "Steel & Heavy Engineering" },

  // E
  { name: "Erode", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 15, tag: "Perundurai SIPCOT" },
  { name: "Ernakulam (Kochi)", state: "Kerala", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 21, tag: "Kalamassery & Cochin Port" },

  // F
  { name: "Faridabad", state: "Haryana", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 26, tag: "Sector 24 & 58 Industrial" },

  // G
  { name: "Gurugram", state: "Haryana", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 38, tag: "IMT Manesar & Bilaspur" },
  { name: "Ghaziabad", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80", count: 22, tag: "Sahibabad & Loni Industrial" },
  { name: "Greater Noida", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 29, tag: "Ecotech 1 to 16 Zones" },
  { name: "Guwahati", state: "Assam", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=80", count: 17, tag: "Amingaon ICD & Changsari" },

  // H
  { name: "Hyderabad", state: "Telangana", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=600&auto=format&fit=crop&q=80", count: 35, tag: "Shamshabad & Medchal Corridor" },
  { name: "Hosur", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 25, tag: "SIPCOT 1 & 2 Auto Cluster" },
  { name: "Haridwar", state: "Uttarakhand", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80", count: 18, tag: "SIDCUL Industrial Area" },
  { name: "Hubballi-Dharwad", state: "Karnataka", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 14, tag: "Gamanagatti & Belur KIADB" },

  // I
  { name: "Indore", state: "Madhya Pradesh", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 27, tag: "Pithampur Auto & Pharma SEZ" },

  // J
  { name: "Jaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 28, tag: "Sitapura & VKIA Industrial" },
  { name: "Jamshedpur", state: "Jharkhand", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80", count: 19, tag: "Adityapur Industrial Area" },
  { name: "Jodhpur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 14, tag: "Boronada SEZ & Basni" },

  // K
  { name: "Kolkata", state: "West Bengal", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=80", count: 30, tag: "Dankuni & Dhulagarh Park" },
  { name: "Kanpur", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80", count: 21, tag: "Panki & Rania Industrial" },
  { name: "Kochi", state: "Kerala", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 23, tag: "Willingdon Island & Vallarpadam" },
  { name: "Kolhapur", state: "Maharashtra", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80", count: 16, tag: "Shiroli & Gokul Shirgaon MIDC" },

  // L
  { name: "Lucknow", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80", count: 22, tag: "Sarojini Nagar & Amausi" },
  { name: "Ludhiana", state: "Punjab", image: "https://images.unsplash.com/photo-1594910243455-89f52f865f57?w=600&auto=format&fit=crop&q=80", count: 27, tag: "Focal Point & Sahnewal" },

  // M
  { name: "Mumbai", state: "Maharashtra", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80", count: 62, tag: "Panvel & JNPT Freight Corridor" },
  { name: "Madurai", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 15, tag: "Kappalur SIDCO & Vadipatti" },
  { name: "Mangaluru", state: "Karnataka", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 17, tag: "Baikampady Industrial Estate" },
  { name: "Meerut", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80", count: 14, tag: "Partapur Industrial Area" },
  { name: "Mysuru", state: "Karnataka", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 18, tag: "Hebbal & Kadakola KIADB" },

  // N
  { name: "Nagpur", state: "Maharashtra", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80", count: 31, tag: "MIHAN SEZ & Butibori MIDC" },
  { name: "Nashik", state: "Maharashtra", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80", count: 21, tag: "Ambad & Satpur MIDC" },
  { name: "Navi Mumbai", state: "Maharashtra", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80", count: 42, tag: "TTC Industrial & Taloja" },
  { name: "Noida", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 33, tag: "Phase 2 & Sector 63/65" },

  // P
  { name: "Pune", state: "Maharashtra", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80", count: 45, tag: "Chakan & Talegaon MIDC" },
  { name: "Panipat", state: "Haryana", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 18, tag: "IOCL Refinery & Textile Hub" },
  { name: "Patna", state: "Bihar", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=80", count: 19, tag: "Fatuha & Bihta Industrial Park" },
  { name: "Puducherry", state: "Puducherry", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 12, tag: "Mettupalayam & PIPDIC" },

  // R
  { name: "Raipur", state: "Chhattisgarh", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 22, tag: "Urla & Siltara Industrial" },
  { name: "Rajkot", state: "Gujarat", image: "https://images.unsplash.com/photo-1609137144822-26157f4955b2?w=600&auto=format&fit=crop&q=80", count: 24, tag: "Metoda GIDC & Shapar-Veraval" },
  { name: "Ranchi", state: "Jharkhand", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80", count: 16, tag: "Tupudana & Namkum Industrial" },

  // S
  { name: "Surat", state: "Gujarat", image: "https://images.unsplash.com/photo-1609137144822-26157f4955b2?w=600&auto=format&fit=crop&q=80", count: 36, tag: "Hazira Port & Sachin GIDC" },
  { name: "Salem", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 18, tag: "Steel Plant & Omalur Hub" },
  { name: "Siliguri", state: "West Bengal", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=80", count: 16, tag: "Fulbari Inland Container Depot" },
  { name: "Solapur", state: "Maharashtra", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80", count: 14, tag: "Chincholi & Akkalkot MIDC" },
  { name: "Sonipat", state: "Haryana", image: "https://images.unsplash.com/photo-1590059390047-49d79caad5cf?w=600&auto=format&fit=crop&q=80", count: 23, tag: "Kundli & Rai HSIIDC" },
  { name: "Sri City", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 28, tag: "Integrated Multi-Product SEZ" },

  // T
  { name: "Thane", state: "Maharashtra", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80", count: 32, tag: "Wagle Estate & Ghodbunder" },
  { name: "Tiruchirappalli", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 17, tag: "BHEL & Thuvakudi SIDCO" },
  { name: "Tiruppur", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 26, tag: "Textile Apparel Export Hub" },
  { name: "Tirupati", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 15, tag: "Renigunta Electronic Hub" },

  // U
  { name: "Udaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80", count: 16, tag: "Sukher & Madri Industrial" },

  // V
  { name: "Vadodara", state: "Gujarat", image: "https://images.unsplash.com/photo-1609137144822-26157f4955b2?w=600&auto=format&fit=crop&q=80", count: 31, tag: "Makarpura & Savli GIDC" },
  { name: "Varanasi", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80", count: 18, tag: "Ramnagar & DLW Freight Hub" },
  { name: "Vasai-Virar", state: "Maharashtra", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80", count: 25, tag: "Kaman & Sasunavghar Belt" },
  { name: "Vellore", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80", count: 14, tag: "Ranipet SIPCOT Leather Zone" },
  { name: "Vijayawada", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=600&auto=format&fit=crop&q=80", count: 20, tag: "Autonagar & Gannavaram Port" },
  { name: "Visakhapatnam", state: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=600&auto=format&fit=crop&q=80", count: 29, tag: "Duvvada VSEZ & Autonagar" },

  // W
  { name: "Warangal", state: "Telangana", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=600&auto=format&fit=crop&q=80", count: 12, tag: "Kakatiya Mega Textile Park" }
];

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
    "Electronic City",
    "Bidadi Industrial Area",
    "Attibele"
  ],
  "Pune": [
    "Chakan MIDC",
    "Talegaon",
    "Ranjangaon",
    "Bhosari",
    "Hinjawadi",
    "Hadapsar",
    "Sanaswadi",
    "Pirangut",
    "Wagholi"
  ],
  "Mumbai": [
    "Bhiwandi",
    "Panvel",
    "Taloja",
    "Thane",
    "JNPT Port Area",
    "Vasai-Virar",
    "Vashi",
    "Mahape",
    "Kalamboli",
    "Rasayani"
  ],
  "Hyderabad": [
    "Shamshabad Cargo",
    "Medchal",
    "Patancheru",
    "Kothur",
    "Adibatla",
    "Cherlapally",
    "Pashamylaram",
    "Gundlapochampally"
  ],
  "Ahmedabad": [
    "Sanand GIDC",
    "Changodar",
    "Bavla",
    "Aslali",
    "Naroda",
    "Vatva",
    "Odhav",
    "Kadi"
  ],
  "Gurugram": [
    "Manesar Industrial Area",
    "Udyog Vihar",
    "Pataudi Road",
    "Sohna Road",
    "Bilaspur",
    "Binola Industrial Hub"
  ],
  "Delhi": [
    "Alipur",
    "Okhla Industrial Area",
    "Mayapuri",
    "Narela Industrial Area",
    "Kirti Nagar",
    "Bawana"
  ],
  "Kolkata": [
    "Dankuni",
    "Dhulagarh Logistics Park",
    "Taratala",
    "Kona Expressway",
    "Uluberia MIDC"
  ],
  "Coimbatore": [
    "Peelamedu",
    "Saravanampatti",
    "Eachanari",
    "Pollachi Road",
    "Sulur"
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

  // 4. Bhiwandi, Mumbai - High-Throughput E-Commerce Hub for Rent
  {
    id: "aiw-prop-mumbai-01",
    code: "PROP-100251",
    slug: "grade-a-logistics-distribution-center-bhiwandi-mumbai",
    title: "85,000 Sq.Ft Pre-Engineered Logistics Center with 16 Hydraulic Docks",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Logistics park",
    state: "Maharashtra",
    city: "Mumbai",
    locality: "Bhiwandi",
    address: "Mumbai-Nashik Expressway, Mankoli Junction, Bhiwandi, Mumbai - 421302",
    pincode: "421302",
    landmark: "5 Mins from Mankoli Toll Plaza, 45 Mins to JNPT Port",
    area_sqft: 85000,
    totalArea: 85000,
    areaUnit: "SQFT",
    price_or_rent_psf: 30,
    monthlyRent: 2550000,
    deposit: 15300000,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "Sunil V. Shah (Landowner)",
    poster_phone: "+91 98200 45678",
    maskedPhone: "+91 98200 •••••",
    created_at: "2026-10-03T11:00:00.000Z",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 38,
      loadingDocks: 16,
      truckAccess: true,
      powerKva: 300,
      floorLoadTon: 7,
      roadWidthFt: 90,
      floors: 1,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "38 Ft Apex PEB Steel Structure",
      dockCount: "16 Motorized Hydraulic Docks with Canopies",
      flooring: "FM2 Laser Screed Floor (7 Ton/m²)",
      powerCapacity: "300 kVA MSEDCL Power Sanctioned",
      fireSafety: "NFPA-compliant ESFR Sprinklers + Fire Alarm Loop",
      truckApron: "50-meter Heavy Vehicle Staging Yard"
    },
    features: [
      "16 Hydraulic Docks",
      "38 Ft Clear Height",
      "Direct Mumbai-Nashik Expressway Access",
      "Zero Octroi Clearance",
      "Round-the-clock Security Staff",
      "24/7 Power Backup"
    ],
    amenities: ["16 Docks", "ESFR Sprinklers", "50m Apron", "300 kVA Power", "CCTV Monitoring", "Driver Rest Area"],
    description: "Premium Grade-A logistics warehouse in Bhiwandi, the undisputed fulfillment capital of Mumbai NCR. Plinth level 1.2m above road, zero water logging record, insulated roofing, and excellent access to JNPT & Central Mumbai retail markets."
  },

  // 5. Panvel / JNPT, Mumbai - Bonded Cold Storage & Yard for Sale
  {
    id: "aiw-prop-mumbai-02",
    code: "PROP-100252",
    slug: "bonded-warehouse-and-open-container-yard-panvel-mumbai",
    title: "50,000 Sq.Ft Bonded Export-Import Warehouse with 3-Acre Paved Container Yard",
    dealType: "SALE",
    purpose: "sale",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Bonded warehouse",
    state: "Maharashtra",
    city: "Mumbai",
    locality: "Panvel",
    address: "Old Mumbai-Pune Highway Corridor, Near JNPT Port Access Road, Panvel - 410206",
    pincode: "410206",
    landmark: "15 mins from JNPT Container Terminal & Navi Mumbai Airport",
    area_sqft: 50000,
    totalArea: 50000,
    areaUnit: "SQFT",
    price: 240000000,
    price_or_rent_psf: 4800,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "DEALER",
    poster_role: "dealer",
    poster_name: "Navi Mumbai Commercial Realty",
    poster_phone: "+91 98201 99887",
    maskedPhone: "+91 98201 •••••",
    created_at: "2026-10-01T15:30:00.000Z",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 34,
      loadingDocks: 10,
      truckAccess: true,
      powerKva: 400,
      floorLoadTon: 9,
      roadWidthFt: 100,
      floors: 1,
      possessionStatus: "Immediate"
    },
    specs: {
      clearHeight: "34 Ft Clear Height with Heavy Customs Bonded Security Enclosure",
      dockCount: "10 Heavy Duty Container Loading Docks",
      flooring: "Reinforced Concrete Paver Flooring (10 Ton/m² Load Bearing)",
      powerCapacity: "400 kVA Sanctioned HT Connection",
      fireSafety: "Complete Hydrant Ring + Foam Extinguishers",
      truckApron: "3-Acre Interlocking Concrete Paved Container Yard"
    },
    features: [
      "Customs Bonded Compliant",
      "3-Acre Heavy Container Yard",
      "15 Mins to JNPT Port",
      "Reach Stacker Ready",
      "Weighbridge (100 Ton) on-site",
      "Freehold Title Deed"
    ],
    amenities: ["100T Weighbridge", "3-Acre Paved Yard", "400 kVA Power", "Bonded Security", "Port Proximity"],
    description: "High-value custom bonded warehouse and container freight facility near JNPT & Navi Mumbai International Airport. Includes fully computerized 100-Ton weighbridge, administrative customs clearance offices, and heavy-duty container stacking yard."
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
  },

  // 7. Nelamangala, Bengaluru - Grade-A E-Commerce Fulfillment Center for Rent
  {
    id: "aiw-prop-bengaluru-02",
    code: "PROP-100253",
    slug: "modern-fulfillment-center-nelamangala-bengaluru",
    title: "60,000 Sq.Ft High-Ceiling Modern Fulfillment Center on Tumkur Road (NH-48)",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Logistics park",
    state: "Karnataka",
    city: "Bengaluru",
    locality: "Nelamangala",
    address: "Tumkur Road Highway NH-48, Nelamangala Logistics Corridor, Bengaluru - 562123",
    pincode: "562123",
    landmark: "Near Nelamangala Toll Gate, Direct Link to NICE Road",
    area_sqft: 60000,
    totalArea: 60000,
    areaUnit: "SQFT",
    price_or_rent_psf: 26,
    monthlyRent: 1560000,
    deposit: 9360000,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "H. M. Gowda (Direct Owner)",
    poster_phone: "+91 98450 11234",
    maskedPhone: "+91 98450 •••••",
    created_at: "2026-10-02T16:00:00.000Z",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 36,
      loadingDocks: 12,
      truckAccess: true,
      powerKva: 200,
      floorLoadTon: 6,
      roadWidthFt: 80,
      floors: 1,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "36 Ft Clear Height PEB Structure",
      dockCount: "12 Hydraulic Dock Levellers",
      flooring: "FM2 Laser Screed Floor (6 Ton/m² Load Bearing)",
      powerCapacity: "200 kVA BESCOM Connection with DG Backup",
      fireSafety: "ESFR Sprinklers, Wet Riser & Fire NOC",
      truckApron: "40-meter Concrete Turning Apron"
    },
    features: [
      "12 Hydraulic Docks",
      "Direct NH-48 / NICE Road Connectivity",
      "36 Ft Clear Height",
      "Zero Brokerage - Direct Landowner",
      "24x7 Security & Driver Lounge"
    ],
    amenities: ["12 Docks", "ESFR Sprinklers", "NICE Road Access", "200 kVA Power", "FM2 Flooring"],
    description: "Premium logistics facility in Nelamangala with superfast transit access to Bengaluru city center via NICE Road and elevated expressway. Features 12 dock levelers, high-grade FM2 flooring, and high thermal insulation roof."
  },

  // 8. Chakan MIDC, Pune - Automobile Ancillary Factory Shed for Rent/Sale
  {
    id: "aiw-prop-pune-01",
    code: "PROP-100254",
    slug: "auto-ancillary-factory-shed-chakan-midc-pune",
    title: "42,000 Sq.Ft Ready Industrial Factory with 15T Crane & 400 kVA Power in Chakan MIDC Phase 2",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "INDUSTRIAL",
    type: "Industrial Shed",
    subType: "Factory",
    state: "Maharashtra",
    city: "Pune",
    locality: "Chakan MIDC",
    address: "Phase II Industrial Area, Chakan MIDC, Pune - 410501",
    pincode: "410501",
    landmark: "Near Mercedes-Benz & Volkswagen Auto Clusters",
    area_sqft: 42000,
    totalArea: 42000,
    areaUnit: "SQFT",
    price_or_rent_psf: 35,
    monthlyRent: 1470000,
    deposit: 8820000,
    negotiable: true,
    ownership: "LEASEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "Rajesh S. Kulkarni (Industrialist)",
    poster_phone: "+91 98220 54321",
    maskedPhone: "+91 98220 •••••",
    created_at: "2026-10-03T14:00:00.000Z",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 34,
      loadingDocks: 4,
      truckAccess: true,
      powerKva: 400,
      floorLoadTon: 8,
      roadWidthFt: 80,
      floors: 1,
      possessionStatus: "Immediate"
    },
    specs: {
      clearHeight: "34 Ft Clear Height with 15-Ton Overhead Crane Installed",
      dockCount: "4 Drive-in Bays + 2 Raised Docks",
      flooring: "Heavy Duty Trimix / VDF Flooring",
      powerCapacity: "400 kVA MSEDCL HT Power Sanctioned",
      fireSafety: "MIDC Approved Fire Hydrant System",
      truckApron: "Concrete Truck Apron with 80ft Road Frontage"
    },
    features: [
      "15-Ton EOT Crane Installed",
      "400 kVA Express Feeder Power",
      "MIDC Industrial Sanctioned",
      "G+1 Furnished Office Admin Block",
      "Effluent Treatment Plant (ETP) Ready"
    ],
    amenities: ["15T Crane", "400 kVA HT Power", "Admin Block", "ETP Facility", "MIDC Approved"],
    description: "Top-tier industrial manufacturing facility located right in the heart of Chakan Auto Belt. Ready with overhead 15-ton crane, 400 kVA HT line, high-pressure air piping, and executive office building."
  },

  // 9. Shamshabad Cargo, Hyderabad - Airport Logistics Warehouse for Rent
  {
    id: "aiw-prop-hyderabad-01",
    code: "PROP-100255",
    slug: "air-cargo-logistics-hub-shamshabad-hyderabad",
    title: "52,000 Sq.Ft Air Cargo Logistics Park near Rajiv Gandhi International Airport",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Logistics park",
    state: "Telangana",
    city: "Hyderabad",
    locality: "Shamshabad Cargo",
    address: "Airport Cargo Road, Outer Ring Road (ORR) Exit 16, Shamshabad, Hyderabad - 501218",
    pincode: "501218",
    landmark: "8 mins from Hyderabad Airport Cargo Gate & ORR",
    area_sqft: 52000,
    totalArea: 52000,
    areaUnit: "SQFT",
    price_or_rent_psf: 27,
    monthlyRent: 1404000,
    deposit: 8424000,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "DEALER",
    poster_role: "dealer",
    poster_name: "Deccan Logistics Properties",
    poster_phone: "+91 98490 67890",
    maskedPhone: "+91 98490 •••••",
    created_at: "2026-10-02T13:00:00.000Z",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 36,
      loadingDocks: 10,
      truckAccess: true,
      powerKva: 250,
      floorLoadTon: 6,
      roadWidthFt: 100,
      floors: 1,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "36 Ft Clear Height PEB Structure",
      dockCount: "10 Mechanical Dock Levellers with Seals",
      flooring: "FM2 Laser Screed Flooring (6 Ton/m²)",
      powerCapacity: "250 kVA Dedicated Transformer",
      fireSafety: "ESFR Sprinklers + Fire Alarm Loop",
      truckApron: "45-meter Apron with Dedicated Trailer Staging"
    },
    features: [
      "10 Mechanical Docks",
      "Direct Outer Ring Road (ORR) Connectivity",
      "Pharma & Air Cargo Grade Facility",
      "36 Ft Apex Height",
      "24x7 Security & CCTV Monitoring"
    ],
    amenities: ["10 Docks", "ESFR Sprinklers", "ORR Exit 16", "250 kVA Power", "Pharma Ready"],
    description: "Grade-A distribution warehouse located minutes from Hyderabad Airport cargo terminal and ORR. Built specifically for high-speed pharma distribution, e-commerce regional hubs, and freight forwarding."
  },

  // 10. Sanand GIDC, Ahmedabad - Engineering Plant for Sale
  {
    id: "aiw-prop-ahmedabad-01",
    code: "PROP-100256",
    slug: "heavy-engineering-plant-sanand-gidc-ahmedabad",
    title: "36,000 Sq.Ft Modern Manufacturing Plant on 2-Acre GIDC Freehold Plot",
    dealType: "SALE",
    purpose: "sale",
    propertyType: "INDUSTRIAL",
    type: "Industrial Shed",
    subType: "Factory",
    state: "Gujarat",
    city: "Ahmedabad",
    locality: "Sanand GIDC",
    address: "Sanand GIDC Phase II, Ahmedabad - 382110",
    pincode: "382110",
    landmark: "Near Tata Motors & Micron Semiconductor Corridor",
    area_sqft: 36000,
    totalArea: 2,
    areaUnit: "ACRE",
    price: 98000000,
    price_or_rent_psf: 2722,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "Chirag J. Patel (Owner)",
    poster_phone: "+91 98250 88776",
    maskedPhone: "+91 98250 •••••",
    created_at: "2026-10-01T10:00:00.000Z",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 32,
      loadingDocks: 4,
      truckAccess: true,
      powerKva: 350,
      floorLoadTon: 8,
      roadWidthFt: 80,
      floors: 1,
      possessionStatus: "Immediate"
    },
    specs: {
      clearHeight: "32 Ft Clear Height with 10-Ton Crane Gantry",
      dockCount: "4 Drive-in Loading Doors",
      flooring: "VDF Industrial Heavy Duty Concrete",
      powerCapacity: "350 kVA UGVCL Express Feeder",
      fireSafety: "GIDC Certified Hydrant & Water Reservoir",
      truckApron: "35-meter Heavy Truck Apron"
    },
    features: [
      "10-Ton Crane Provision",
      "350 kVA Express Feeder",
      "2-Acre GIDC Freehold Land",
      "Clear Land Title Deed",
      "Direct Connectivity to NH-8 & Kandla Port Highway"
    ],
    amenities: ["10T Crane Ready", "350 kVA Power", "2-Acre Plot", "GIDC Approved", "Office Block"],
    description: "Pristine industrial factory setup in Sanand GIDC II auto-ancillary hub. 2-acre plot with 36,000 sq ft factory shed, crane rails installed, separate security cabin, and executive office wing."
  },

  // 11. Manesar / Bilaspur, Gurugram - High-Ceiling Distribution Center for Rent
  {
    id: "aiw-prop-gurugram-01",
    code: "PROP-100257",
    slug: "grade-a-distribution-center-bilaspur-gurugram",
    title: "75,000 Sq.Ft Grade-A Distribution Hub on Delhi-Jaipur Expressway (NH-48)",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Logistics park",
    state: "Haryana",
    city: "Gurugram",
    locality: "Manesar Industrial Area",
    address: "NH-48 Delhi-Jaipur Highway, Bilaspur-Tauru Corridor, Gurugram - 122413",
    pincode: "122413",
    landmark: "Direct NH-48 Highway Access, Near Bilaspur Chowk",
    area_sqft: 75000,
    totalArea: 75000,
    areaUnit: "SQFT",
    price_or_rent_psf: 29,
    monthlyRent: 2175000,
    deposit: 13050000,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "Capt. Arvind Yadav (Landlord)",
    poster_phone: "+91 98110 33221",
    maskedPhone: "+91 98110 •••••",
    created_at: "2026-10-03T10:30:00.000Z",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 38,
      loadingDocks: 14,
      truckAccess: true,
      powerKva: 300,
      floorLoadTon: 7,
      roadWidthFt: 100,
      floors: 1,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "38 Ft Apex Height PEB Structure",
      dockCount: "14 Hydraulic Dock Levellers with Bumpers",
      flooring: "FM2 Laser Screed Floor (7 Ton/m² Load)",
      powerCapacity: "300 kVA Sanctioned DHBVN Connection",
      fireSafety: "ESFR Sprinklers + 3 Lakh Litre Underground Sump",
      truckApron: "50-meter Heavy Multi-Axle Staging Apron"
    },
    features: [
      "14 Hydraulic Dock Levellers",
      "Direct NH-48 Highway Access",
      "38 Ft Clear Height",
      "Zero Brokerage Direct Landowner",
      "Driver Dormitory & 24x7 Security"
    ],
    amenities: ["14 Docks", "ESFR Sprinklers", "NH-48 Frontage", "300 kVA Power", "Zero Brokerage"],
    description: "Premier Grade-A logistics facility on Delhi-Jaipur highway corridor. Zero flooding, 1.2m plinth height, FM2 floor, and seamless access to Delhi, Gurugram, and Western Peripheral Expressway (KMP)."
  },

  // 12. Dankuni / Dhulagarh, Kolkata - Eastern Logistics Hub for Rent
  {
    id: "aiw-prop-kolkata-01",
    code: "PROP-100258",
    slug: "eastern-regional-distribution-center-dankuni-kolkata",
    title: "48,000 Sq.Ft Pre-Engineered Logistics Center on Durgapur Expressway (NH-19)",
    dealType: "RENT",
    purpose: "rent",
    propertyType: "WAREHOUSE",
    type: "Warehouse",
    subType: "Logistics park",
    state: "West Bengal",
    city: "Kolkata",
    locality: "Dankuni",
    address: "NH-19 Durgapur Expressway Corridor, Dankuni, Kolkata - 712311",
    pincode: "712311",
    landmark: "5 mins from Dankuni Toll Plaza, Direct link to Kolkata Port & Airport",
    area_sqft: 48000,
    totalArea: 48000,
    areaUnit: "SQFT",
    price_or_rent_psf: 25,
    monthlyRent: 1200000,
    deposit: 7200000,
    negotiable: true,
    ownership: "FREEHOLD",
    status: "LIVE",
    approved: true,
    verified: true,
    featured: true,
    postedAs: "OWNER",
    poster_role: "owner",
    poster_name: "Subir Mukherjee (Landlord)",
    poster_phone: "+91 98300 77889",
    maskedPhone: "+91 98300 •••••",
    created_at: "2026-10-02T12:00:00.000Z",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80"
    ],
    attributes: {
      ceilingHeightFt: 34,
      loadingDocks: 8,
      truckAccess: true,
      powerKva: 200,
      floorLoadTon: 6,
      roadWidthFt: 80,
      floors: 1,
      possessionStatus: "Ready to Move"
    },
    specs: {
      clearHeight: "34 Ft Apex PEB Steel Structure",
      dockCount: "8 Motorized Dock Levellers",
      flooring: "FM2 Laser Screed Floor (6 Ton/m²)",
      powerCapacity: "200 kVA WBSEDCL Connection",
      fireSafety: "NFPA Standard Sprinklers + Fire NOC Approved",
      truckApron: "40-meter Concrete Staging Apron"
    },
    features: [
      "8 Hydraulic Docks",
      "Direct NH-19 Durgapur Expressway",
      "Gateway to North-East India",
      "34 Ft Clear Height",
      "24x7 Security & Guard Room"
    ],
    amenities: ["8 Docks", "ESFR Sprinklers", "NH-19 Access", "200 kVA Power", "Port Connectivity"],
    description: "Premier Eastern regional distribution hub at Dankuni. Direct gateway to Kolkata metro, Kolkata Port, Howrah railway freight corridor, and all northeastern states."
  }
];
