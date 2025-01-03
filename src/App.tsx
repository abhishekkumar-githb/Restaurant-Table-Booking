import React, { useState, useEffect } from 'react';
import { BookingForm } from './components/BookingForm';
import { BookingSummary } from './components/BookingSummary';
import { ReservationsList } from './components/ReservationsList';
import { Navigation } from './components/Navigation';
import { AuthForm } from './components/AuthForm';
import { getCurrentUser, signOut } from './lib/auth';
import { User } from '@supabase/supabase-js';

export default function App() {  // Added 'export default' here
  const [booking, setBooking] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'booking' | 'reservations'>('booking');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    loadUser();
  }, []);

  const handleBookingSuccess = (newBooking: any) => {
    setBooking(newBooking);
    setCurrentView('reservations');
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setCurrentView('booking');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900">Restaurant Booking</h1>
            </div>
          </div>
        </nav>
        <main className="max-w-md mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Sign in to make a reservation
            </h2>
            <AuthForm onSuccess={() => window.location.reload()} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onSignOut={handleSignOut}
        userEmail={user.email}
      />

      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {currentView === 'booking' ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Make a Reservation
            </h2>
            <BookingForm onSuccess={handleBookingSuccess} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Reservations
            </h2>
            <ReservationsList />
          </div>
        )}
      </main>
    </div>
  );
}