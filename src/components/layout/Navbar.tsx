import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dumbbell, Menu, X, LogOut, User } from 'lucide-react';
import { logout } from '../../redux/features/auth/authSlice';
import { RootState, AppDispatch } from '../../redux/store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Workout Plans', path: '/workout-plans' },
    { name: 'Exercise Library', path: '/exercises' },
    { name: 'Progress Tracker', path: '/progress', protected: true },
    { name: 'Community', path: '/community' },
  ];

  const filteredLinks = navLinks.filter(link => 
    !link.protected || (link.protected && isAuthenticated)
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary-500">
            <Dumbbell size={28} />
            <span>FitnessFreaks</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {filteredLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-neutral-700 hover:text-primary-500 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="btn-outline">
                    <User size={18} className="mr-1" />
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="btn-primary">
                    <LogOut size={18} className="mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-outline">Login</Link>
                  <Link to="/register" className="btn-primary">Sign Up</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-neutral-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container-custom py-4 space-y-4">
            {filteredLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="block py-2 text-neutral-700 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="block py-2 text-neutral-700 hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="block py-2 text-neutral-700 hover:text-primary-500 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block py-2 text-neutral-700 hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 text-neutral-700 hover:text-primary-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;