<script lang="ts" module>
  export const metadata = { title: 'Mapa' }
</script>

<script lang="ts">
  import OptimizedImg from '@/substrates/toroid-web/components/OptimizedImg.svelte'

  import mapa from '../photos/mapa.png?width=100;250;500&format=webp&srcset'
  import mapaMeta from '../photos/mapa.png?as=meta:height;width'

  import tierra from '../photos/tierra.png?width=100;250;500&format=webp&srcset'
  import tierraMeta from '../photos/tierra.png?as=meta:height;width'

  import DocPage from '../components/DocPage.svelte'
  import StarrySky from '@/repos/ezequiel/components/StarrySky.svelte'
</script>

<DocPage>
  <h1>Mapa</h1>

  <div
    class="h30 bg-sky-600 hover:brightness-110 max-w-100 mx-auto text-white rounded-4 mb12 relative overflow-hidden flex"
  >
    <div class="h30 w30 p3 relative">
      <StarrySky />
      <OptimizedImg
        class="h-full relative mr6"
        src={tierra}
        meta={tierraMeta}
        alt="Gaia"
      />
    </div>
    <div
      class="relative flexcc font-serif text-8 pl6 text-shadow-[0_1.5px_0_#0008]"
      >Direcciones...</div
    >
    <a
      href="https://maps.app.goo.gl/SApEkTaDhVEpmQbYA"
      target="_blank"
      class="absolute top-0 left-0 right-0 bottom-0 opacity-0">Localizar</a
    >
    <div
      class="pointer-events-none absolute z-20 inset-0 top-1px bg-gradient-to-b from-white/10 to-white/0 rounded-4 shadow-[inset_0_-3px_0_#0004,inset_0_1.5px_0_#fff2]"
    ></div>
  </div>

  <OptimizedImg
    class="rounded-4 b-1.5 b-black/30"
    src={mapa}
    meta={mapaMeta}
    alt="Mapa de la casa"
  />
</DocPage>
