import { TargetEventHandlers } from './targetEventHandler';

export const targetMap = new WeakMap();

export const addEventListener = (target, eventName, handler, options) => {
  if (!targetMap.has(target)) {
    targetMap.set(target, new TargetEventHandlers(target));
  }

  return targetMap.get(target).add(eventName, handler, options);
}

export const removeTarget = (target) => {
  if (target.has(target)) {
    target.delete(target);
  }
}