import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  LayoutDashboard, Users, FileText, Calendar, BarChart2,
  Bell, Settings, ChevronDown, ChevronRight, X, LogOut
} from 'lucide-react'

const navItems = [
  {
    section: 'MAIN',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
      {
        icon: Users, label: 'Audience', id: 'audience',
        children: [
          { label: 'Followers', id: 'followers' },
          { label: 'Subscribers', id: 'subscribers' },
        ]
      },
      { icon: FileText, label: 'Posts', id: 'posts' },
      { icon: Calendar, label: 'Schedules', id: 'schedules' },
      {
        icon: BarChart2, label: 'Income', id: 'income',
        children: [
          { label: 'Earnings', id: 'earnings' },
          { label: 'Refunds', id: 'refunds' },
          { label: 'Declines', id: 'declines' },
          { label: 'Payouts', id: 'payouts' },
        ]
      },
    ]
  },
  {
    section: 'SETTINGS',
    items: [
      { icon: Bell, label: 'Notification', id: 'notification' },
      {
        icon: Settings, label: 'Settings', id: 'settings',
        children: [
          { label: 'Profile', id: 'profile' },
          { label: 'Security', id: 'security' },
        ]
      },
    ]
  }
]

// ── Collapsed flyout: shows label + all children as clickable items ──────────
function CollapsedFlyout({ item, targetRef, visible, active, setActive, onClose }) {
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (visible && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      setPos({ top: rect.top, left: rect.right + 8 })
    }
  }, [visible, targetRef])

  if (!visible) return null

  return ReactDOM.createPortal(
    <div
      style={{ top: pos.top, left: pos.left, zIndex: 99999 }}
      className="fixed min-w-[160px]"
    >
      {/* Arrow */}
      <div
        style={{ top: 14, left: -5 }}
        className="absolute w-2.5 h-2.5 bg-white dark:bg-gray-900 border-l border-t border-gray-100 dark:border-gray-700 rotate-[-45deg]"
      />
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
        {/* Header label */}
        <div className="px-3.5 py-2.5 border-b border-gray-50 dark:border-gray-800">
          <span className="text-[11px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">
            {item.label}
          </span>
        </div>
        {/* Children or single item */}
        {item.children ? (
          <ul className="py-1.5">
            {item.children.map(child => (
              <li key={child.id}>
                <button
                  onClick={() => { setActive(child.id); if (onClose) onClose() }}
                  className={`
                    w-full text-left px-3.5 py-2 text-sm font-medium transition-colors
                    ${active === child.id
                      ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}
                  `}
                >
                  {child.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <button
            onClick={() => { setActive(item.id); if (onClose) onClose() }}
            className="w-full text-left px-3.5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {item.label}
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}

function NavItem({ item, collapsed, active, setActive, expanded, toggleExpand, onClose }) {
  const Icon = item.icon
  const isExpanded = expanded[item.id]
  const isParentActive = item.children?.some(c => c.id === active)
  const [flyoutVisible, setFlyoutVisible] = useState(false)
  const btnRef = useRef(null)
  const flyoutTimeout = useRef(null)

  const showFlyout = () => {
    clearTimeout(flyoutTimeout.current)
    setFlyoutVisible(true)
  }
  const hideFlyout = () => {
    flyoutTimeout.current = setTimeout(() => setFlyoutVisible(false), 120)
  }

  useEffect(() => () => clearTimeout(flyoutTimeout.current), [])

  return (
    <li className="relative">
      <button
        ref={btnRef}
        onClick={() => {
          if (!collapsed) {
            if (item.children) toggleExpand(item.id)
            else { setActive(item.id); if (onClose) onClose() }
          }
        }}
        onMouseEnter={() => collapsed && showFlyout()}
        onMouseLeave={() => collapsed && hideFlyout()}
        className={`
          sidebar-link w-full
          ${(!item.children && active === item.id) || (item.children && isParentActive && !isExpanded)
            ? 'sidebar-link-active'
            : 'sidebar-link-inactive'}
          ${collapsed ? 'justify-center px-2' : ''}
        `}
      >
        <Icon size={18} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {item.children && (
              <span className="text-gray-400">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            )}
          </>
        )}
      </button>

      {/* Collapsed flyout — portal rendered, stays open while hovering */}
      {collapsed && (
        <div
          onMouseEnter={showFlyout}
          onMouseLeave={hideFlyout}
        >
          <CollapsedFlyout
            item={item}
            targetRef={btnRef}
            visible={flyoutVisible}
            active={active}
            setActive={setActive}
            onClose={onClose}
          />
        </div>
      )}

      {/* Expanded sub-items (normal sidebar) */}
      {!collapsed && item.children && isExpanded && (
        <ul className="mt-0.5 ml-4 pl-4 border-l border-gray-100 dark:border-gray-800 space-y-0.5">
          {item.children.map(child => (
            <li key={child.id}>
              <button
                onClick={() => { setActive(child.id); if (onClose) onClose() }}
                className={`
                  w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${active === child.id
                    ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-semibold'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                `}
              >
                {child.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default function Sidebar({ collapsed, onClose, mobileOpen }) {
  const [active, setActive] = useState('refunds')
  const [expanded, setExpanded] = useState({ income: true })

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen z-30 flex flex-col overflow-hidden
          bg-white dark:bg-gray-950
          border-r border-gray-100 dark:border-gray-800
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[68px]' : 'w-[260px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-gray-100 dark:border-gray-800 shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center shrink-0 shadow-md shadow-brand-500/30">
            <div className="w-4 h-4 rounded-full border-2 border-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-gray-900 dark:text-white text-base tracking-tight">
              Logoipsum
            </span>
          )}
          {!collapsed && (
            <button
              onClick={onClose}
              className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-5">
          {navItems.map(({ section, items }) => (
            <div key={section}>
              {!collapsed && (
                <p className="text-[10px] font-semibold tracking-widest text-gray-400 dark:text-gray-600 mb-2 px-3">
                  {section}
                </p>
              )}
              <ul className="space-y-0.5">
                {items.map(item => (
                  <NavItem
                    key={item.id}
                    item={item}
                    collapsed={collapsed}
                    active={active}
                    setActive={setActive}
                    expanded={expanded}
                    toggleExpand={toggleExpand}
                    onClose={onClose}
                  />
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Durgesh Admin</p>
                <p className="text-xs text-gray-400 truncate">durgesh @example.com</p>
              </div>
              <LogOut size={14} className="text-gray-400 shrink-0" />
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
