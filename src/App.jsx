import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? 68 : 260;

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main area */}
      <div
        className="flex flex-col h-screen transition-all duration-300"
        style={{ paddingLeft: window.innerWidth >= 1024 ? sidebarWidth : 0 }}
      >
        {/* Inline style for header left offset */}
        <style>{`
          header { left: ${window.innerWidth >= 1024 ? sidebarWidth : 0}px !important; }
          @media (max-width: 1023px) { header { left: 0 !important; } }
        `}</style>

        <Header
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          onMenuOpen={() => setMobileOpen(true)}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pt-16">
          <div className=" mx-auto p-5 lg:p-7">
            <Dashboard />
          </div>
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto p-5 lg:p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            © 2026 Durgesh Kumar All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
