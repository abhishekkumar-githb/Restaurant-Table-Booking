import React from 'react';
import { Utensils, CalendarDays, LogOut } from 'lucide-react';

interface NavigationProps {
  currentView: 'booking' | 'reservations';
  onViewChange: (view: 'booking' | 'reservations') => void;
  onSignOut: () => void;
  userEmail?: string | null;
}

export function Navigation({ currentView, onViewChange, onSignOut, userEmail }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Utensils className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Restaurant Booking</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              <button
                onClick={() => onViewChange('booking')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentView === 'booking'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Book Table
              </button>
              <button
                onClick={() => onViewChange('reservations')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentView === 'reservations'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Reservations
                </span>
              </button>
            </div>
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
              <span className="text-sm text-gray-500">{userEmail}</span>
              <button
                onClick={onSignOut}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}