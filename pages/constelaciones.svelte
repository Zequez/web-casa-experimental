<script lang="ts" module>
  export const metadata = { title: 'Constelaciones Familiares' }
</script>

<script lang="ts">
  import DocPage from '../components/DocPage.svelte'
  import Teammate, { metadata as tm } from '../components/Teammate.svelte'

  import constelaciones from '../photos/constelaciones.png?width=100;250;500&format=webp&srcset'
  import constelacionesMeta from '../photos/constelaciones.png?as=meta:height;width'
  import rodrigo from '../photos/equipo/rodrigo2.jpg?width=100;250;500&format=webp&srcset'
  import rodrigoMeta from '../photos/equipo/rodrigo2.jpg'
  import OptimizedImg from '@/substrates/toroid-web/components/OptimizedImg.svelte'
  import StarrySky from '@/repos/ezequiel/components/StarrySky.svelte'

  const s = 2

  const lastTime = new Date('2025-10-26 10:00 GMT-3')
</script>

<!-- <div class=""> -->
<div class="w-full h-full bg-gray-900 overflow-hidden relative">
  <StarrySky />
  <div
    class={[
      'doc max-w-26rem mx-auto relative overflow-hidden rounded-4 mt6 mb6 b-1.5 b-white/50',
      '',
    ]}
  >
    <div
      class="absolute z-15 h-full w-full top-0 rounded-4 shadow-[inset_0_0_6px_3px_#000]"
    ></div>
    <OptimizedImg
      class="w-full relative z-9"
      alt="Seres de luz en mycelio"
      src={constelaciones}
      meta={constelacionesMeta}
    />
    <div class="absolute top-0 left-0 w-full z-10">
      <h1
        class="text-shadow-color-black text-yellow-300"
        style={`
            text-shadow: ${s}px 0 0 var(--un-text-shadow-color),
            -${s}px 0 0 var(--un-text-shadow-color),
            0 ${s}px 0 var(--un-text-shadow-color),
            0 -${s}px 0 var(--un-text-shadow-color),
            ${s}px ${s}px 0 var(--un-text-shadow-color),
            -${s}px ${s}px 0 var(--un-text-shadow-color),
            ${s}px -${s}px 0 var(--un-text-shadow-color),
            -${s}px -${s}px 0 var(--un-text-shadow-color),
            0px 0px 4px #fff;
        `}>Constelaciones Familiares</h1
      >

      <p
        class="bg-black/20 mx6 rounded-4 text-cente text-8 flexcc text-center font-serif filter-drop-shadow-[0_0_3px_#000]"
        >Próximo encuentro:
        {#if new Date() > lastTime}
          <br />Sin definir
        {:else}
          <br />Domingo 26 de Octubre<br />10hs a 14hs
        {/if}
      </p>
    </div>
    <div class="absolute bottom-6 w-full left-0 z-15">
      <p class="text-center text-8 filter-drop-shadow-[0_0_3px_#000]"
        >Sostiene</p
      >

      <div class="flexcc -ml26 scale-95"
        ><Teammate person="rodrigo" expand={true} /></div
      >
    </div>
  </div>
</div>
