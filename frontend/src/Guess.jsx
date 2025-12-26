import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import 'leaflet/dist/leaflet.css';

import ObrazekIkonki from './assets/location.png';
import RiddleImage from './assets/riddle-sample.jpg';

const targetPosition = [51.2024305556, 16.2123805556];
const ikonka = new Icon({ iconUrl: ObrazekIkonki, iconSize: [34, 34], iconAnchor: [17, 34] });

export default function Guess() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mapExpanded, setMapExpanded] = useState(false);
    const [mobileShowMap, setMobileShowMap] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [openLightbox, setOpenLightbox] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            const timer = setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [mapExpanded, mobileShowMap, isMobile]);

    return (
        <div className="w-full flex flex-col items-center bg-gray-100 min-h-screen">
            {/* Lightbox Integration */}
            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                slides={[{ src: RiddleImage }]}
            />

            {/* Top Banner */}
            <div className="w-full bg-sky-500 text-white p-4 flex justify-between items-center shadow-lg z-30">
                <div className="font-mono">NEXT: 09:00:00</div>
                <div className="font-black text-xl italic tracking-tighter uppercase">Riddle Game</div>
                <div className="w-10"></div>
            </div>

            {/* Main Content Box - No Shadow */}
            <div className="w-[95%] max-w-6xl bg-white border-b-yellow-100 border-black mt-6 min-h-[750px] p-4 md:p-6 flex flex-col items-center mb-10">

                {/* Menu Button */}
                <div className="w-full mb-6">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="px-6 py-2 border-4 border-black font-black hover:bg-yellow-300 transition-colors uppercase text-sm">
                        MENU
                    </button>
                    {menuOpen && (
                        <div className="absolute mt-2 w-48 bg-white border-1 border-black z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="p-2 border-b-2 border-black hover:bg-gray-100 cursor-pointer font-bold">Tutorial</div>
                            <div className="p-2 hover:bg-gray-100 cursor-pointer font-bold">Leaderboard</div>
                        </div>
                    )}
                </div>

                {/* THE CHALLENGE CONTAINER - FLEX RATIO BASED */}
                <div className="w-full flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px] mb-8">

                    {/* PICTURE FRAME */}
                    <div
                        onClick={() => setOpenLightbox(true)}
                        className={`
                            relative border-2 border-black rounded-lg overflow-hidden bg-black transition-all duration-500 cursor-zoom-in group
                            ${mapExpanded ? 'lg:flex-[1.2]' : 'lg:flex-[2.5]'} 
                            w-full aspect-[4/3] lg:aspect-auto lg:h-full
                        `}
                    >
                        <img
                            src={RiddleImage}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            alt="Guess this location"
                        />
                    </div>

                    {/* MAP PANEL */}
                    <div className={`
                        relative flex flex-col transition-all duration-500 border-2 border-black rounded-lg bg-white
                        ${mapExpanded ? 'lg:flex-[1.2]' : 'lg:flex-[1]'} 
                        ${mobileShowMap ? 'h-[350px]' : 'h-[60px] lg:h-full'}
                        w-full lg:max-w-[600px]
                    `}>
                        {/* Map Header */}
                        <div className="w-full h-12 border-b-2 border-black flex items-center justify-between px-4 bg-gray-50 flex-shrink-0">
                            <span className="font-black text-sm uppercase">Minimap</span>
                            <button
                                onClick={() => isMobile ? setMobileShowMap(!mobileShowMap) : setMapExpanded(!mapExpanded)}
                                className="bg-yellow-400 hover:bg-yellow-500 border-2 border-black px-3 py-1 text-xs font-black rounded uppercase transition-transform active:scale-90"
                            >
                                {isMobile ? (mobileShowMap ? "Hide" : "Show") : (mapExpanded ? "Shrink" : "Expand")}
                            </button>
                        </div>

                        {/* Leaflet Map Area */}
                        <div className={`
                            flex-grow w-full overflow-hidden transition-all duration-500
                            ${isMobile && !mobileShowMap ? 'opacity-0 invisible' : 'opacity-100 visible'}
                        `}>
                            <MapContainer
                                center={targetPosition}
                                zoom={14}
                                style={{ height: '100%', width: '100%' }}
                                ref={mapRef}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={targetPosition} icon={ikonka} />
                            </MapContainer>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <button className="w-full max-w-md py-5 bg-sky-500 text-white border-4 border-black font-black text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-sky-400  active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all uppercase mt-auto">
                    Confirm Guess
                </button>
            </div>
        </div>
    );
}