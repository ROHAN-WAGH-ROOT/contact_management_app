import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getCountriesData } from "../Services/api";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

export default function ChartMap() {
  const {
    data: countries = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["countries"], queryFn: getCountriesData });

  type State = {
    center: [number, number];
    zoom: number;
  };

  const state: State = {
    center: [51.505, -0.091],
    zoom: 13,
  };

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="h-[80vh] w-full">
      <MapContainer
        center={state.center}
        zoom={state.zoom}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {countries.map((country: any) => (
          <Marker
            key={country.countryInfo.iso2}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <strong>{country.country}</strong>
              <br />
              Total Cases: {country.cases}
              <br />
              Active Cases: {country.active}
              <br />
              Recovered Cases: {country.recovered}
              <br />
              Deaths: {country.deaths}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
