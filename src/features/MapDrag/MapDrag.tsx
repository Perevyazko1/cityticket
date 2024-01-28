import { memo, ReactNode, MouseEvent, useRef } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './MapDrag.module.scss';

interface MapDragProps {
  className?: string;
  children?: ReactNode;
}

export const MapDrag = memo((props: MapDragProps) => {
  const svgRef = useRef<HTMLDivElement>(null);

  let isDragging = false;
  let offset = { x: 0, y: 0 };

  const handleMouseDown = (e: MouseEvent) => {
    isDragging = true;
    const element = svgRef.current;

    if (element) {
      offset.x = element.offsetLeft - e.clientX;
      offset.y = element.offsetTop - e.clientY;
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const element = svgRef.current;
      if (element) {
        element.style.left = `${e.clientX + offset.x}px`;
        element.style.top = `${e.clientY + offset.y}px`;
      }
    }
  };

  const { className, children, ...otherProps } = props;

  const mods: Mods = {};

  return (
    <div
      className={classNames(cls.MapDrag, mods, [className])}
      {...otherProps}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={svgRef}
    >
      {children}
    </div>
  );
});
