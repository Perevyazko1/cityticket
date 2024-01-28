import React, {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import axios from "axios";
import {Map} from "../Map/Map";
import {mapData} from "entity/MapLoader";
import {MapDrag} from "../MapDrag/MapDrag";


interface MapLoaderProps {
    className?: string
    children?: ReactNode
}


export const MapLoader = memo((props: MapLoaderProps) => {
    const {parse, stringify} = require('svgson');
    const svgson = require('svgson');

    const [svgData, setSvgData] = useState<mapData>();

    useEffect(() => {
        // Эмуляция запроса к API для получения SVG-схемы
        axios.get('http://tsnext.ru/test/frontend/resources/dkl-tsn.svg')
            .then(async (response) => {
                // Установка загруженной SVG-схемы в состояние
                setSvgData(response.data);

                // Преобразование SVG в объект JSON
                const json = await parse(response.data);
                // const foundObject = json.children.find((item: any) => item.name === "g");
                // console.log(json)
                setSvgData(json)
            })
            .catch(error => {
                console.error('Ошибка загрузки SVG-схемы:', error);
            });
    }, []);

    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            <MapDrag>
                <Map apiSvg={'http://tsnext.ru/test/frontend/resources/dkl-tsn.svg'}/>
            </MapDrag>

        </div>
    );
});