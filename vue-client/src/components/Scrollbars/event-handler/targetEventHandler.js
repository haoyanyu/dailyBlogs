export class TargetEventHandlers {
  constructor(target) {
    this.target = target;
    this.events = {};
  }

  add(eventName, listener, options) {
    const { target } = this;
    this.events[eventName] = listener;

    target.addEventListener(eventName, this.events[eventName], options);

    let isSubscribed = true;
    // 返回移除方法
    return () => {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      const { target, events } = this;
        if (target) {
          target.removeEventListener(
            eventName,
            events[eventName],
            options
          );
        }
    }
  }
}