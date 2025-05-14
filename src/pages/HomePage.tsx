import { Link } from 'react-router-dom';
import { Dumbbell, ClipboardList, BarChart2, Users, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Build Your Strength, Transform Your Life</h1>
              <p className="text-lg mb-8">
                Track workouts, follow expert plans, and connect with a community of fitness enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn bg-white text-primary-600 hover:bg-neutral-100">
                  Get Started Free
                </Link>
                <Link to="/workout-plans" className="btn border border-white text-white hover:bg-white/10">
                  Browse Workout Plans
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fitness Training"
                className="rounded-lg shadow-lg object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need For Fitness Success</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              FitnessFreaks provides all the tools needed to plan, track, and achieve your fitness goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="bg-primary-100 text-primary-500 p-3 rounded-lg inline-block mb-4">
                <Dumbbell size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Workout Plans</h3>
              <p className="text-neutral-600 mb-4">
                Access professionally designed workouts for any fitness level and goal.
              </p>
              <Link to="/workout-plans" className="text-primary-500 font-medium flex items-center">
                Browse Plans <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="bg-secondary-100 text-secondary-500 p-3 rounded-lg inline-block mb-4">
                <ClipboardList size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exercise Library</h3>
              <p className="text-neutral-600 mb-4">
                Learn perfect form with our video-guided exercise tutorials.
              </p>
              <Link to="/exercises" className="text-primary-500 font-medium flex items-center">
                Explore Exercises <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="bg-primary-100 text-primary-500 p-3 rounded-lg inline-block mb-4">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-neutral-600 mb-4">
                Monitor your improvements with visual charts and detailed logs.
              </p>
              <Link to="/progress" className="text-primary-500 font-medium flex items-center">
                Track Progress <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="bg-secondary-100 text-secondary-500 p-3 rounded-lg inline-block mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-neutral-600 mb-4">
                Connect with like-minded fitness enthusiasts and share your journey.
              </p>
              <Link to="/community" className="text-primary-500 font-medium flex items-center">
                Join Community <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael R.</h4>
                  <p className="text-sm text-neutral-500">Lost 30 lbs in 3 months</p>
                </div>
              </div>
              <p className="text-neutral-600">
                "The structured workout plans and progress tracking helped me stay motivated and see real results. I'm stronger than I've ever been!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah T.</h4>
                  <p className="text-sm text-neutral-500">Powerlifter</p>
                </div>
              </div>
              <p className="text-neutral-600">
                "I've tried many fitness apps, but FitnessFreaks offers the most comprehensive exercise library with detailed form videos that helped improve my technique."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">James L.</h4>
                  <p className="text-sm text-neutral-500">Fitness Beginner</p>
                </div>
              </div>
              <p className="text-neutral-600">
                "The community support has been incredible. Getting feedback and encouragement from others made all the difference in my fitness journey."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Strength?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of members who are building strength and transforming their lives with FitnessFreaks.
          </p>
          <Link to="/register" className="btn bg-white text-secondary-600 hover:bg-neutral-100 px-8 py-3">
            Start Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;