import React from 'react';
import { Calendar, Clock, Users, User, Mail, Phone } from 'lucide-react';

interface BookingSummaryProps {
  booking: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
  };
}

export function BookingSummary({ booking }: BookingSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Confirmation</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <User className="text-blue-500 mr-3" size={20} />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{booking.name}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Mail className="text-blue-500 mr-3" size={20} />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{booking.email}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Phone className="text-blue-500 mr-3" size={20} />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{booking.phone}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="text-blue-500 mr-3" size={20} />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Clock className="text-blue-500 mr-3" size={20} />
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">{booking.time}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Users className="text-blue-500 mr-3" size={20} />
          <div>
            <p className="text-sm text-gray-500">Guests</p>
            <p className="font-medium">{booking.guests} people</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-md">
        <p className="text-blue-800 text-sm">
          Your booking has been confirmed! We look forward to serving you.
        </p>
      </div>
    </div>
  );
}