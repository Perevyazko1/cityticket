import React, {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import axios from "axios";
import {Map} from "../Map/Map";
import {mapData} from "entity/MapLoader";
import {MapDrag} from "../MapDrag/MapDrag";
import svg from "./converted.svg"
import {Button} from "../../shared/ui/Button/Button";
import cls from "./Maploader.module.scss";


interface MapLoaderProps {
    className?: string
    children?: ReactNode
}


export const MapLoader = memo((props: MapLoaderProps) => {
        const [scale, setScale] = useState(0.41);

    const {parse, stringify} = require('svgson');
    const svgson = require('svgson');

    const [svgData, setSvgData] = useState<mapData>();

    // useEffect(() => {
    //     // Эмуляция запроса к API для получения SVG-схемы
    //     axios.get('http://tsnext.ru/test/frontend/resources/dkl-tsn.svg')
    //         .then(async (response) => {
    //             // Установка загруженной SVG-схемы в состояние
    //             setSvgData(response.data);
    //
    //             // Преобразование SVG в объект JSON
    //             const json = await parse(response.data);
    //             // const foundObject = json.children.find((item: any) => item.name === "g");
    //             // console.log(json)
    //             setSvgData(json)
    //         })
    //         .catch(error => {
    //             console.error('Ошибка загрузки SVG-схемы:', error);
    //         });
    // }, []);


        const handleZoomIn = () => {
        setScale(scale => scale * 1.2);
    };

    const handleZoomOut = () => {
        setScale(scale => scale * 0.8);
    };


    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            className={classNames(cls.Maploader, mods, [className])}
            {...otherProps}
        >
            <div className={cls.dragWrapper}>
                            <MapDrag>
                <Map scale={scale} apiSvg={'https://ci41159.tw1.ru/static/converted.svg'}/>
            </MapDrag>

            </div>
                <div className={cls.buttonGroup}>
                    <Button onClick={handleZoomIn}>+</Button>
                    <Button onClick={handleZoomOut}>-</Button>
                </div>

        </div>
    );
});