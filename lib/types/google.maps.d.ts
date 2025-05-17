// src/types/google.maps.d.ts
declare namespace google.maps {
 class Map {
  constructor(mapDiv: HTMLElement, opts?: MapOptions);
 }

 class Size {
  constructor(width: number, height: number);
  width: number;
  height: number;
 }

 interface MapOptions {
  center: LatLng | LatLngLiteral;
  zoom?: number;
  mapId?: string;
  styles?: MapTypeStyle[];
 }

 class Marker {
  constructor(opts?: MarkerOptions);
  setMap(map: Map | null): void;
  addListener(eventName: string, handler: Function): MapsEventListener;
 }

 interface MarkerOptions {
  position?: LatLng | LatLngLiteral;
  map?: Map;
  title?: string;
  icon?: string | Icon;
 }

 class InfoWindow {
  constructor(opts?: InfoWindowOptions);
  open(options?: InfoWindowOpenOptions): void;
 }

 interface InfoWindowOptions {
  content?: string | Node;
 }

 interface InfoWindowOpenOptions {
  anchor?: any;
  map?: Map;
  shouldFocus?: boolean;
 }

 interface LatLng {
  lat(): number;
  lng(): number;
 }

 interface LatLngLiteral {
  lat: number;
  lng: number;
 }

 interface Size {
  width: number;
  height: number;
 }

 class Point {
  constructor(x: number, y: number);
 }

 interface Icon {
  url: string;
  scaledSize?: Size;
  anchor?: Point;
 }

 interface MapTypeStyle {
  featureType?: string;
  elementType?: string;
  stylers?: MapTypeStyler[];
 }

 interface MapTypeStyler {
  visibility?: string;
 }

 interface MapsEventListener {
  remove(): void;
 }
}

interface Window {
 google: {
  maps: typeof google.maps;
 };
}


