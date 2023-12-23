import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManagerF } from '@react-google-maps/api';
import { googleMapsApiKey } from './utils';

const containerStyle = {
  width: '100%',
  height: '90vh'
};

const center = {
  lat: -7.2575,
  lng: 112.7521
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['drawing']
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <DrawingManagerF
            drawingMode={window?.google.maps.drawing.OverlayType.POLYGON}
            onPolygonComplete={((polygon) => {
              console.log(polygon);
            })}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: window?.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  window.google.maps.drawing.OverlayType.MARKER,
                  window.google.maps.drawing.OverlayType.POLYGON,
                ],
              },
              polygonOptions: { editable: true },
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}</>
  );
}

export default App;
