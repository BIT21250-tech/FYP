import { Link } from 'react-router-dom';
import { Dumbbell, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
              <Dumbbell size={28} />
              <span>FitnessFreaks</span>
            </Link>
            <p className="text-neutral-300 text-sm">
              Building strength, one workout at a time.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/workout-plans" className="text-neutral-300 hover:text-white transition-colors">Workout Plans</Link></li>
              <li><Link to="/exercises" className="text-neutral-300 hover:text-white transition-colors">Exercise Library</Link></li>
              <li><Link to="/progress" className="text-neutral-300 hover:text-white transition-colors">Progress Tracker</Link></li>
              <li><Link to="/community" className="text-neutral-300 hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Nutrition Guide</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Fitness Articles</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-neutral-300">Email: info@fitnessfreaks.com</li>
              <li className="text-neutral-300">Phone: +1 (123) 456-7890</li>
              <li className="text-neutral-300">Address: 123 Fitness St, Health City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400 text-sm">
          <p>© {new Date().getFullYear()} FitnessFreaks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;