import { useEffect, useRef, useState } from 'react';

import { TabMenu } from './TabMenu';

export function HospitalFilterModalContainer({
  mode,
  onClose,
  onModeChange,
  children,
}) {
  const [activeTab, setActiveTab] = useState(mode);

  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef(0);
  const startTranslateRef = useRef(0);
  const pointerIdRef = useRef(null);

  const CLOSE_THRESHOLD = 120;

  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  const changeTab = (nextTab) => {
    setActiveTab(nextTab);

    if (onModeChange) {
      onModeChange(nextTab);
    }
  };

  const onHandlePointerDown = (e) => {
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);

    startYRef.current = e.clientY;
    startTranslateRef.current = translateY;

    setIsDragging(true);
  };

  const onHandlePointerMove = (e) => {
    if (!isDragging) return;
    if (pointerIdRef.current !== e.pointerId) return;

    const dy = e.clientY - startYRef.current;
    const next = Math.max(0, startTranslateRef.current + dy);
    setTranslateY(next);
  };

  const onHandlePointerUp = (e) => {
    if (pointerIdRef.current !== e.pointerId) return;

    setIsDragging(false);

    if (translateY > CLOSE_THRESHOLD) {
      onClose?.();
      return;
    }

    setTranslateY(0);
  };

  return (
    <div
      className="flex h-dvh items-end justify-center bg-black/50"
      onClick={() => onClose?.()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={[
          'flex max-h-[88dvh] w-full flex-col rounded-t-[55px] bg-white pb-5',
          isDragging ? '' : 'transition-transform duration-200 ease-out',
        ].join(' ')}
        style={{ transform: `translateY(${translateY}px)` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mt-[27.56px] flex justify-center"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          style={{ touchAction: 'none' }}
        >
          <div className="h-1.75 w-13.75 rounded-full bg-black" />
        </div>
        <TabMenu activeTab={activeTab} onChangeTab={changeTab} />

        {children}
      </div>
    </div>
  );
}
