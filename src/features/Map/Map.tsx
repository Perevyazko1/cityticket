import {memo, ReactNode, useEffect, useRef, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {ReactSVG} from 'react-svg';
import cls from "./Map.module.scss"


interface MapProps {
    className?: string
    children?: ReactNode
    apiSvg: string
    scale: number
}


export const Map = memo((props: MapProps) => {
    const {
        className,
        children,
        apiSvg,
        scale,
        ...otherProps
    } = props

    const mods: Mods = {};


    const [listId, setListId] = useState<string[]>([])
    const svgRef = useRef(null)


    const handleElementClick = (event: any) => {
        const clickedElement = event.target;
        console.log(clickedElement)
        if (listId.includes(clickedElement.id)) {
            setListId(prevListId => prevListId.filter(id => id !== clickedElement.id));
        } else {
            setListId([...listId, clickedElement.id])
        }
        handUpdate()
    };


    const handUpdate = () => {
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
        setTimeout(() => {
            handUpdate();
        }, 2)
    }, [listId]);

    return (
        <div
            className={classNames(cls.Map, mods, [className])}
            {...otherProps}
        >
            <ReactSVG
                className={cls.Map}
                src={apiSvg}
                style={{transform: `scale(${scale})`, transformOrigin: 'left top'}}
                onClick={(e) => {
                    handleElementClick(e)
                }}
                ref={svgRef}
            />
        </div>
    );
});