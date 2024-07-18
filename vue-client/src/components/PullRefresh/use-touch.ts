import { ref } from 'vue';

const useTouch = () => {
  const startX = ref(0);
  const startY = ref(0);
  const deltaX = ref(0);
  const deltaY = ref(0);
  const offsetX = ref(0);
  const offsetY = ref(0);

  const start = (event: TouchEvent) => {
    reset();
    const { clientX, clientY } = event.touches[0];
    startX.value = clientX;
    startY.value = clientY;
  }

  const reset = () => {
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
  }

  const move = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    deltaX.value = clientX - startX.value;
    deltaY.value = clientY - startY.value;

    // 取绝对值
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);
  }

  return {
    start,
    reset,
    move,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
  }
};

export default useTouch;
