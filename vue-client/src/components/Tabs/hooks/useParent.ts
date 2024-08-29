import { inject, InjectionKey, getCurrentInstance, onUnmounted, computed, ref } from 'vue';

export function useParent(key: InjectionKey<any>) {
  // 获取父组件注入的值
  const parent = inject(key);

  if (parent) {
    // 获取当前子组件实例，因为这个方法一定是在子组件里调用的
    const instance = getCurrentInstance();

    const { link, unLink, internalChildren } = parent;

    link(instance);
    onUnmounted(() => {
      unLink(instance);
    });

    // 获取当前组件在子组件数组中的索引值
    const index = computed(() => {
      return internalChildren.indexOf(instance);
    });

    return {
      parent,
      index,
    }
  }
  return {
    parent,
    index: ref(-1),
  }
}