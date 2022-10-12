declare module 'react-native-bing-maps' {
  import React from 'react';
  import {NativeSyntheticEvent, ViewStyle} from 'react-native';
  interface BingMapsProps {
    credentialsKey?: string;
    pins?: MapPin[];
    mapLocation?: MapLocation;
    mapStyle?: string;
    style?: ViewStyle;
    buildingsVisible?: boolean;
    businessLandmarksVisible?: boolean;
    transitFeaturesVisible?: boolean;
    compassButtonVisible?: boolean;
    tiltButtonVisible?: boolean;
    zoomButtonsVisible?: boolean;
    copyrightDisplay?: 'allowHiding' | 'always';
    onMapPinClicked?: (e: NativeSyntheticEvent<EventTarget>) => void;
    onMapLoadingStatusChanged?: (e: NativeSyntheticEvent<EventTarget>) => void;
  }

  interface MapLocation {
    lat: number;
    long: number;
    zoom: number;
  }

  interface MapPin {
    lat: number;
    long: number;
    icon: string;
  }

  export default class BingMapsView extends React.Component<BingMapsProps> {}
}
