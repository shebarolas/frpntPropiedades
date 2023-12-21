import { useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPinLock } from "@fortawesome/free-solid-svg-icons";

//-38.750951, -72.605735
export default function Map({
  latitude = -38.750951,
  longitude = -72.605735,
  rounded = true,
}) {
  const mapRef = useRef(null);
  const [viewPort, setViewPort] = useState({
    latitude,
    longitude,
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
    >
      <Marker latitude={latitude} longitude={longitude} anchor="bottom">
        <FontAwesomeIcon
          icon={faLocationPinLock}
          size="2x"
          className="text-red-500"
        />
      </Marker>
    </ReactMapGL>
  );
}
