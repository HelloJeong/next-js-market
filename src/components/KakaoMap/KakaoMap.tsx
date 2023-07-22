import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  setCustomValue?: (id: string, value: number) => void; // 상세페이지에서는 업데이트 하지 못하게 할꺼라 optional로
  latitude: number;
  longitude: number;
  detailPage?: boolean;
}

const KakaoMap: React.FC<KakaoMapProps> = ({
  latitude,
  longitude,
  setCustomValue,
  detailPage = false,
}) => {
  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (detailPage) return;

    setCustomValue!("latitude", mouseEvent.latLng.getLat());
    setCustomValue!("longitude", mouseEvent.latLng.getLng());
  };

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
    </Map>
  );
};

export default KakaoMap;
