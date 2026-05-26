# Admin Panel — React + Vite + Tailwind CSS

A fully responsive admin panel with collapsible sidebar, header, and dashboard content. Supports light/dark mode with persistence.

## Features
- ✅ Collapsible sidebar (desktop)
- ✅ Mobile-responsive with drawer sidebar
- ✅ Light / Dark mode toggle (persisted via localStorage)
- ✅ Nested nav items with expand/collapse
- ✅ Active link highlighting
- ✅ Dashboard with stats, top posts, recent activity
- ✅ DM Sans font, brand color system via Tailwind

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

## Project Structure
```
src/
├── components/
│   ├── Sidebar.jsx       # Collapsible sidebar with nested nav
│   ├── Header.jsx        # Top header with search, theme toggle
│   └── Dashboard.jsx     # Main dashboard content
├── context/
│   └── ThemeContext.jsx   # Dark/light mode context
├── App.jsx               # Root layout
├── main.jsx              # Entry point
└── index.css             # Tailwind + custom utilities
```

## Customization
- Colors: edit `tailwind.config.js` → `theme.extend.colors.brand`
- Sidebar nav items: edit `src/components/Sidebar.jsx` → `navItems` array
- Add new pages: add components in `src/components/` and wire up in `App.jsx`
