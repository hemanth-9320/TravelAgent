// TripPlace.jsx

import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function TripPlace({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="my-6">
        <h2 className="font-semibold text-xl">Places to Visit</h2>
        <p className="text-gray-500">No places added to the itinerary.</p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <h2 className="font-semibold text-xl mb-4">Places to Visit</h2>
      {itinerary.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-6">
          <h3 className="text-lg font-bold mb-2">
            {day.day || `Day ${dayIndex + 1}`}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {day.plan.map((place, placeIndex) => (
              <PlaceCardItem key={placeIndex} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TripPlace;
