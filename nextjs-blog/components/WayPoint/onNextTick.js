let timeout = null;
const timeoutQueue = [];

export default function onNextTick(cb) {
  timeoutQueue.push(cb);

  if (!timeout) {
    // 在下一个事件循环中执行回调函数
    timeout = setTimeout(() => {
      timeout = null;
      let item;
      // eslint-disable-next-line no-cond-assign
      while (item = timeoutQueue.shift()) {
        item();
      }
    }, 100);
  }

  let isSubscribed = true;

  return function unsubscribe() {
    if (!isSubscribed) return;
    isSubscribed = false;

    const index = timeoutQueue.indexOf(cb);

    if (index === -1) return;

    timeoutQueue.splice(index, 1);

    if (!timeoutQueue.length && timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }
}