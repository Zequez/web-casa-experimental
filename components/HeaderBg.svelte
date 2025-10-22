<script lang="ts">
  import generateClouds from '@/center/generative/Clouds.ts'
  import generateGrasses from '@/center/generative/Grass.ts'
  import generateUnderGrass from '@/center/generative/UnderGrass.ts'
  import Draw from '@/center/generative/Draw.svelte'

  import casa from '../photos/casa.png'
  import { getContext } from 'svelte'

  const previewMode = getContext('preview-page-mode')

  const s = 1.5
</script>

<div
  class="h-72 relative bg-gradient-to-b bg-sky-300 bg-gradient-from-white/0 bg-gradient-to-white/30"
>
  <Draw
    animate={!previewMode}
    routines={(canvas) => {
      const clouds = generateClouds(canvas, {
        clouds: 12,
        cloudSpeed: 0.1,
        cloudColor: '#fff',
      })

      return [clouds]
    }}
    class="z-10"
  />

  <div class="z-11 absolute w-full bottom-0 flexcc">
    <img src={casa} alt="Casa" class="max-w-80" />
  </div>

  <Draw
    animate={false}
    routines={(canvas) => {
      const grasses = generateGrasses(canvas, {})

      return [grasses]
    }}
    class="z-12"
  />

  <div
    class="absolute z-13 w-full h-full top-0 left-0 shadow-[inset_0_-2px_6px_2px_#0001]"
  >
    <div class="max-w-screen-md mx-auto px6 pb12 pt6">
      <h1
        style={`
            text-shadow: ${s}px 0 0 var(--un-text-shadow-color),
            -${s}px 0 0 var(--un-text-shadow-color),
            0 ${s}px 0 var(--un-text-shadow-color),
            0 -${s}px 0 var(--un-text-shadow-color),
            ${s}px ${s}px 0 var(--un-text-shadow-color),
            -${s}px ${s}px 0 var(--un-text-shadow-color),
            ${s}px -${s}px 0 var(--un-text-shadow-color),
            -${s}px -${s}px 0 var(--un-text-shadow-color);
        `}
        class="text-12 tracking-wide text-shadow-color-sky-9 line-height-12 text-white font-serif text-center font-bold"
        >CASA NAMI</h1
      >
      <p
        class="text-center italic opacity-80 font-bold text-white text-shadow-[0_1.5px_0_#000]"
      >
        <span
          class="bg-sky-800 px1 rounded-0.25rem shadow-[0_2px_0] shadow-sky-950"
          >Espacio Cooperativo Experimental</span
        ></p
      >
    </div>
  </div>
</div>
<div class="h-30 relative">
  <Draw
    animate={false}
    routines={(canvas) => {
      return [generateUnderGrass(canvas)]
    }}
  />
</div>
