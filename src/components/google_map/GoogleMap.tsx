/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import "./googlemap.css";
import { RestaurantPlaceKeys } from '@/configs/places';

const map_styles = [
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#000000" }],
  },
  {
    elementType: "geometry",
    stylers: [{ color: "#0b0b0b" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#5b5b5b" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#0b0b0b" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2a2a2a" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3a3a3a" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6e6e6e" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#101010" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3e3e3e" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.school",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.attraction",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
];

const placesMarkers = [
  {
    key: RestaurantPlaceKeys.RedOctober,
    title: 'М А Т Р Ё Ш К А',
    position: {
      lat: 55.740046,
      lng: 37.610278,
    },
  }
]

const moscowPosition = { lat: 55.726244, lng: 37.548423 };
const targetZoom = 12;

type Props = {
  className?: string;
  selectedMarker: RestaurantPlaceKeys | null;
  onSelectMarker: (key: RestaurantPlaceKeys) => void;
  GoogleMapID: string;
};

type MarkerItem = {
  marker: any;
  key: RestaurantPlaceKeys;
};

export function GoogleMap({
  GoogleMapID,
  onSelectMarker,
  selectedMarker,
  className,
}: Props) {
  const google = typeof window === "undefined" ? null : (window.google as any);

  const markersRef = useRef<MarkerItem[]>([]);
  const mapRef = useRef<any | null>(null);



  function smoothZoom(map: any, target: number, step = 1) {
    const currentZoom = map.getZoom() ?? 0;
    if (currentZoom === target) return;

    const delta = target > currentZoom ? step : -step;
    const nextZoom = currentZoom + delta;

    map.setZoom(nextZoom);

    if (nextZoom !== target) {
      setTimeout(() => smoothZoom(map, target, step), 600);
    }
  }

  const paintSelectedMarker = (key: RestaurantPlaceKeys) => {
    markersRef.current.forEach((m) => {
      let X = 100, Y = 40;

      switch (m.key) {
        case RestaurantPlaceKeys.RedOctober:
          X = 100;
          Y = 40;
          break;
        default:
          const _: never = m.key;
      }

      m.marker.setIcon(
        google?.maps
          ? {
            url: "/svg/default_marker.svg",
            scaledSize: new google.maps.Size(36, 52),
            labelOrigin: new google.maps.Point(X, Y),
          }
          : undefined
      )
    });

    const selected = markersRef.current.find((m) => m.key === key);
    if (!selected) return;

    let X = 100, Y = 40;
    switch (selected.key) {
      case RestaurantPlaceKeys.RedOctober:
        X = 100;
        Y = 40;
        break;
      default:
        const _: never = selected.key;
    }

    const selectedIcon = google?.maps
      ? {
        url: "/svg/selected_marker.svg",
        scaledSize: new google.maps.Size(36, 52),
        labelOrigin: new google.maps.Point(X, Y),
      }
      : undefined;
    selected.marker.setIcon(selectedIcon);

    mapRef.current?.panTo(selected.marker.getPosition());
    smoothZoom(mapRef.current, targetZoom);
  };

  useEffect(() => {
    if (!selectedMarker) return;

    setTimeout(() => {
      paintSelectedMarker(selectedMarker);
    }, 1500)
  }, [selectedMarker]);

  function onMarkerClick(key: RestaurantPlaceKeys) {
    onSelectMarker(key);
    paintSelectedMarker(key);
  }

  useEffect(() => {
    const canInit =
      typeof window !== "undefined" &&
      google?.maps &&
      mapRef.current === null &&
      document.getElementById(GoogleMapID);

    if (!canInit) return;

    function initMarkers(map: any) {
      markersRef.current = [];

      for (const placeMarker of placesMarkers) {
        let X = 100, Y = 40;

        switch (placeMarker.key) {
          case RestaurantPlaceKeys.RedOctober:
            X = 130;
            Y = 48;
            break;
          default:
            const _: never = placeMarker.key;
        }

        const defaultIcon = google?.maps
          ? {
            url: "/svg/default_marker.svg",
            scaledSize: new google.maps.Size(36, 52),
            labelOrigin: new google.maps.Point(X, Y),
          }
          : undefined

        const marker = new google.maps.Marker({
          position: placeMarker.position,
          map,
          title: placeMarker.title,
          icon: defaultIcon,
          label: {
            text: placeMarker.title,
            color: "#e6d3bf",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "14px",
          },
        });

        markersRef.current.push({
          marker,
          key: placeMarker.key,
        });

        marker.addListener("click", () => onMarkerClick(placeMarker.key));
      }
    }

    function initMap() {
      const elem = document.getElementById(GoogleMapID) as HTMLElement;
      if (!elem) return;

      const map = new google.maps.Map(elem, {
        zoom: targetZoom,
        center: moscowPosition,
        styles: map_styles,
      });

      mapRef.current = map;
      initMarkers(map);
    }

    initMap();
  }, [GoogleMapID, google]);

  return (
    <section className={cn("w-full h-full relative ", className)}>
      <div id={GoogleMapID} className={cn("w-full h-full")} />

      <div
        className={cn(
          "absolute z-[4] left-0 right-0 top-0 h-[30%]",
          "bg-gradient-to-b via-10% via-custom-black-100/90 from-custom-black-100 to-transparent",
          "lg:h-[10%] lg:via-40%"
        )}
      />

      <div
        className={cn(
          "absolute z-[4] left-0 right-0 bottom-0 h-[30%]",
          "bg-gradient-to-t via-10% via-custom-black-100/80 from-custom-black-100 to-transparent",
          "lg:h-[10%] lg:via-40%"
        )}
      />
    </section>
  );
}
