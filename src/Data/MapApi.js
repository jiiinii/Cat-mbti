import React, { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import UseKakaoLoader from "./useKakaoLoader";
import styled from "styled-components";

export default function BasicMap() {
  UseKakaoLoader();

  const { kakao } = window;
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  // 입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState("");

  // 검색 기능
  const keywordChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const submitKeyword = (e) => {
    e.preventDefault();
  };

  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    } else {
      if (!map) return;
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(Value, (data, status) => {
        console.log("data >>> ", data);
        // const resultEl = document.querySelector(".element");
        // console.log("tmp >>> ", resultEl);
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }

        if (data.length !== 0) {
          data.map((item) => {
            console.log("item >>> ", item);
            const resultList = document.createElement("li");
            resultList.className = "restaurant";

            // 가게 이름
            let restaurantName = item.place_name;
            console.log("restaurantName >>> ", restaurantName);

            // 음식 종류
            if (item.category_name) {
              var afterStr = item.category_name.split('>');
              var restaurantType = afterStr[1];
              console.log("restaurantType >>> ", restaurantType);
            }

            // 가게 주소
            let restaurantAdd = item.road_address_name;
            console.log("restaurantAdd >>> ", restaurantAdd);

            // 가게 전화번호
            if (item.phone !== 0) {
              var restaurantTel = item.phone || "정보 없음"
            }
            console.log("restaurantTel >>> ", restaurantTel);

            resultList.innerHTML = `${restaurantName === <p>안녕하세용</p>}`;
            console.log("resultList >>> ", resultList);
          });
        }
      });
    }
  };

  // 현재 위치 추적
  const [state, setState] = useState({
    center: {
      // Default : 카카오 본사
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옴
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없습니다",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <Fixation>
        <SearchForm method="post" onSubmit={submitKeyword}>
          <input
            className="search-entry"
            onChange={keywordChange}
            placeholder="검색어를 입력해 주세요."
            type="text"
          ></input>
          <div>
            <button className="btn" onClick={valueChecker}>
              Search
            </button>
          </div>
        </SearchForm>
        <div className="element">
          <SearchResult>
            <ul id="placesList"></ul>
          </SearchResult>
        </div>
      </Fixation>
      <div className="myMap">
        <Map
          center={state.center}
          style={{ width: "758px", height: "650px", borderRadius: "10px" }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: "#000" }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
          {!state.isLoading && <MapMarker position={state.center}></MapMarker>}
          <ZoomControl />
        </Map>
      </div>
    </>
  );
}

const Fixation = styled.div`
  display: block;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  align-items: baseline;
  margin-right: 80px;

  .search-entry {
    background-color: #f5f5f5;
    padding: 0px 20px 0px 20px;
    width: 350px;
    height: 50px;
    position: relative;
    border: 2px solid #545454;
    border-radius: 10px;
    font-size: 15px;
  }

  .btn {
    vertical-align: baseline;
    height: 50px;
    padding: 0 25px;
    max-width: 100%;
    line-height: 24px;
    display: inline-block;
    background-color: #efe4a2;
    border-radius: 8px;
    border: 2px solid #545454;
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
      background-color: #f7f7f7;
    }
  }
`;

const SearchResult = styled.div`
  width: 465px;
  height: 580px;
  background-color: #f5f5f5;
  border: 2px solid #545454;
  border-radius: 8px;
  overflow: auto;
  padding: 20px;
`;
