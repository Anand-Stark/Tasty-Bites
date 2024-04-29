// import React, { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import { useSelector } from 'react-redux';

// function MapView() {
//     const mapContainer = useRef(null);
//     const accessToken ='pk.eyJ1IjoidmFpYmhhdjA4MDYiLCJhIjoiY2xmaTFxMGc2MDd2bzN5cDJ1d2ExeDBtaSJ9.ksRFszOL1mPE2B0oxLvAJA'; // Replace with your Mapbox access token
//     const orders = useSelector(state => state.orders); // Get orders from Redux state

//     // Function to generate random coordinates within the region of Delhi
//     function getRandomDelhiCoordinates() {
//         // Latitude range for Delhi (approximately 28.5 to 28.9 degrees)
//         const minLat = 29.1;
//         const maxLat = 29.2;

//         // Longitude range for Delhi (approximately 76.8 to 77.3 degrees)
//         const minLng = 77.5;
//         const maxLng = 77.7;

//         const lat = Math.random() * (maxLat - minLat) + minLat;
//         const lng = Math.random() * (maxLng - minLng) + minLng;

//         return { lat, lng };
//     }

//     // Generate random coordinates for each order within the region of Delhi
//     const ordersWithCoordinates = orders?.map(order => ({
//         ...order,
//         ...getRandomDelhiCoordinates()
//     }));

//     useEffect(() => {
//         mapboxgl.accessToken = accessToken;

//         const map = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://styles/mapbox/streets-v12',
//             center: [77.1025, 28.7041], // Delhi coordinates
//             zoom: 10,
//             scrollZoom: false
//         });

//         ordersWithCoordinates?.forEach(order => {
//             const popup = new mapboxgl.Popup({
//                 offset: 0,anchor:'top' // Adjust popup offset to control distance from marker
//             }).setHTML(`<p class="bg-white text-black p-2 rounded-md shadow-md ">${order.orderId}</p>`);

//             new mapboxgl.Marker()
//                 .setLngLat([order.lng, order.lat])
//                 .setPopup(popup)
//                 .addTo(map);
//         });

//         return () => map.remove();
//     }, [accessToken, ordersWithCoordinates]);

//     return <div ref={mapContainer} style={{ height: 'calc(100vh - 64px)', width: '100%' }} />;
// }

// export default MapView;

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL JS CSS

function MapView() {
    const mapContainer = useRef(null);
    const accessToken ='pk.eyJ1IjoidmFpYmhhdjA4MDYiLCJhIjoiY2xmaTFxMGc2MDd2bzN5cDJ1d2ExeDBtaSJ9.ksRFszOL1mPE2B0oxLvAJA'; // Replace with your Mapbox access token
    const orders = useSelector(state => state.orders); // Get orders from Redux state

    // Function to generate random coordinates within the region of Delhi
    function getRandomDelhiCoordinates() {
        // Latitude range for Delhi (approximately 28.5 to 28.9 degrees)
        const minLat = 29.1;
        const maxLat = 29.2;

        // Longitude range for Delhi (approximately 76.8 to 77.3 degrees)
        const minLng = 77.5;
        const maxLng = 77.7;

        const lat = Math.random() * (maxLat - minLat) + minLat;
        const lng = Math.random() * (maxLng - minLng) + minLng;

        return { lat, lng };
    }

    // Generate random coordinates for each order within the region of Delhi
    const ordersWithCoordinates = orders?.map(order => ({
        ...order,
        ...getRandomDelhiCoordinates()
    }));

    useEffect(() => {
        mapboxgl.accessToken = accessToken;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [77.7064, 29.15], // Delhi coordinates
            zoom: 10,
            scrollZoom: true
        });

        map.on('load', () => {
            ordersWithCoordinates?.forEach(order => {
                const popup = new mapboxgl.Popup({
                    offset: 0,anchor:'top' // Adjust popup offset to control distance from marker
                }).setHTML(`<p class="bg-white text-black p-2 rounded-md shadow-md ">${order.orderId}</p>`);

                new mapboxgl.Marker()
                    .setLngLat([order.lng, order.lat])
                    .setPopup(popup)
                    .addTo(map);
            });
        });

        return () => map.remove();
    }, [accessToken, ordersWithCoordinates]);

    return <div ref={mapContainer} style={{ height: 'calc(100vh - 64px)', width: '100%' }} />;
}

export default MapView;
