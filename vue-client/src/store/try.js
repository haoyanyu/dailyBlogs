import { defineStore } from 'pinia';

/**
 * 就3个属性
 * state
 * getter
 * action
 */
export const useTodos = defineStore('todos', {
  state: () => ({
    todos: [],
    filter: 'all',
    nextId: 0,
    users: [],
  }),
  getters: { // getter可以通过store直接访问，跟state一样
    finishedTodos(state) {
      return state.todos.filter((todo) => todo.isFinished);
    },

    unfinishedTodos(State) {
      return state.todos.filter((todo) => !todo.isFinished);
    },

    filteredTodos(state) {
      // 可以通过this获取整个store实例，可以通过this组装多个getter
      if (this.filter === 'finished') {
        return this.filteredTodos;
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos;
      }
      return this.todos;
    },

    getUserById(state) {
      // getter可以返回一个方法，方法接受入参，在组件中用storeToRefs解构后使用：getUserById(123)
      // 返回函数后使用，getter则不再被缓存
      return (userId) => state.users.find(user => user.id === userId)
    },

    otherGetter(state) {
      // 可以访问其他store
      const countStore = useCountStore();
      return state.nextId + countStore.count;
    }
  },

  actions: { // actions可以是异步的，可以用async await
    // 直接通过store来调用方法
    addTodo(text) {
      this.todos.push({ text, id: this.nextId++, isFinished: false });
    },
    
    async registerUser(login, password) {
      try {
        this.userData = await post({ login, password });
      } catch (error) {
        return error;
      }
    }
  }
});

// 使用
import { storeToRefs } from 'pinia';

const todosStore = useTodos();
// 为了从store中解构出响应式属性
const { filter, filteredTodos } = storeToRefs(todosStore);

function addTodo(text) {
  if (!text) {
    return;
  }
  // action可以直接从store中解构
  todosStore.addTodo(text);
}

// 重置state，通过选项式创建的store
todosStore.$reset();

// 重置state，通过setup function 创建的，则需要自己自定义$reset方法，并return出来
const useCountStore = defineStore('counter', () => {
  const count = res(0);
  function $reset() {
    count.value = 0;
  }

  function increment(state) {
    state.count += 1;
  }

  return {
    count, $reset, increment
  }
})


// 把state属性映射为只读的计算属性, mapWritableState是可以修改的
import { mapState, mapActions } from 'pinia';
export default {
  computed: {
    ...mapState(useCountStore, ['count']),
    // 或者这样写，
    ...mapState(useCountStore, {
      myOwnName: 'count',
      double: store => store.count * 2,
      magicValue(store) {
        return store.someGetter + this.count + this.double;
      }
    })
  },
  methods: {
    ...mapActions(useCountStore, ['increment'])
  }
}

store.$patch({}); // 替换state

// 添加监听，默认会被绑定到组件上，当组件卸载时，也会被删除；如果要保留可以第二个参数传true
const unsubscribe = store.$onAction((options) => {
  const {
    name,
    store,
    args,
    after, // 在 action 返回或解决后的钩子
    onError,
  } = options;

  after((result) => {
    // result 是返回的Promise

  });

  onError((error) => {
    // action 抛出或返回一个拒绝的 promise
  })
},
true // true表示当组件卸载时，不移除监听
);

unsubscribe(); // 移除监听

// 此订阅器即便在组件卸载之后仍会被保留
someStore.$onAction(callback, true)