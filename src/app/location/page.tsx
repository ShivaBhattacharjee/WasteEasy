"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "76vh",
    borderRadius: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Added box shadow
};

import { Lato } from "next/font/google";

import SpinLoading from "@/components/loading/SpinLoading";
const lato = Lato({ weight: "400", subsets: ["latin"] });

const GoogleMapsComponent: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [wasteDumpLocations, setWasteDumpLocations] = useState<any[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<any | null>(null);

    useEffect(() => {
        if (!isLoaded) return;
        console.log("Google Maps loaded");
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting user location:", error);
                },
            );
        } else {
            console.error("Geolocation is not supported by your browser.");
        }

        // Fetch waste dump locations
        fetch("/api/auth/profile")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.userData && data.userData.wasteDumped) {
                    setWasteDumpLocations(data.userData.wasteDumped);
                }
            })
            .catch((error) => {
                console.error("Error fetching waste dump locations:", error);
            });
    }, [isLoaded]);

    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
    };

    const handleCloseInfoWindow = () => {
        setSelectedMarker(null);
    };

    return (
        <div className={`${lato.className}`}>
            <h1 className={`text-3xl uppercase mt-5 mb-5 font-semibold`}>Bin Station</h1>
            {isLoaded ? (
                <GoogleMap mapContainerStyle={containerStyle} center={userLocation || { lat: 0, lng: 0 }} zoom={userLocation ? 16 : 3}>
                    {wasteDumpLocations.map((dump, index) => (
                        <Marker key={index} position={{ lat: dump.latitude, lng: dump.longitude }} onClick={() => handleMarkerClick(dump)}>
                            {selectedMarker === dump && (
                                <InfoWindow onCloseClick={handleCloseInfoWindow}>
                                    <div>
                                        <h2>Waste Dump Location</h2>
                                        <p>Latitude: {dump.latitude}</p>
                                        <p>Longitude: {dump.longitude}</p>
                                        <p>
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${dump.latitude},${dump.longitude}`} target="_blank" rel="noopener noreferrer">
                                                View in Google Maps
                                            </a>
                                        </p>
                                        {/* Add more options as needed */}
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <SpinLoading />
                </div>
            )}
        </div>
    );
};

export default GoogleMapsComponent;
