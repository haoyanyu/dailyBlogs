import { getCurrentInstance, provide, reactive, ComponentInternalInstance, ComponentPublicInstance, InjectionKey } from 'vue';

export function useChildren(key: InjectionKey<any>) {
  // 获取父组件实例，因为这个方法肯定是在父组件里调用的
  const parent = getCurrentInstance();
  // 子组件公共实例数组
  const publicChildren: ComponentPublicInstance[] = reactive([]);
  // 子组件内部实例数组
  const internalChildren: ComponentInternalInstance[] = reactive([]);

  const linkChildren = (value = {}) => {
    // 添加子组件实例
    const link = (child: ComponentInternalInstance) => {
      if(child.proxy) {
        publicChildren.push(child.proxy);
        internalChildren.push(child);
      }
    };

    // 移除子组件实例
    const unLink = (child: ComponentInternalInstance) => {
      const index = internalChildren.indexOf(child);
      publicChildren.splice(index, 1);
      internalChildren.splice(index, 1);
    };

    // 使用provide向子组件注入值，
    provide(key, {
      link,
      unLink,
      children: publicChildren,
      internalChildren,
      ...value,
    });
  }
  
  return {
    children: publicChildren,
    linkChildren,
  }
}