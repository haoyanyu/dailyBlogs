import React, { useRef, useState, useEffect, useCallback, RefObject } from 'react';
import { getCurrentPosition, PositionConstant } from './utils';
// 视图相关： viewport
// 锚点相关： waypoint

const isDomElement = (Component: any) => {
  return (typeof Component.type === 'string')
}

interface IProps {
  children?: React.ReactElement<{ ref?: React.Ref<any> }>;
  horizontal?: boolean;
  bottomOffsetPx?: number;
  topOffsetPx?: number;
  onPositionChange?: (params: any) => void;
}
const WayPoint = (props: IProps) => {
  const waypointRef = useRef<any>(null);
  const { children, horizontal = false, bottomOffsetPx = 30, topOffsetPx = 30, onPositionChange } = props;

  const [scrollableAncestor, setScrollableAncestor] = useState<any>();
  const [previousPosition, setPreviousPosition] = useState<any>();

  // 获取滚动锚点节点
  const findScrollableAncestor = useCallback(() => {
    let wayPointNode = waypointRef.current;
    while (wayPointNode?.parentNode) {
      wayPointNode = wayPointNode.parentNode;

      if (wayPointNode === document.body) {
        return window;
      }

      const style = window.getComputedStyle(wayPointNode);
      const overflowDirec = horizontal
      ? style.getPropertyValue('overflow-x')
      : style.getPropertyValue('overflow-y');

      const overflow = overflowDirec || style.getPropertyValue('overflow');

      if (overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay') {
        return wayPointNode;
      }
    }
    return window;
  }, [horizontal]);

  const getBounds = useCallback((element: HTMLElement) => {
    const { left, top, right, bottom } = element.getBoundingClientRect();
    // 获取锚点在视图里的位置
    const waypointTop = top;
    const waypointBottom = bottom;

    let contextHeight;
    let contextScrollTop;

    if (scrollableAncestor === window) {
      contextHeight = window.innerHeight;
      contextScrollTop = 0;
    } else {
      // 获取上下文容器的高度和顶部的位置
      contextHeight = scrollableAncestor.clientHeight;
      contextScrollTop = scrollableAncestor.getBoundingClientRect().top;
    }

    const contextBottom = contextScrollTop + contextHeight;

    return {
      waypointTop,
      waypointBottom,
      viewportTop: contextScrollTop + topOffsetPx,
      viewportBottom: contextBottom - bottomOffsetPx,
    }
  }, [bottomOffsetPx, scrollableAncestor, topOffsetPx]);

  const handleScroll = useCallback((event) => {
    if (!waypointRef.current) return;
    const bounds = getBounds(waypointRef.current);
    const currentPosition = getCurrentPosition(bounds);
    console.log(">>>>>>currentPosition<<<<<<", currentPosition);
    // 获取上一次的位置
    const previousPos = previousPosition;
    // 更新一下上一次的位置
    setPreviousPosition(currentPosition);
    // 两次位置一样，不做处理
    if (previousPos === currentPosition) {
      return;
    }
    const callbackArguments = {
      currentPosition,
      previousPosition: previousPos,
      event,
      ...bounds,
    };

    onPositionChange && onPositionChange(callbackArguments);

    if (currentPosition === PositionConstant.inside) {
      // 执行enter方法
    } else if (previousPos === PositionConstant.inside) {
      // 执行leave方法
    }

  }, [getBounds, onPositionChange, previousPosition]);

  useEffect(() => {
    const node = findScrollableAncestor();
    setScrollableAncestor(node)
  }, [findScrollableAncestor]);

  useEffect(() => {
    if (scrollableAncestor) {
      scrollableAncestor.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);
    }
    return () => {
      scrollableAncestor?.removeEventListener('scroll', handleScroll, { passive: true });
      window.removeEventListener('resize', handleScroll);
    }
  }, [handleScroll, scrollableAncestor]);
  if (!children) {
    return <span ref={waypointRef} style={{ fontSize: 0 }}></span>
  }

  if (isDomElement(children) && React.isValidElement(children)) {
    const handleRef = (node: any) => {
      waypointRef.current = node;
      // @ts-ignore
      if (children?.ref) {
        // @ts-ignore
        if (typeof children.ref === 'function') {
          // @ts-ignore
          children.ref(node);
        } else {
          // @ts-ignore
          children.ref.current = node;
        }
      }
    };
    return React.cloneElement(children, { ref: handleRef});
  }
  return React.cloneElement(children, { ref: waypointRef })
};

export default WayPoint;
