<script lang="ts">
  import navBg from '../photos/navBg.jpg'
</script>

<div class="relative flex-grow bg-gray-700 text-white print:hidden">
  <div
    class="absolute inset-0 z-8 -hue-rotate-27 saturate-90 brightness-90"
    style={`background-image: url(${navBg})`}
  ></div>
  <div class="relative z-10">
    <slot />
  </div>
</div>
