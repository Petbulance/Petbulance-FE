import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BottomTab } from './BottomTab';
import { TabMenu } from './TabMenu';

export function HospitalFilterModalContainer({ mode, onClose, children }) {
  const [activeTab, setActiveTab] = useState(mode);

  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [params, setParams] = useSearchParams();

  const startYRef = useRef(0);
  const startTranslateRef = useRef(0);
  const pointerIdRef = useRef(null);

  const CLOSE_THRESHOLD = 120;

  // mode가 변경되면 탭도 동기화
  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  //탭 변경시 URL 변경
  const changeTab = (nextTab) => {
    setActiveTab(nextTab);

    const next = new URLSearchParams(params);
    next.set('sheet', nextTab);
    setParams(next, { replace: true });
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
          'flex max-h-[88dvh] w-full flex-col rounded-t-[55px] bg-white',
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
