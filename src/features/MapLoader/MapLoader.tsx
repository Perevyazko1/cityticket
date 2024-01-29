import React, {memo, ReactNode, useContext, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Map} from "../Map/Map";
import {MapDrag} from "../MapDrag/MapDrag";
import {Button} from "shared/ui/Button/Button";
import cls from "./Maploader.module.scss";
import {useUpdateContext} from "../Context/UpdateContext";


interface MapLoaderProps {
    className?: string
    children?: ReactNode
}


export const MapLoader = memo((props: MapLoaderProps) => {
    const [scale, setScale] = useState(0.41);
    const {setUpdate, update} = useUpdateContext()

    const handleZoomIn = () => {
        setScale(scale => scale * 1.2);
        setUpdate(true)
    };

    const handleZoomOut = () => {
        setScale(scale => scale * 0.8);
        setUpdate(true)
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