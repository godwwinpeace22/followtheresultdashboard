import React from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type data = {
  lat: number;
  lon: number;
  popupText: string;
  icon: "RedIcon" | "BlackIcon";
}[];

export default function Map({ data }: { data: data }) {
  const center = [9.047821, 7.475961];
  const L = require("leaflet");

  const RED_MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
  <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
  <svg height="80px" width="80px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
       viewBox="0 0 31.955 31.955" xml:space="preserve">
  <g>
      <path style="fill:#e71111;" d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3
          c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"/>
      <path style="fill:#e71111;" d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416
          C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375
          C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672
          C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137
          C17.523,1.94,14.328,1.906,11.394,2.883z"/>
      <circle style="fill:#e71111;" cx="15.979" cy="15.977" r="6.117"/>
  </g>
  </svg>`)}`;

  const BLACK_MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
  <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
  <svg height="80px" width="80px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
       viewBox="0 0 31.955 31.955" xml:space="preserve">
  <g>
      <path style="fill:#030104;" d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3
          c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"/>
      <path style="fill:#030104;" d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416
          C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375
          C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672
          C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137
          C17.523,1.94,14.328,1.906,11.394,2.883z"/>
      <circle style="fill:#030104;" cx="15.979" cy="15.977" r="6.117"/>
  </g>
  </svg>`)}`;

  const RedIcon = L.icon({
    iconUrl: RED_MARKER,
    iconSize: [10, 10],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  const BlackIcon = L.icon({
    iconUrl: BLACK_MARKER,
    iconSize: [10, 10],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  const icons = {
    RedIcon: RedIcon,
    BlackIcon: BlackIcon,
  };

  return (
    <MapContainer
      center={[9.047821, 7.475961]}
      zoom={6}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data?.map((item, i) => (
        <Marker
          position={[Number(item.lat), Number(item.lon)]}
          icon={icons[item?.icon]}
        >
          <Popup>{item?.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
