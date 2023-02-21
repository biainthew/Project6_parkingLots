import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import './MyMap.scss';
import MapMarkers from './Mapmarkers';
import { useRef } from 'react';
const { kakao } = window;

const MyMap = () => {
    const [state, setState] = useState({
        center: { lat: 36.2683, lng: 127.6358 },
        isPanto: true,
    });
    const [searchAddress, setSearchAddress] = useState();
    const SearchMap = () => {
        const places = new kakao.maps.services.Places();
        let placesSearch = function (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                const newSearch = data[0];
                setState({
                    center: { lat: newSearch.y, lng: newSearch.x },
                });
            } else {
                console.log('위치를 찾을 수 없습니다');
            }
        };
        places.keywordSearch(`${searchAddress}`, placesSearch);
    };
    const handleSearchAddress = (e) => {
        setSearchAddress(e.target.value);
    };
    const mapRef = useRef();
    const onClusterclick = (_target, cluster) => {
        const map = mapRef.current;
        const level = map.getLevel() - 1;
        map.setLevel(level, { anchor: cluster.getCenter() });
    };

    let [locations, setLocations] = useState([]);
    useEffect(() => {
        axios
            .get(
                'http://api.kcisa.kr/openapi/service/rest/convergence2019/getConver11?serviceKey=51a64879-1354-44fe-a738-c8a05f7559d1&numOfRows=100',
            )
            .then((result) => {
                locations = result.data.response.body.items.item;
                setLocations(locations);
            })
            .catch((error) => {
                console.log(`axios get 에러 발생 ${error}`);
            });
    }, []);

    return (
        <div className="map-wrap">
            <Map
                className="map"
                center={state.center}
                isPanto={state.isPanto}
                level={13}
                ref={mapRef}
            >
                <div className="map-search">
                    <input
                        type="text"
                        onChange={handleSearchAddress}
                        placeholder="어디에 주차하세요?"
                    />
                    <button onClick={SearchMap}>
                        <img
                            src="https://biainthew.github.io/Project6_parkingLots/img/ico_search.svg"
                            alt="search"
                        />
                    </button>
                </div>
                <MarkerClusterer
                    averageCenter={true}
                    minLevel={5}
                    disableClickZoom={true}
                    onClusterclick={onClusterclick}
                >
                    <MapMarkers locations={locations} />
                </MarkerClusterer>
            </Map>
        </div>
    );
};

export default MyMap;
