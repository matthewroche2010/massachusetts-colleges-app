import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import PropTypes from 'prop-types';

const MapWithAMarker = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{lat: 42.25, lng: -71.8}}
    >
      {props.records.length && props.records.map((record) => {
        const icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        return (
          <Marker
            key={record.recordId}
            position={{
              lat: record.lat,
              lng: record.lng,
            }}
            onClick={() => props.onMarkerClick(record.recordId)}
            icon={icon}
          />
        );
      })}
    </GoogleMap>
  );
}));

export const Map = ({records, onMarkerClick}) => {
  const paperlessPartsmapKey = 'AIzaSyCTAHVWwpVFqiRjQxtNsSsG1Mw_GJpbQQk';
  let url = 'https://maps.googleapis.com/maps/api/js?key=';
  url += paperlessPartsmapKey;
  url += '&v=3.exp&libraries=geometry,drawing,places';
  return (
    <MapWithAMarker
      googleMapURL={url}
      loadingElement={<div style={{height: `100%`}}/>}
      containerElement={<div style={{height: `100%`}}/>}
      mapElement={<div style={{height: `100%`}}/>}
      records={records}
      onMarkerClick={onMarkerClick}
    />
  );
};

Map.propTypes = {
  markerPositions: PropTypes.array,
  onMarkerClick: PropTypes.func,
  records: PropTypes.array,
};
