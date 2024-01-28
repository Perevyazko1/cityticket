import {attributesSvgType} from 'entity/Map';
import {memo, ReactNode, ReactSVGElement, useEffect, useRef, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {ReactSVG} from 'react-svg';
import {Button} from "shared/ui/Button/Button";
import cls from "./Map.module.scss"
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;


interface MapProps {
    className?: string
    children?: ReactNode
    apiSvg: string
    scale: number
}


export const Map = memo((props: MapProps) => {
    const [listId, setListId] = useState<string[]>(['parter_1_1', 'parter_2_1', 'parter_3_1', 'parter_4_1', 'parter_5_1', 'parter_8_1', 'parter_9_1', 'parter_10_1', 'parter_11_12', 'beltaj_right_4_8'])
    const svgRef = useRef(null)


    const handleElementClick = (event: any) => {
        const clickedElement = event.target;
        // if (listId.includes(clickedElement.id)) {
        //     setListId(prevListId => prevListId.filter(id => id !== clickedElement.id));
        // } else {
        //     setListId([...listId, clickedElement.id])
        // }

        console.log(listId)
        // Применить цвет или другие стили, используя новые координаты и размеры
        if (clickedElement.style.fill === "red") {
            clickedElement.style.fill = "";
        } else {
            clickedElement.style.fill = "red";
        }

        // Применить другие стили, используя новые координаты и размеры

        // setSeatList(prevList => [...prevList, 'новое значение']);
    };

    const update = () => {
        listId.map((itemId) => {
            const click = document.getElementById(itemId)
            if (click) {
                click.classList.add('red')
                click.setAttribute('style', 'fill: red'); // Установка цвета напрямую через атрибут fill
                click.style.fill = "red"; // Обновление стиля для немедленного отображения изменений
            }
            // if (elementSvg) {
            //     elementSvg.setAttribute('fill', 'red');
            //     // console.log(elementSvg)
            //     // Здесь вы можете выполнить нужные действия с найденным элементом SVG
            // }
        })
    };


    const handletest = () => {
        console.log("функция сработала")
        listId.map((itemId) => {
            const click = document.getElementById(itemId)
            if (click) {
                click.classList.add('red')
                click.setAttribute('style', 'fill: red'); // Установка цвета напрямую через атрибут fill
                click.style.fill = "red"; // Обновление стиля для немедленного отображения изменений
            }
        });
    }
    useEffect(() => {
        handletest(); // Вызов функции handletest при монтировании компонента
    }, []);
    const {
        className,
        children,
        apiSvg,
        scale,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
        <div
            className={classNames(cls.Map, mods, [className])}
            {...otherProps}
        >
            <ReactSVG
                className={cls.Map}
                src={apiSvg}
                style={{transform: `scale(${scale})`, transformOrigin: 'left top'}}
                onClick={handleElementClick}
                ref={svgRef}
            />

        </div>
    );
});