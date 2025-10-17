import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HOTEL_EMOJIS = ['🏨', '🏩', '🏕️', '🏛️', '🛎️', '🏚️', '⛺'];

function HotelCardItem({ item, index = 0 }) {
  const [photoUrl, setPhotoUrl] = useState(item?.hotelImageUrl || '');

  useEffect(() => {
    if (!item?.hotelImageUrl) {
      fetchHotelImage();
    }
    // eslint-disable-next-line
  }, [item]);

  const fetchHotelImage = async () => {
    try {
      const data = { textQuery: item?.hotelName };
      const resp = await GetPlaceDetails(data);
      const photoList = resp?.data?.places?.[0]?.photos;
      if (photoList && photoList.length > 0) {
        const url = PHOTO_REF_URL.replace('{NAME}', photoList[0].name);
        setPhotoUrl(url);
      } else {
        setPhotoUrl('/road-trip-vacation.jpg');
      }
    } catch {
      setPhotoUrl('/road-trip-vacation.jpg');
    }
  };

  const emoji = HOTEL_EMOJIS[index % HOTEL_EMOJIS.length];

  return (
    <div className="max-w-sm w-full mx-auto">
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item?.hotelName)},${encodeURIComponent(item?.hotelAddress)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="group rounded-3xl bg-white shadow-xl border border-gray-200 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
          <div className="relative">
            <img
              src={photoUrl || '/road-trip-vacation.jpg'}
              alt={item?.hotelName}
              className="w-full h-44 object-cover"
            />
            <span className="absolute top-3 left-3 bg-white bg-opacity-80 rounded-full px-2 py-1 shadow text-2xl">
              {emoji}
            </span>
          </div>
          <div className="p-5 pb-3 flex flex-col gap-2">
            <div className="font-bold text-lg mb-1 text-gray-900">{item?.hotelName}</div>
            <div className="flex items-center text-xs text-gray-600 gap-1 mb-1">
              <span>📍</span>
              <span className="truncate">{item?.hotelAddress}</span>
            </div>
            {item?.price && (
              <div className="flex items-center text-sm text-green-600 gap-1 mb-1">
                <span>💰</span>
                <span>{item?.price}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-yellow-500 gap-1 mb-1">
              <span>⭐</span>
              <span>{item?.rating ?? '--'}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
