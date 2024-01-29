import {memo, ReactNode, useEffect, useRef, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {ReactSVG} from 'react-svg';
import cls from "./Map.module.scss"
import {useUpdateContext} from "../Context/UpdateContext";


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
    const {update, setUpdate} = useUpdateContext()


    const handleElementClick = (event: any) => {
        const clickedElement = event.target;
        if (listId.includes(clickedElement.id)) {
            clickedElement.style.fill = "red"
            setListId(prevListId => prevListId.filter(id => id !== clickedElement.id));
        } else {
            setListId([...listId, clickedElement.id])
        }
        handUpdate()
    };


    const handUpdate = () => {
        listId.map((itemId) => {
            const click = document.getElementById(itemId)
            if (click) {
                click.style.fill = "red";
            }
        });
    }
    useEffect(() => {
        setTimeout(() => {
               handUpdate();
            setUpdate(false)

        }, 2)
    }, [listId,update]);

    return (
        <div
            className={classNames(cls.Map, mods, [className])}
            {...otherProps}
        >
            <ReactSVG
                className={cls.Map}
                src={'https://ci41159.tw1.ru/static/converted.svg'}
                style={{transform: `scale(${scale})`, transformOrigin: 'left top'}}
                onClick={(e) => {
                    handleElementClick(e)
                }}
                ref={svgRef}
            />
        </div>
    );
});