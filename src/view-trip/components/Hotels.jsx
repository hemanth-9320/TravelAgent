// Hotels.jsx

import React from 'react';
import HotelCardItem from './HotelCardItem'; // 1. Import the component

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels;

  if (!hotels || hotels.length === 0) {
    return (
      <div className="my-6">
        <h2 className="font-semibold text-xl">Hotel Recommendation</h2>
        <p className="text-gray-500">No hotel recommendations found.</p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <h2 className="font-semibold text-xl mb-4">Hotel Recommendation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel, index) => (
          // 2. Use HotelCardItem and pass the hotel object to the 'item' prop
          <HotelCardItem key={index} item={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;