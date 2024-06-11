function kindOf(obj) {}
function isPlainObject(obj: any) {
  if (typeof obj !== 'object' || obj === null) return false;
  
  // 追溯对象的原型
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null
}

/** createStore 开始 */
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== 'function') {
    throw new Error(
      `Expected the root reducer to be a function. Instead, received: '${kindOf(
        reducer
      )}'`
    );
  }

  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.'
    )
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    preloadedState = undefined;
    enhancer = preloadedState;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error(
        `Expected the enhancer to be a function. Instead, received: '${kindOf(
          enhancer
        )}'`
      )
    }

    return enhancer(createStore)(reducer, preloadedState || undefined)
  }


  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;

  /** 从nextListeners里复制一份放在nextListeners里 */
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = new Map();
      currentListeners.forEach((listener, key) => {
        nextListeners.set(key, listener);
      })
    }
  }

  // 获取当前state值
  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }
    return currentState;
  }

  // 添加订阅方法
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error(
        `Expected the listener to be a function. Instead, received: '${kindOf(
          listener
        )}'`
      )
    }

    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api/store#subscribelistener for more details.'
      )
    }

    let isSubscribed = true;

    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter ++;
    // 订阅的回调存入nextListeners里，在dispatch时执行
    nextListeners.set(listenerId, listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api/store#subscribelistener for more details.'
        )
      }

      isSubscribed = false;

      /** 这里为什么要再执行一遍？执行subscribe时，next已经重新赋值了，判断条件不成立，不会执行复制了 */
      // dispatch时，会把nextListeners赋值给currentListeners，因为是引用类型，所以再执行一次，复制一份nextListeners
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    }
  }


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        `Actions must be plain objects. Instead, the actual type was: '${kindOf(
          action
        )}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.'
      )
    }

    if (typeof action.type !== 'string') {
      throw new Error(
        `Action "type" property must be a string. Instead, the actual type was: '${kindOf(
          action.type
        )}'. Value was: '${action.type}' (stringified)`
      )
    }

    if (isDispatching) {
      if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.')
      }
    }

    try {
      isDispatching = true;
      // 执行reducer，返回新的state
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    // 从nextListeners里获取接下来要执行的订阅的回调，依次执行
    const listeners = (currentListeners = nextListeners);
    listeners.forEach(listener => {
      listener();
    })

    return action;
  }

  // 触发一下初始化，做了什么？
  dispatch({ type: '@@redux/INIT' })

  const store = {
    dispatch,
    subscribe,
    getState,
  };

  return store;
}

//使用store
function counterReducer(state, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    default:
      return state;
  }
}

// @ts-ignore
let store = createStore(counterReducer, { value: 0 });

const unsubscribe = store.subscribe(() => console.log('>>>第一次: ',store.getState()));
store.subscribe(() => console.log('>>>第二次: ', store.getState()));

store.dispatch({ type: 'counter/incremented' });
unsubscribe();
store.dispatch({ type: 'counter/incremented' });