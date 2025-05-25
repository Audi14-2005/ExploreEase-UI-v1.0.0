
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface AuthScreenProps {
  onSuccess: () => void;
  onBack: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        if (!username.trim()) {
          setError('Username is required');
          return;
        }
        await signup(email, password, username);
      } else {
        await login(email, password);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Travel Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 text-white hover:text-gray-300 transition-colors flex items-center space-x-2"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">ExploreEase</h1>
            <p className="text-white/90 text-lg">
              {isSignUp ? 'Create your account' : 'Welcome back, explorer'}
            </p>
          </div>

          {/* Auth Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="h-12 border-gray-200 focus:border-blue-500"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 border-gray-200 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 border-gray-200 focus:border-blue-500 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
            </form>

            {/* Toggle Sign In/Up */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>

          {/* Travel Quote */}
          <div className="text-center mt-8">
            <p className="text-white/80 text-sm italic">
              "The world is a book and those who do not travel read only one page."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
