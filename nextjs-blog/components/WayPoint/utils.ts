const PositionConstant = {
  above: 'above',
  inside: 'inside',
  below: 'below',
  invisible: 'invisible',
}
const getCurrentPosition = (bounds: any) => {
  const { waypointTop, waypointBottom, viewportTop, viewportBottom } = bounds;

  // 视图高度为0
  if (viewportBottom - viewportTop === 0) {
    return PositionConstant.invisible;
  }

  // 锚点的顶部在 视图的顶部和底部之间
  if (waypointTop >= viewportTop && waypointTop <= viewportBottom) {
    return PositionConstant.inside
  }

  // 锚点的底部在 视图的顶部和底部之间
  if (waypointBottom <= viewportBottom && waypointBottom >= viewportTop) {
    return PositionConstant.inside
  }

  // 锚点的高度跨越了视图，比较极端吧
  if (waypointTop <= viewportTop && waypointBottom >= viewportBottom) {
    return PositionConstant.inside;
  }

  // 锚点的顶部在视图的下方
  if (waypointTop > viewportBottom) {
    return PositionConstant.below;
  }

  // 锚点底部在视图上方
  if (waypointBottom < viewportTop) {
    return PositionConstant.above;
  }

};

export {
  PositionConstant,
  getCurrentPosition,
}