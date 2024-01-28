import {attributesSvgType} from 'entity/Map';
import {memo, ReactNode, useEffect, useRef, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {ReactSVG} from 'react-svg';
import {Button} from "shared/ui/Button/Button";
import cls from "./Map.module.scss"


interface MapProps {
    className?: string
    children?: ReactNode
    apiSvg: string
}


export const Map = memo((props: MapProps) => {
    const [scale, setScale] = useState(0.41);
    const svgRef = useRef(null)

const handleElementClick = (event: any) => {
  const clickedElement = event.target;

  // Получить координаты и размеры элемента
  const boundingBox = clickedElement.getBoundingClientRect();
  const originalWidth = boundingBox.width;
  const originalHeight = boundingBox.height;
  const originalX = boundingBox.left;
  const originalY = boundingBox.top;

  const newWidth = originalWidth * scale;
  const newHeight = originalHeight * scale;

  // Пересчитать координаты клика относительно нового масштаба
  const clickX = (event.clientX - originalX) * (scale - 1);
  const clickY = (event.clientY - originalY) * (scale - 1);
console.log(clickedElement.style.fill)
  // Применить цвет или другие стили, используя новые координаты и размеры
    if (clickedElement.style.fill === "red"){
        clickedElement.style.fill = "";
    }else {
        clickedElement.style.fill = "red";
    }

  // Применить другие стили, используя новые координаты и размеры

  // setSeatList(prevList => [...prevList, 'новое значение']);
};        const handleZoomIn = () => {
        setScale(scale => scale * 1.2);
    };

    const handleZoomOut = () => {
        setScale(scale => scale * 0.8);
    };



    const {
        className,
        children,
        apiSvg,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            className={classNames("", mods, [className])}
            {...otherProps}
        >
            <ReactSVG
                className={cls.Map}
                src={apiSvg}
                style={{transform: `scale(${scale})`, transformOrigin: 'left top'}}
                onClick={handleElementClick}
            />
            <div className={cls.buttonGroup}>
                <Button onClick={handleZoomIn}>+</Button>
                <Button onClick={handleZoomOut}>-</Button>
            </div>

        </div>
    );
});