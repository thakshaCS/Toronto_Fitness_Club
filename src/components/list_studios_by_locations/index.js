import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// Reference: https://github.com/leighhalliday/google-maps-react-2020/blob/master/src/App.js

import mapStyles from "./mapStyles";
import Button from 'react-bootstrap/Button';

import {Link} from "react-router-dom";


const libraries = ["places"];
const mapContainerStyle = {
    marginLeft: "10vw",

  height: "80vh",
  width: "80vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

const StudioMap = () => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAnVrT1bwjiDTq9TCQQLsRhZ0sUYwaiXFg",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers([

      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (

    <div>


      <Locate panTo={panTo} />


         {markers.map((marker) => (

            <a href={`/studios/${marker.lat}/${marker.lng}`} class="btn btn-success" role="button" style={{ marginTop: '20px', marginBottom: '10px'}}>Find Studios</a>




            ))}



      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {console.log(markers)}
        {markers.map((marker) => (

          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}

          />

        ))}



        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >

          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>

  );
}

function Locate({ panTo }) {
  return (
  <button type="button" class="btn btn-primary"
  style={{ marginTop: '20px', marginBottom: '10px', marginLeft: "10vw",}}

      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
    Locate Me!
    </button>
  );
}

export default StudioMap ;
