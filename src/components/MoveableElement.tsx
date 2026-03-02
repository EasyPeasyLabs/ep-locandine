import React, { useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import { useFlyer } from '../context/FlyerContext';

interface MoveableElementProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const MoveableElement = ({ id, children, className, style, onClick }: MoveableElementProps) => {
  const { data, updateElementState, selectedElementId, setSelectedElementId } = useFlyer();
  const elementState = data.elements[id];
  const targetRef = useRef<HTMLDivElement>(null);

  // Initialize state if missing (e.g. for static elements becoming moveable)
  useEffect(() => {
    if (!elementState && targetRef.current) {
        // Get initial position from DOM if not in state
        const rect = targetRef.current.getBoundingClientRect();
        const parentRect = targetRef.current.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 };
        
        updateElementState(id, {
            x: targetRef.current.offsetLeft,
            y: targetRef.current.offsetTop,
            width: targetRef.current.offsetWidth,
            height: targetRef.current.offsetHeight,
            rotation: 0,
            zIndex: 1,
            type: 'text' // Default
        });
    }
  }, [id, elementState, updateElementState]);

  const isSelected = selectedElementId === id;

  // Apply position from state if available
  const positionStyle: React.CSSProperties = elementState ? {
    position: 'absolute',
    left: `${elementState.x}px`,
    top: `${elementState.y}px`,
    width: `${elementState.width}px`,
    height: `${elementState.height}px`,
    transform: `rotate(${elementState.rotation}deg)`,
    zIndex: elementState.zIndex,
  } : {};

  return (
    <>
      <div
        ref={targetRef}
        id={id}
        className={`${className} ${isSelected ? 'ring-2 ring-blue-500' : ''} cursor-move`}
        style={{ ...style, ...positionStyle }}
        onClick={(e) => {
            e.stopPropagation();
            setSelectedElementId(id);
            onClick?.();
        }}
      >
        {children}
      </div>

      {isSelected && targetRef.current && (
        <Moveable
          target={targetRef.current}
          container={document.getElementById('flyer-content')}
          draggable={true}
          resizable={true}
          rotatable={true}
          origin={false}
          
          // Drag
          onDrag={({ left, top }) => {
            targetRef.current!.style.left = `${left}px`;
            targetRef.current!.style.top = `${top}px`;
            updateElementState(id, { x: left, y: top });
          }}

          // Resize
          onResize={({ width, height, drag }) => {
            targetRef.current!.style.width = `${width}px`;
            targetRef.current!.style.height = `${height}px`;
            targetRef.current!.style.left = `${drag.left}px`;
            targetRef.current!.style.top = `${drag.top}px`;
            updateElementState(id, { width, height, x: drag.left, y: drag.top });
          }}

          // Rotate
          onRotate={({ rotation }) => {
            targetRef.current!.style.transform = `rotate(${rotation}deg)`;
            updateElementState(id, { rotation });
          }}
        />
      )}
    </>
  );
};
