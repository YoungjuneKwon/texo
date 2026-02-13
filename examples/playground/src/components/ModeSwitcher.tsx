import { Link, useLocation } from 'react-router-dom';

const MODES = [
  { id: 'casual', label: 'Casual', icon: '🎮', color: '#ec4899' },
  { id: 'pro', label: 'Pro', icon: '🔧', color: '#2563eb' },
  { id: 'data', label: 'Data', icon: '📊', color: '#14b8a6' },
  { id: 'lab', label: 'Lab', icon: '🧪', color: '#f59e0b' },
] as const;

export function ModeSwitcher(): JSX.Element {
  const location = useLocation();
  return (
    <nav className="mode-switcher">
      {MODES.map((mode) => {
        const active = location.pathname.startsWith(`/${mode.id}`);
        return (
          <Link
            key={mode.id}
            to={`/${mode.id}`}
            className="mode-link"
            style={{
              borderColor: active ? mode.color : 'transparent',
              background: active ? `${mode.color}22` : 'transparent',
            }}
          >
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
