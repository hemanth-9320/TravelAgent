// PlaceCardItem.js
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState(place?.placeImageUrl || '');

    useEffect(() => {
        if (!place?.placeImageUrl) {
            GetPlaceImg();
        }
        // eslint-disable-next-line
    }, [place]);

    const GetPlaceImg = async () => {
        try {
            const data = { textQuery: place.placeName };
            const resp = await GetPlaceDetails(data);
            const photoList = resp?.data?.places?.[0]?.photos;
            if (photoList && photoList.length > 0) {
                const url = PHOTO_REF_URL.replace('{NAME}', photoList[0].name);
                setPhotoUrl(url);
            } else {
                setPhotoUrl('/road-trip-vacation.jpg');
            }
        } catch (error) {
            setPhotoUrl('/road-trip-vacation.jpg');
        }
    };

    return (
        <div className="max-w-sm w-full mx-auto">
            <div className="group rounded-3xl bg-white shadow-xl border border-gray-200 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="relative">
                    <img
                        src={photoUrl || '/road-trip-vacation.jpg'}
                        alt={place?.placeName}
                        className="w-full h-44 object-cover"
                    />
                    {place.aiRecommended && (
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-violet-500 to-purple-400 text-xs font-bold text-white py-1 px-3 rounded-2xl shadow-md">
                            🤖 AI Recommended
                        </span>
                    )}
                </div>
                <div className="p-5 pb-3 flex flex-col gap-2">
                    <div className="flex items-center mb-1">
                        <h2 className="font-bold text-lg flex-1 text-gray-900">{place.placeName}</h2>
                        <span className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                            ⭐ {place.rating ?? "--"}
                        </span>
                    </div>
                    <p className="text-gray-700 text-sm font-medium truncate">{place.placeDetails}</p>
                    <div className="flex justify-between mt-2 items-center flex-wrap space-y-2 sm:space-y-0 sm:space-x-2">
                        <span className="bg-orange-50 text-orange-500 px-2 py-1 rounded-lg text-xs font-semibold">{place.time}</span>
                        {place.ticketPricing &&
                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-medium">{place.ticketPricing}</span>
                        }
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <Link
                            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)},${place?.geoCoordinates || ''}`}
                            target='_blank'
                            rel="noopener noreferrer"
                            className="inline-flex"
                        >
                            <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white px-4 py-2 rounded-xl flex items-center gap-1 shadow">
                                <FaLocationDot className="text-xl" />
                                <span className="font-semibold text-xs hidden sm:inline ml-1">Open in Maps</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceCardItem;
