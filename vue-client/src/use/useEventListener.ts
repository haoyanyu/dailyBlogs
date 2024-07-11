import { Ref, WatchStopHandle, isRef, onDeactivated, onUnmounted, ref, unref, watch } from 'vue';
import { onMountedOrActivated } from './onMountedOrActivated';

const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const noop = () => {};

export function useEventListener(target: Ref<EventTarget>, event: string, listener: EventListener, options: boolean | EventListenerOptions | undefined) {
  if (!inBrowser) {
    return noop;
  }

  // only cleaned once
  let cleaned = false;
  // 绑定一次就行了
  let attached = false;

  const add = (element: EventTarget | Ref<EventTarget>) => {
    if (cleaned) {
      return;
    }
    const node = unref(element);
    if (node && !attached) {
      node.addEventListener(event, listener, options);
      attached = true;
    }
    
  }

  const remove = (element: EventTarget | Ref<EventTarget>) => {
    if (cleaned) {
      return;
    }
    const node = unref(element);
    if (node && attached) {
      node.removeEventListener(event, listener, options);
      attached = false;
    }
  }

  onMountedOrActivated(() => add(target));
  onUnmounted(() => remove(target))
  onDeactivated(() => remove(target));

  let stopWatch: WatchStopHandle;

  if (isRef(target)) {
    stopWatch = watch(target, (newValue, oldValue) => {
      remove(oldValue);
      add(newValue);
    });
  }

  return () => {
    stopWatch?.();
    remove(target);
    cleaned = true;
  }
}

export function useSimpleEventlistener(...args: any[]) {
  let target: EventTarget | Ref<EventTarget> | undefined;
  let events: string | string[];
  let listeners: Function | Function[];
  let options: boolean | AddEventListenerOptions | undefined;

  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    // 如果第一个参数时字符串或者数组，说明只指定了事件或多个事件，默认监听对象是window
    target = inBrowser ? window : undefined;
    [events, listeners, options] = args;
  } else {
    [target, events, listeners, options] = args;
  }

  if (!target) {
    return noop;
  }

  if (!Array.isArray(events)) {
    events = [events];
  }
  if (!Array.isArray(listeners)) {
    listeners = [listeners];
  }

  const cleanups: Function[] = [];
  const cleanup = () => {
    cleanups.forEach(fn => fn());
    cleanups.length = 0;
  }

  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => {
      el.removeEventListener(event, listener, options);
    }
  }

  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el) {
      return;
    }

    cleanups.push(...events.flatMap((event) => {
      return listeners.map(listener => register(el, event, listener, options))
    }))
  },
  // 在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM
  {immediate: true, flush: 'post'});

  return () => {
    cleanup();
    stopWatch();
  }
}