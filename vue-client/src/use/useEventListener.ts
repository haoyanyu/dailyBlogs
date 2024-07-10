import { Ref, WatchStopHandle, isRef, onDeactivated, onUnmounted, ref, unref, watch } from 'vue';
import { onMountedOrActivated } from './onMountedOrActivated';

const inBrowser = typeof window !== 'undefined';
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