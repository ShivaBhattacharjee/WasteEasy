"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "600px",
};

const GoogleMapsComponent: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

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
    }, [isLoaded]);

    return (
        <div>
            {isLoaded && (
                <GoogleMap mapContainerStyle={containerStyle} center={userLocation || { lat: 0, lng: 0 }} zoom={userLocation ? 12 : 3} onLoad={(map) => setMap(map)}>
                    {userLocation && <Marker position={userLocation} />}
                </GoogleMap>
            )}
        </div>
    );
};

export default GoogleMapsComponent;
