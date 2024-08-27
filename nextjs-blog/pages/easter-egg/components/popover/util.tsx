export function calcClassNames(position: string) {
  const prefix = 'hyy-popover';
  const contentClassName = `${prefix}-content-${position}`;
    const popoverClassName = `${prefix}-${position}`;
    const arrowClassName = `${prefix}-arrow-${position}`;
    return {
      content: contentClassName,
      popover: popoverClassName,
      arrow: arrowClassName,
    }
}

export function calcPopPosition(position: string, anchorPosition: any) {
  // @ts-ignore
  const calcFn = createWithPositionFnMap[position] || createWithPositionFnMap['top'];
  return calcFn(anchorPosition);
}

const defaultMargin = 8;

const createWithPositionFnMap = {
  'top': (anchorPosition: { x: any; y: any; width: any; height: any; }) => {
    const { x, y, width, height } = anchorPosition;
    console.log(">>>>>>anchorPosition<<<<<<", anchorPosition);
    const popPosition = {
      bottom: `${height + defaultMargin}px`,
      left: `${width / 2}px`,
    }

    const arrowPosition = {
      left: `${width / 2 - 4}px`,
      bottom: `${height + defaultMargin - 4}px`
    }
    return { popPosition, arrowPosition }
  },
  'top-left': () => {},
  'top-right': () => {},
  'bottom': (anchorPosition: { x: any; y: any; width: any; height: any; }) => {
    const { x, y, width, height } = anchorPosition;
    const popPosition = {
      left: `${width / 2}px`,
      top: `${defaultMargin}px`,
    }
    const arrowPosition = {
      left: `${width / 2 - 4}px`,
      top: `${defaultMargin - 4}px`,
    }
    return { popPosition, arrowPosition }
  },
  'bottom-left': () => {},
  'bottom-right': () => {},
  'left': (anchorPosition: { x: any; y: any; width: any; height: any; }) => {
    const { x, y, width, height } = anchorPosition;
    const popPosition = {
      right: `${defaultMargin}px`,
      top: `-${height / 2}px`,
    }

    const arrowPosition = {
      right: `${defaultMargin - 4}px`,
      top: `-${height / 2 + 4}px`,
    }
    return { popPosition, arrowPosition }
  },
  'left-top': () => {},
  'left-bottom': () => {},
  'right': (anchorPosition: { x: any; y: any; width: any; height: any; }) => {
    const { x, y, width, height } = anchorPosition;
    const popPosition = {
      left: `${width + defaultMargin}px`,
      top: `-${height / 2}px`,
    }
    const arrowPosition = {
      left: `${width + defaultMargin - 4}px`,
      top: `-${height / 2 + 4}px`,
    }
    return { popPosition, arrowPosition }
  },
  'right-top': () => {},
  'right-bottom': () => {},
}