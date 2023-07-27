<template>
  <div class="track-container" id="track-view">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
  /**
   * 使用场景
   * 图片懒加载——当图片滚动到可见时才进行加载
   * 内容无限滚动——也就是用户滚动到接近内容底部时直接加载更多，而无需用户操作翻页，给用户一种网页可以无限滚动的错觉
   * 检测广告的曝光情况——为了计算广告收益，需要知道广告元素的曝光情况
   * 用户看见某个区域时执行任务或播放动画
   */
import { onMounted } from 'vue';

function callback(entries: any) {
  const entry = entries[0];
  /** 
   * isIntersecting 返回一个布尔值
   *  true 表示从根节点外部进入根节点
   *  false 表示从根节点内部滚动出去
   * */
  const { isIntersecting, intersectionRatio } = entry;
  if (isIntersecting && intersectionRatio === 1) {
    console.log('我进来啦！');
    return;
  }

  /**
   * intersectionRatio表示元素出现在的比例，0-1之间
   */
  if (!isIntersecting && intersectionRatio > 0) {
    console.log('我出去啦！');
    return;
  }
}

onMounted(() => {
  const element = document.getElementById('track-view');
  if (element) {
    /**
     * options 
     *  root 边界盒子元素
     *  rootMargin
     *  threshold 0-1的比例，出现的比例满足这个值时才会出触发callback
     */
    new IntersectionObserver(callback, { threshold: 1 }).observe(element);
  }
})
</script>

<style scoped>
.track-container {
  padding: 16px;
}


</style>
