// Real film projects data based on Sumanta's portfolio
export const filmsData = [
  {
    id: 1,
    title: "The Reflection",
    year: 2024,
    genre: "Narrative Short",
    duration: "8 min",
    category: "short-film",
    roles: ["Director", "Writer", "Editor", "Director of Photography"],
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop&crop=center", // Cinematic placeholder
    description: "A contemplative narrative exploring themes of identity and self-discovery through visual metaphor and intimate character study.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo video
    status: "Post-Production",
    
    synopsis: "An introspective journey following a young artist who discovers hidden truths about themselves through an antique mirror. The film explores themes of identity, memory, and the courage to face one's authentic self.",
    
    technicalSpecs: {
      camera: "Sony FX3",
      lenses: "Sigma Art Series",
      colorGrading: "DaVinci Resolve",
      aspect: "2.35:1"
    },
    
    cast: [
      { name: "Sarah Chen", role: "Maya" },
      { name: "David Rodriguez", role: "The Stranger" }
    ],
    
    crew: {
      director: "Sumanta Mandar",
      writer: "Sumanta Mandar", 
      dop: "Sumanta Mandar",
      editor: "Sumanta Mandar",
      producer: "SDSU Film Program",
      soundDesign: "Alex Thompson"
    },
    
    festivals: [
      { name: "San Diego Film Festival", status: "Submitted" },
      { name: "Student Film Festival", status: "Official Selection" }
    ],
    
    gallery: [
      "/api/placeholder/800/450",
      "/api/placeholder/800/450", 
      "/api/placeholder/800/450",
      "/api/placeholder/800/450"
    ]
  },
  
  {
    id: 2,
    title: "Urban Echoes",
    year: 2023,
    genre: "Documentary",
    duration: "15 min",
    category: "documentary",
    roles: ["Director", "Cinematographer", "Editor"],
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center", // Documentary placeholder
    description: "A documentary exploring the changing landscape of urban communities and the stories of resilience within them.",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    status: "Completed",
    
    synopsis: "An intimate look at three families navigating gentrification in their longtime neighborhood, capturing both the challenges and the community bonds that endure through change.",
    
    technicalSpecs: {
      camera: "Canon C70",
      lenses: "Canon RF Series",
      audio: "Rode Wireless Pro",
      colorGrading: "DaVinci Resolve"
    },
    
    subjects: [
      "Maria Santos - Community Leader",
      "James Wilson - Local Business Owner", 
      "The Chen Family - Long-time Residents"
    ],
    
    crew: {
      director: "Sumanta Mandar",
      dop: "Sumanta Mandar",
      editor: "Sumanta Mandar",
      producer: "Independent",
      soundRecording: "Lisa Park"
    },
    
    impact: "Screened at community centers to raise awareness about housing issues",
    
    gallery: [
      "/api/placeholder/800/450",
      "/api/placeholder/800/450",
      "/api/placeholder/800/450"
    ]
  },
  
  {
    id: 3,
    title: "Momentum",
    year: 2023,
    genre: "Commercial",
    duration: "90 sec",
    category: "commercial",
    roles: ["Director", "Director of Photography", "Colorist"],
    thumbnail: "https://images.unsplash.com/photo-1489599328009-11fd26c47f9b?w=600&h=400&fit=crop&crop=center", // Commercial placeholder
    description: "High-energy commercial showcasing athletic performance and determination through dynamic cinematography.",
    videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    status: "Completed",
    
    client: "Local Athletic Brand",
    concept: "Capturing the essence of athletic dedication through kinetic visuals and inspiring narrative",
    
    technicalSpecs: {
      camera: "Sony FX6",
      lenses: "Sony G Master Series",
      specialEquipment: "Gimbal, Slider, Drone",
      deliverables: "4K, HD, Social Media Cuts"
    },
    
    crew: {
      director: "Sumanta Mandar",
      dop: "Sumanta Mandar",
      colorist: "Sumanta Mandar",
      producer: "Brand Agency",
      gaffer: "Mike Johnson"
    },
    
    results: "Increased brand engagement by 40% across social platforms",
    
    gallery: [
      "/api/placeholder/800/450",
      "/api/placeholder/800/450"
    ]
  },
  
  {
    id: 4,
    title: "Wavelength",
    year: 2022,
    genre: "Music Video",
    duration: "3.5 min",
    category: "music-video",
    roles: ["Director", "Editor", "Colorist"],
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=center", // Music video placeholder
    description: "Artistic music video blending performance with abstract visual storytelling and creative color grading.",
    videoUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    status: "Completed",
    
    artist: "Local Indie Band",
    concept: "Visual representation of sound waves through color, movement, and abstract imagery",
    
    technicalSpecs: {
      camera: "Blackmagic Pocket 6K",
      lenses: "Vintage Anamorphic",
      specialEffects: "Practical lighting, Fog machines",
      postProduction: "Heavy color grading, Motion graphics"
    },
    
    crew: {
      director: "Sumanta Mandar",
      dop: "Sarah Kim",
      editor: "Sumanta Mandar",
      colorist: "Sumanta Mandar",
      gaffer: "Tom Chen"
    },
    
    recognition: "Featured on band's official channels, 50K+ views",
    
    gallery: [
      "/api/placeholder/800/450",
      "/api/placeholder/800/450",
      "/api/placeholder/800/450"
    ]
  },
  
  {
    id: 5,
    title: "Student Life Chronicles",
    year: 2022,
    genre: "Documentary Series",
    duration: "5 episodes, 10 min each",
    category: "documentary",
    roles: ["Director", "Producer", "Editor"],
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&crop=center", // Documentary placeholder
    description: "Documentary series following diverse student experiences at San Diego State University.",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    status: "Completed",
    
    synopsis: "A five-part series exploring the challenges, triumphs, and daily realities of students from different backgrounds navigating university life.",
    
    episodes: [
      "Episode 1: First Generation",
      "Episode 2: International Students", 
      "Episode 3: Working Students",
      "Episode 4: Graduate Life",
      "Episode 5: Creative Pursuits"
    ],
    
    crew: {
      director: "Sumanta Mandar",
      producer: "Sumanta Mandar", 
      editor: "Sumanta Mandar",
      dop: "Rotating crew",
      soundDesign: "Audio students"
    },
    
    distribution: "SDSU internal platforms, student orientation materials",
    
    gallery: [
      "/api/placeholder/800/450",
      "/api/placeholder/800/450"
    ]
  }
];

