# NEXPRO — Cyberpunk E-Commerce Store

A high-contrast, dark-mode futuristic e-commerce web application built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed with a minimalist UI aesthetic, high-impact typography, and vibrant neon lime (`#d4ff00`) accents.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

---

## Overview

**NEXPRO** is a high-performance storefront template designed for futuristic gear, wearables, and high-tech gadgets. It features instantaneous client-side search, interactive cart management, dynamic dark/light theme switching, and smooth spring animations.

---

## Key Features

- **Cyberpunk Design System**: Dark-mode aesthetic featuring deep slate surfaces (`#020617`) paired with neon lime (`#d4ff00`) brand accents.
- **Persistent Theme Switcher**: Toggle seamlessly between dark and light modes with immediate HTML class application and `localStorage` persistence.
- **Real-Time Interactive Search**: Slide-down search drawer with live query filtering across product titles and tags.
- **Global Cart Context**: Dynamic item addition, removal, badge count indicators, and real-time total updates via React Context API.
- **Interactive Profile & Orders Drawer**: Animated drop-down navigation for user profiles, transaction histories, and authentication states.
- **Mobile-First Responsive Layout**: Fully responsive slide-out mobile navigation built for all screen sizes.
- **Framer Motion Micro-Interactions**: Smooth entrance/exit transitions for search bars, modals, profile popovers, and drawers.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling Engine** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icon System** | [Lucide React](https://lucide.dev/) |
| **State Management** | React Context API (`AuthContext`, `CartContext`) |

---

## Getting Started

Follow these steps to run **NEXPRO** locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/rabbiajamshaidofficial/Nexpro.git](https://github.com/rabbiajamshaidofficial/Nexpro.git)
   cd Nexpro
Install dependencies
npm install
Start the development server
npm run dev
Open in browser Navigate to http://localhost:5173 to view the running app.Project Structure cyberpunk-store/
├── public/                  # Static assets & favicon
├── src/
│   ├── assets/              # Images & media files
│   ├── components/          # Modular React components
│   │   ├── AuthModal.jsx    # Authentication modal dialogs
│   │   ├── CartDrawer.jsx   # Slide-out shopping cart drawer
│   │   ├── Footer.jsx       # Global footer component
│   │   ├── Navbar.jsx       # Header bar with search & profile drawers
│   │   └── ProductCard.jsx  # Grid product card with add-to-cart actions
│   ├── context/
│   │   ├── AuthContext.jsx  # User authentication state
│   │   └── CartContext.jsx  # Shopping cart state & badge counts
│   ├── App.jsx              # Application root layout
│   ├── index.css            # Tailwind CSS directives & global styling
│   └── main.jsx             # React entry point
├── package.json
├── tailwind.config.js       # Custom colors (`accent-lime`, dark mode config)
└── vite.config.js           # Vite bundle configuration
AuthorDeveloped by Rabbia Jamshaid 
GitHub: @rabbiajamshaidofficialLicense
This project is open-source and available under the MIT License.
