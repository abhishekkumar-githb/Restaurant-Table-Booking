import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Users, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatDate } from '../utils/dateUtils';

interface Booking {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: string;
}

export function ReservationsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: true });

      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    }

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reservations found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <User className="text-blue-500 mr-3" size={20} />
              <div>
                <h3 className="font-medium">{booking.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(booking.date)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {booking.time}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {booking.guests} guests
                  </span>
                </div>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-800'
                : booking.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {booking.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}