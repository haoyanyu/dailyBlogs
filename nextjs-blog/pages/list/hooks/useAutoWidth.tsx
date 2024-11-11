import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

interface Options {
  maxCount?: number;
  minCount?: number;
  maxWidth?: number;
  minWidth?: number;
  gap?: number;
}

const defaultOptions = {
  maxCount: 3,
  minCount: 1,
  maxWidth: 500,
  minWidth: 180,
  gap: 16,
}
const useAutoWidth: (ref: React.RefObject<any>, options: Options) => { width: number; gap: number, count: number } = (ref, options) => {
  const { maxCount, minCount, maxWidth, minWidth, gap: defaultGap } = Object.assign({}, defaultOptions, options);
  const [width, setWidth] = useState(0);
  const [gap, setGap] = useState(defaultGap);
  const [lineN, setLineN] = useState(minCount);

  const calcWidth = useCallback(() => {
    let countPerLine = minCount;
    // 容器的宽度
    const wrapperWidth = ref?.current?.clientWidth || 0;
    if (wrapperWidth >= minWidth) {
      // 先根据最小宽度计算出一行可以放的最多的数量, 算上gap
      const maxPerLine = Math.floor(wrapperWidth / (minWidth + defaultGap));
      console.log(">>>>>>wrapperWidth<<<<<<", wrapperWidth);
      // 如果计算出的一行的数量比最大数量大，则取最大数量
      countPerLine = Math.min(maxPerLine, maxCount);
      console.log(">>>>>>countPerLine<<<<<<", countPerLine);
      
      // 根据计算出的每行数量，计算出宽度，去掉gap
      let cardWidth = Math.floor(wrapperWidth / countPerLine) - defaultGap;

      cardWidth = Math.min(cardWidth, maxWidth);
      console.log(">>>>>>cardWidth<<<<<<", cardWidth);
      // 计算出按cardWidth布局，每个卡片间的间隔应该为多少
      const cardGap = Math.floor((wrapperWidth - cardWidth * countPerLine) / (countPerLine - 1));
      console.log(">>>>>>cardGap<<<<<<", cardGap);
      setWidth(cardWidth);
      setGap(cardGap);
      setLineN(countPerLine);
    }
  }, [defaultGap, ref, maxCount, maxWidth, minCount, minWidth]);
  useEffect(() => {
    calcWidth();
    const handler = debounce(calcWidth, 100);
    window.addEventListener('resize', handler);
    ref?.current?.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('resize', handler);
      ref?.current?.addEventListener('scroll', handler);
    }
  }, [calcWidth, ref])

  return { width, gap, count: lineN };
}

export default useAutoWidth;
