import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/features/auth/authSlice';
import { RootState, AppDispatch } from '../../redux/store';

const fitnessGoals = [
  'Gain muscle',
  'Lose weight',
  'Improve strength',
  'Improve endurance',
  'Maintain fitness',
  'Other'
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    fitnessGoals: '',
  });
  
  const [passwordError, setPasswordError] = useState('');
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
    
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Remove confirmPassword from the data sent to the backend
    const { confirmPassword, ...registerData } = formData;
    
    const result = await dispatch(register(registerData));
    if (register.fulfilled.match(result)) {
      navigate('/workout-plans');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="mt-2 text-neutral-600">Sign up to start your fitness journey</p>
        </div>
        
        {error && (
          <div className="bg-error-100 border border-error-300 text-error-500 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`form-input ${passwordError ? 'border-error-500 focus:ring-error-500' : ''}`}
                placeholder="••••••••"
                minLength={6}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`form-input ${passwordError ? 'border-error-500 focus:ring-error-500' : ''}`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-error-500">{passwordError}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="fitnessGoals" className="form-label">Fitness Goals</label>
              <select
                id="fitnessGoals"
                name="fitnessGoals"
                className="form-input"
                value={formData.fitnessGoals}
                onChange={handleChange}
              >
                <option value="">Select a goal</option>
                {fitnessGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full btn-primary py-2.5 relative"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="opacity-0">Create Account</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </>
              ) : 'Create Account'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary-500 hover:text-secondary-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;