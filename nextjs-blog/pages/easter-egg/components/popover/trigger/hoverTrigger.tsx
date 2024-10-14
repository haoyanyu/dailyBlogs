import { useCallback, useContext, useEffect, useRef, useState } from "react";
import PopoverContext from "../context";

const addEventListener = (element: Element | null, event: string, handler: (e: Event) => void, options: any) => {
  if (!element) return () => {};
  const eventHandler = handler;
  element.addEventListener(event, eventHandler, options);

  return () => {
    element.removeEventListener(event, eventHandler, options);
  }
}

const HoverTrigger = (props: any) => {
  const { children } = props;
  const container = useRef<HTMLDivElement>(null);
  const { setVisible, refs: { content } }: any = useContext(PopoverContext)

  let [timer, setTimer] = useState<any>(null);

  const setValueDelay = useCallback((value: any) => {
    if (timer) clearTimeout(timer);
    const timerr = setTimeout(() => {
      setVisible(value);
      clearTimeout(timer);
    }, 150);
    setTimer(timerr);
  }, [setVisible, timer]);

  const handleMouseEnter = useCallback(() => {
    setValueDelay(true);
  }, [setValueDelay])

  const handleMouseLeave = useCallback(() => {
    setValueDelay(false);
  }, [setValueDelay]);

  useEffect(() => {
    const enterListener = addEventListener(container?.current, 'mouseenter', handleMouseEnter, {});
    const leaveListener = addEventListener(container?.current, 'mouseleave', handleMouseLeave, {});
    return () => {
      enterListener();
      leaveListener();
    }
  }, [handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    const enterListener = addEventListener(content?.current, 'mouseenter', handleMouseEnter, {});
    const leaveListener = addEventListener(content?.current, 'mouseleave', handleMouseLeave, {});
    return () => {
      enterListener();
      leaveListener();
    }
  }, [content, handleMouseEnter, handleMouseLeave]);

  return (
    <div className="hyy-popover-wrapper-hover" ref={container}>
      {children}
    </div>
  )
};

export default HoverTrigger;