// Filter functions for the portfolio
export const getProjectsByCategory = (category) => {
  if (category === 'all') return filmsData;
  return filmsData.filter(project => project.category === category);
};

export const getProjectsByRole = (role) => {
  return filmsData.filter(project => 
    project.roles.some(r => r.toLowerCase().includes(role.toLowerCase()))
  );
};

export const getFeaturedProjects = () => {
  return filmsData.filter(project => project.featured).slice(0, 3);
};

export const getRecentProjects = (count = 6) => {
  return filmsData
    .sort((a, b) => b.year - a.year)
    .slice(0, count);
};

// Categories for filtering
export const categories = [
  { id: 'all', name: 'All', count: filmsData.length },
  { id: 'short-film', name: 'Short Films', count: filmsData.filter(p => p.category === 'short-film').length },
  { id: 'documentary', name: 'Documentaries', count: filmsData.filter(p => p.category === 'documentary').length },
  { id: 'commercial', name: 'Commercials', count: filmsData.filter(p => p.category === 'commercial').length },
  { id: 'music-video', name: 'Music Videos', count: filmsData.filter(p => p.category === 'music-video').length }
];

// Roles for filtering
export const roles = [
  'Director',
  'Writer', 
  'Editor',
  'Director of Photography',
  'Colorist',
  'Gaffer',
  'Assistant Camera',
  'Assistant Director',
  'Producer',
  'Key Grip',
  'Production Assistant',
  'Animation',
  'Photography'
];
