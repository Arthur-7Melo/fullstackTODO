import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './css/Navbar.css';

export default function Navbar({ onFilter }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [filter, setFilter] = useState('all');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (f) => {
    setFilter(f);
    onFilter(f);
    if (mobileOpen) {
      setMobileOpen(false)
    }
  };

  return (
    <nav className='navbar'>
      <div className='navbar-inner'>
        <div className='navbar-logo'>
          <p>
            <span className='navbar-logo-span'>T</span>
            odoApp
          </p>
        </div>

        <div className='navbar-filter'>
          {['all', 'alta', 'baixa'].map(f => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => handleClick(f)}
            >
              {f === 'all' ? 'All' : f === 'alta' ? 'alta' : 'baixa'}
            </button>
          ))}
        </div>

        {isAuthenticated &&
          (
            <div className='nav-user'>
              <span className='nav-user-span'>Olá!</span>
              <button onClick={logout}>Logout</button>
            </div>
          )
        }

        <button
          className='nav-mobile-toggle'
          onClick={() => { setMobileOpen(o => !o) }}
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {mobileOpen &&
          (
            <div className='nav-menu-mobile'>
              <div className='mobile-filters'>
                {['all', 'alta', 'baixa'].map(f => (
                  <button
                    key={f}
                    className={filter === f ? 'active' : ''}
                    onClick={() => handleClick(f)}
                  >
                    {f === 'all' ? 'All' : f === 'alta' ? 'alta' : 'baixa'}
                  </button>
                ))}
              </div>
              {isAuthenticated &&
                (
                  <div className='mobile-user'>
                    <span className='mobile-user-span'>Olá!</span>
                    <button onClick={logout}>Logout</button>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </nav>
  );
}