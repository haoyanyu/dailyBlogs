import { Ref, ref, onMounted } from 'vue';

const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const defaultRoot = inBrowser ? window : undefined;

const getScrollParent = (element, root) => {
  let node = element;

  while (node && node.parentNode) {
    node = node.parentNode;

    if (node === document.body) {
      return root;
    }

    if (node === root) {
      return root;
    }

    const style = getComputedStyle(node);
    const overflow = style.getPropertyValue('overflow');
    if (overflow === 'auto' || overflow === 'scroll') {
      return node;
    }
  }
}

const useScrollParent = (el: Ref<Element | undefined>, root = defaultRoot) => {
  let scrollParent = ref();

  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });

  return scrollParent;
};

export default useScrollParent;