<template>
  <div>
    <label>
      <input type="range" id="one" min="0" max="120" step="1" value="20" />
      <p for="one" style="--min: 0;--max: 120">23</p>
    </label>
  </div>
</template>

<script setup>

</script>

<style scoped>
  @property --val {
    syntax: '<integer>';
    inherits: true;
    initial-value: 0; 
  }

  label {
    --c: #547980; /* slider color */
    --g: round(.3em,1px);  /* the gap */
    --l: round(.2em,1px);  /* line thickness*/
    --s: round(1.3em,1px); /* thumb size*/
    --t: round(.8em,1px);  /* tooltip tail size */
    --r: round(.8em,1px);  /* tooltip radius */
    
    timeline-scope: --thumb-view;
    translate: 0; /* No, It's not useless so don't remove it (or remove it and see what happens) */ 
    font-size: 24px;
  }

  input {
    width: 400px;
    height: var(--s); /* needed for Firefox*/
    --_c: color-mix(in srgb, var(--c), #000 var(--p,0%));
    appearance :none;
    background: none;
    cursor: pointer;
    overflow: hidden;
    font-size: inherit;
  }

  input:focus-visible,
  input:hover{
    --p: 25%;
  }

  input:active,
  input:focus-visible{
    --_b: var(--s)
  }

  /* chromium */
  input[type="range" i]::-webkit-slider-thumb{
    height: var(--s);
    aspect-ratio: 1;
    border-radius: 50%;
    box-shadow: 0 0 0 var(--_b,var(--l)) inset var(--_c);
    border-image: linear-gradient(90deg,var(--_c) 50%,#ababab 0) 0 1/calc(50% - var(--l)/2) 100vw/0 calc(100vw + var(--g));
    -webkit-appearance: none;
    appearance: none;
    transition: .3s;
    anchor-name: --thumb;
    view-timeline: --thumb-view inline;
    view-timeline-inset: var(--s);
  }

  /* Firefox */
  input[type="range"]::-moz-range-thumb {
    height: var(--s);
    width: var(--s);
    background: none;
    border-radius: 50%;
    box-shadow: 0 0 0 var(--_b,var(--l)) inset var(--_c);
    border-image: linear-gradient(90deg,var(--_c) 50%,#ababab 0) 0 1/calc(50% - var(--l)/2) 100vw/0 calc(100vw + var(--g));
    -moz-appearance: none;
    appearance: none;
    transition: .3s;
    anchor-name: --thumb;
    view-timeline: --thumb-view inline;
    view-timeline-inset: var(--s);
  }

  p {
    position-anchor: --thumb;
    position: absolute;
    inset-area: top span-all;
    color: #fff;
    font-weight: bold;
    font-family: sans-serif;
    text-align: center;
    padding-block: .5em;
    width: 4em;
    background: #CC333F;
    --val:var(--min);
    border-bottom: var(--t) solid #0000;
    border-radius: var(--r)/var(--r) var(--r) calc(var(--r) + var(--t)) calc(var(--r) + var(--t));
    --_m: 100%/var(--t) var(--t) no-repeat;
    --_g: 100%,#0000 99%,#000 102%;
    mask:
      linear-gradient(#000 0 0) padding-box,
      radial-gradient(100% 100% at 100% var(--_g)) calc(50% + var(--t)/2) var(--_m),
      radial-gradient(100% 100% at 0    var(--_g)) calc(50% - var(--t)/2) var(--_m);
    animation: range linear;
    animation-timeline: --thumb-view;
  }

  @keyframes range {
    0% {
      background: #8A9B0F;
      --val: var(--max)
    }
  }

  @supports not (anchor-name: ---) {
    output {
      display: none;
    }
  }
</style>