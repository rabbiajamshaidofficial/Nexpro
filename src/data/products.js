export const products = [
  {
    id: "cp-visor-01",
    name: "Aether Visor X9",
    category: "Wearable",
    type: "AR Headset",
    price: 1899,
    tagline: "Retinal HUD with neural overlay",
    description:
      "Full-spectrum AR visor with 8K retinal projection, adaptive night-vision, and a silent neural-link HUD for street and lab work.",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    stock: 14,
    featured: true,
    accent: "lime",
  },
  {
    id: "cp-band-02",
    name: "PulseForge Neural Band",
    category: "Wearable",
    type: "Neural Wearable",
    price: 749,
    tagline: "Bio-signal control on your wrist",
    description:
      "Graphene neural band that reads EMG intent, maps gestures to apps, and keeps vitals streaming to your personal mesh.",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 32,
    featured: true,
    accent: "cyan",
  },
  {
    id: "cp-cloak-03",
    name: "Umbra Adaptive Cloak",
    category: "Wearable",
    type: "Smart Apparel",
    price: 1290,
    tagline: "Thermal camo for neon nights",
    description:
      "Phase-shift fabric cloak with active thermal masking, rain-repel nano-weave, and a cyan-lit collar HUD for comms.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 9,
    featured: false,
    accent: "cyan",
  },
  {
    id: "cp-lenses-04",
    name: "NovaChrome Smart Lenses",
    category: "Wearable",
    type: "Ocular Implant-Lite",
    price: 2199,
    tagline: "See the grid. Stay analog.",
    description:
      "Non-invasive smart lenses with LIDAR depth overlay, facial-tag privacy mode, and 18-hour photonic charge.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 6,
    featured: true,
    accent: "lime",
  },
  {
    id: "cp-drone-05",
    name: "Razorwing Scout Drone",
    category: "Gadget",
    type: "Aerial Companion",
    price: 980,
    tagline: "Pocket recon. Zero lag.",
    description:
      "Fold-flat recon drone with silent rotors, 4K low-light feed, and a lime-traced chassis that docks on your pack.",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 21,
    featured: false,
    accent: "lime",
  },
  {
    id: "cp-core-06",
    name: "Helix Pocket Core",
    category: "Gadget",
    type: "Personal Compute",
    price: 1640,
    tagline: "Desktop power. Palm form.",
    description:
      "Palm-sized quantum-assisted core with holographic I/O, encrypted mesh hop, and a cooling lattice that glows cyan under load.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    stock: 11,
    featured: true,
    accent: "cyan",
  },
  {
    id: "cp-gloves-07",
    name: "Synapse Haptic Gloves",
    category: "Wearable",
    type: "Haptic Interface",
    price: 890,
    tagline: "Touch the simulation",
    description:
      "Force-feedback gloves with micro-servo tendons, RF-shielded palms, and 1ms latency for rigs, decks, and remote bots.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 18,
    featured: false,
    accent: "lime",
  },
  {
    id: "cp-deck-08",
    name: "Eclipse Deck MK-IV",
    category: "Gadget",
    type: "Hacking Console",
    price: 2450,
    tagline: "The last terminal you will need",
    description:
      "Portable netrunner deck with dual-holo keys, icebreaker firmware slots, and a tempered glass chassis edged in neon lime.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    stock: 4,
    featured: true,
    accent: "lime",
  },
];

export const getProductById = (id) => products.find((item) => item.id === id);
