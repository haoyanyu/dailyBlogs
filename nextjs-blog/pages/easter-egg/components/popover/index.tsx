// 一个popover
/**
 * 1. 插入body,用absolute定位，可以随着页面滚动
 * 2. 触发展示时，计算触发的元素位置，计算popover的定位 top left
 * 3. 箭头展示
 * 4. 
 */
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import style from './style.module.scss';
import { useMemo } from 'react';
import { calcClassNames, calcPopPosition } from './util';

interface IContentProps {
  visible?: boolean;
  position?: string;
  anchorPosition?: any;
  content?:React.ReactNode
}
function PopoverContent(props: IContentProps) {
  
  const { position = 'top', content, anchorPosition } = props;
  const popData = useMemo(() => {
    const cssClassNames = calcClassNames(position);
    const { popPosition, arrowPosition } = calcPopPosition(position, anchorPosition)
    return {
      css: cssClassNames,
      popPosition,
      arrowPosition,
    }
  }, [anchorPosition, position])

  return (
    <div className={classNames(style['hyy-popover'], style[popData.css.popover])}>
      <div className={classNames(style['hyy-popover-content'], style[popData.css.content])} style={popData.popPosition}>
        <div className={style['hyy-popover-content-inner']}>
          <div className={style['hyy-popover-content-content']}>
            {content}
          </div>
        </div>
      </div>
      <div className={classNames(style['hyy-popover-arrow'], style[popData.css.arrow])}>
        <div className={style['hyy-popover-arrow-icon']} style={popData.arrowPosition}></div>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/display-name
const PopoverAnchor = forwardRef<HTMLDivElement, any>((props: { content: any; }, ref) => {
  const { content } = props;
  const divRef = ref;
  return (
    <div style={{ display: 'inline-block' }} ref={divRef}>
      {content}
    </div>
  )
})

interface IPopoverProps {
  position?: string;
  visible?: boolean;
  trigger?: string;
  content: React.ReactNode;
  children: React.ReactElement | string | number;
  onVisibleChange?: () => void;
}
export function Popover(props: IPopoverProps) {
  const { position, content, children, trigger = 'hover' } = props;
  const anchorRef = useRef<any>(null);
  const [anchorPosition, setAnchorPosition] = useState<any>({});
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const rect = anchorRef?.current?.getBoundingClientRect();
    const { x, y, width, height } = rect || {};
    setAnchorPosition({
      x,
      y,
      width,
      height,
    })
  }, [])

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!anchorRef?.current?.contains(e.target)) {
        setVisible(false);
      }
      
    }
    if (trigger === 'click') {
      setVisible(false);
      document.addEventListener('click', handleClick, { capture: true })
    }
    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [trigger])

  const handleVisible = useCallback(() => {
    if (trigger === 'click' && !visible) {
      setVisible(true);
    }
  }, [trigger, visible])
  
  return (
    <div className={classNames(style['hyy-popover-wrapper'], style[`hyy-popover-wrapper-${trigger}`])} onClick={handleVisible}>
      <PopoverAnchor content={children} ref={anchorRef} />
      {
        visible && (
          <PopoverContent position={position} anchorPosition={anchorPosition} content={content} />
        )
      }
      
    </div>
  )
}

export default function PopoverDemo() {
  const content = (
    <div>
      <a>456</a>
      <a>456</a>
      <p>999</p>
    </div>
  )
  return (
    <div style={{ margin: '4rem' }}>
      <Popover content={content} position="bottom" trigger="click">
        <div>
          <p>12312</p>
          <p>4564</p>
        </div>
      </Popover>
    </div>
  )
}
