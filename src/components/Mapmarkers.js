// 이름 title / 공영민영 state / 주소 spatial / 번호 x / 운영시간 time / 요금 charge
// 주차면수 extent / 특이사항 description
// 위치 relation 위도, 경도: ..., ...
import React from 'react';
import { useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import Detail from './Detail';

const MapMarkers = ({ locations }) => {
    const positions = locations.map((item, idx) => {
        // <relation>위도, 경도: 36.24104363, 127.0664824</relation>
        const returnObj = {};
        const relation = item.relation;
        const split = relation.split(' ');
        const split2 = split[2].split(',');
        const lats = split2[0];
        const lngs = split[3];

        const title = item.title;
        const state = item.state;
        const charge = item.charge;
        const extent = item.extent;
        let time = item.time.replace(
            '평일운영시간: 0:00~0:00  |  토요일운영시간: 0:00~0:00  |  공휴일운영시간: 0:00~0:00',
            '24시간 영업',
        );

        returnObj['lat'] = lats;
        returnObj['lng'] = lngs;

        returnObj['title'] = title;
        returnObj['state'] = state;
        returnObj['charge'] = charge;
        returnObj['extent'] = extent;
        returnObj['time'] = time;

        return returnObj;
    });
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {positions.map((location, idx) => {
                return (
                    <div key={idx}>
                        <MapMarker
                            position={location}
                            image={{
                                src: '/img/Parkinglot_sign.svg',
                                size: {
                                    width: 35,
                                    height: 46,
                                },
                            }}
                            title={location.title}
                            onClick={() => setIsOpen(true)}
                        />
                        {isOpen && (
                            <CustomOverlayMap position={location}>
                                <div
                                    width="14"
                                    height="13"
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <img src="/img/xmark.svg" alt="x" />
                                </div>
                                <div className="detail">
                                    <div className="detail-line"></div>
                                    <div className="detail-title">
                                        <h3>{location.title}</h3>
                                        <h5>{location.state} 주차장</h5>
                                    </div>
                                    <div className="detail-info">
                                        <p>
                                            <img src="./img/info1.svg" alt="" />
                                            경기 수원시 팔달구 매산로 31
                                        </p>
                                        <p>
                                            지번 | 경기 수원시 팔달구 매산로2가
                                            35-4
                                        </p>
                                        <p style={{ overflow: 'scroll' }}>
                                            <img src="./img/info2.svg" alt="" />
                                            {location.time}
                                        </p>
                                        <p>
                                            <img src="./img/info3.svg" alt="" />
                                            연중무휴
                                        </p>
                                        <p>
                                            <img src="./img/info4.svg" alt="" />
                                            {location.charge}
                                        </p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="detail-more">
                                        <h6>부가정보</h6>
                                        <ul>
                                            <li>- {location.extent}</li>
                                            <li>- 노외</li>
                                        </ul>
                                    </div>
                                </div>
                            </CustomOverlayMap>
                        )}
                    </div>
                );
            }, [])}
        </>
    );
};

export default MapMarkers;
