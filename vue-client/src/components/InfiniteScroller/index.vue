<template>
    <div class="infinite-scroller">
      <slot name="content"></slot>
      
      <div v-show="hasMore" class="infinite-scroller-main">
        <div class="way-pointer" ref="wayPointerRef"></div>
      </div>
      <slot name="loading" v-if="loading"></slot>
    </div>
</template>
  
<script setup lang='ts'>
  import { onMounted, ref } from "vue";

  enum WaypointPosition {
    Above,
    Inside,
    Below,
    Invisible,
    Unknown,
  }

  const bottomOffset = 100;
  const emit = defineEmits([''])
  const props = defineProps({
    threshold: {
      type: Number,
      default: 100,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
  });

  const loading = ref(false);
  const wayPointerRef = ref();
  let scrollableAncestor: Element;
  let previousPosition = WaypointPosition.Unknown;

  onMounted(() => {
    // 找到父节点
    scrollableAncestor = findScrollableAncestor();

    scrollableAncestor.addEventListener('scroll', handleScroll, { passive: true });
  });

  const handleScroll = (event: Event | null) => {
    const bounds = getBounds();
    const currentPosition = getCurrentPosition(bounds);
    
    const prePosition = previousPosition;
    previousPosition = currentPosition;
    if (prePosition === currentPosition) {
      return;
    }
    if (currentPosition === WaypointPosition.Inside) {
      console.log(">>>>>>currentPosition<<<<<<", currentPosition);
    } else if (prePosition === WaypointPosition.Inside) {
      console.log(">>>>>>currentPosition leave<<<<<<", currentPosition);
    }
  }

  const getCurrentPosition = (bounds) => {
    const { viewportBottom, viewportTop, waypointTop, waypointBottom  } = bounds;
    if (waypointTop >= viewportTop && waypointBottom <= viewportBottom) {
      return WaypointPosition.Inside;
    }
    if (waypointTop <= viewportBottom && waypointBottom >= viewportBottom) {
      return WaypointPosition.Inside;
    }
    if (waypointTop > viewportBottom) {
      return WaypointPosition.Below;
    }
    if (waypointTop < viewportTop) {
      return WaypointPosition.Above;
    }
    return WaypointPosition.Invisible;
  }

  const getBounds = () => {
    const { top, bottom } = wayPointerRef.value.getBoundingClientRect();
    const waypointTop = top;
    const waypointBottom = bottom;
    const scrollableBox = scrollableAncestor.getBoundingClientRect();
    const contextHeight = scrollableBox.height;
    const contextScrollTop = scrollableBox.top;
    return {
      waypointTop,
      waypointBottom,
      // 锚点顶部距离视图的距离
      viewportTop: contextScrollTop,
      // 底部距离视图的距离
      viewportBottom: contextHeight + contextScrollTop + bottomOffset,
    }
  }

  const findScrollableAncestor = () => {
    let node = wayPointerRef.value;

    while (node.parentNode) {
      node = node.parentNode;

      if (node === document.body) {
        return window;
      }

      const style = getComputedStyle(node);
      const overflow = style.getPropertyValue('overflow');
      if (overflow === 'auto' || overflow === 'scroll') {
        return node;
      }
    }
  }

</script>
  
<style lang="scss">
.infinite-scroller {
  overflow-y: auto;
  height: 300px;
}

.way-pointer {
  width: 10px;
  height: 30px;
  background: red;
}
</style>