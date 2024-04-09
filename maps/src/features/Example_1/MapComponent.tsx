
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import mapboxgl, { LngLatLike, NavigationControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { RootState, incrementCounter } from 'src/store/store';

import { COLORS, MAPS_STYLE, MAPS_TOKEN } from 'src/constants/Constants';

import styled from 'styled-components/macro';

mapboxgl.accessToken = MAPS_TOKEN;

const Container = styled.div`
 display: flex;
 flex-direction: column;
 width: 100%;
 height: fit-content;

`;

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh);
`;

interface Marker {
    id: string;
    coordinates: LngLatLike;
    color: string;
}

const INITIAL_LAT = 32.088777452;
const INITIAL_LONG = 34.781800515;
const INITIAL_ZOOM = 12;
const markers: Marker[] = [
    { id: 'marker1', coordinates: [34.781800515, 32.088777452], color: COLORS.red },
    { id: 'marker2', coordinates: [34.793269694, 32.076593575], color: COLORS.blue },
    { id: 'marker3', coordinates: [34.763176778, 32.064936193], color: COLORS.green },
];

export default function MapComponent() {
    const dispatch = useDispatch();
    const counters = useSelector((state: RootState) => state.markers.counters);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const markerRefs = useRef<{ [key: string]: HTMLDivElement }>({});

    const initializeMap = () => {
        const mapInstance = new mapboxgl.Map({
            container: 'map',
            style: MAPS_STYLE,
            center: [INITIAL_LONG, INITIAL_LAT],
            zoom: INITIAL_ZOOM,
        });

        mapInstance.on('load', () => {
            setMap(mapInstance);

            mapInstance.addControl(new NavigationControl(), 'top-left');

            markers.forEach(marker => {
                const markerElement = document.createElement('div');
                markerElement.style.background = marker.color;
                markerElement.style.width = '30px';
                markerElement.style.height = '30px';
                markerElement.style.borderRadius = '50%';
                markerElement.style.position = 'absolute';
                markerElement.style.display = 'flex';
                markerElement.style.justifyContent = 'center';
                markerElement.style.alignItems = 'center';
                markerElement.style.color = 'white';
                markerElement.style.fontWeight = 'bold';
                markerElement.textContent = `${counters[markers.indexOf(marker)] || 0}`;

                new mapboxgl.Marker(markerElement)
                    .setLngLat(marker.coordinates)
                    .addTo(mapInstance);

                markerElement.addEventListener('click', () => {
                    dispatch(incrementCounter(markers.indexOf(marker)));
                });

                markerRefs.current[marker.id] = markerElement;
            });
        });
    };

    useEffect(() => {
        if (!map) {
            initializeMap();
        } else {
            markers.forEach(marker => {
                const markerElement = markerRefs.current[marker.id];
                if (markerElement) {
                    markerElement.textContent = `${counters[markers.indexOf(marker)] || 0}`;
                }
            });
        }
    }, [map, counters]);

    return (
        <Container>
            <MapContainer id="map" />
        </Container>

    );
};


