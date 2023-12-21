import { useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { MdLocationOn } from "react-icons/md";

//-38.750951, -72.605735
export default function SelectUbication({
  location,
  setLocation,
  rounded = true,
}) {
  const mapRef = useRef(null);
  const [viewPort, setViewPort] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  });

  return (
    <ReactMapGL
      {...viewPort}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{
        height: "100%",
        width: "100%",
        borderRadius: rounded ? "1rem" : "0rem",
      }}
      minZoom={5}
      maxZoom={15}
      ref={(instance) => (mapRef.current = instance)}
      onMove={(e) => setViewPort(e.viewState)}
      onViewportChange={(viewport) => setViewPort(viewport)}
      onDblClick={(e) => {
        const { lat, lng } = e.lngLat;
        setLocation({
          latitude: lat,
          longitude: lng,
        });
      }}
    >
      <Marker
        latitude={location.latitude}
        longitude={location.longitude}
        anchor="bottom"
      >
        <MdLocationOn className="text-red-500 w-7 h-7" />
      </Marker>
    </ReactMapGL>
  );
}
