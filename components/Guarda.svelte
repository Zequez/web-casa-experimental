<script lang="ts">
  import guardaTexture from '../photos/guarda-texture.jpg'
</script>

<div id="nav-start"></div>
<a
  href="#nav-start"
  onclick={(ev) => {
    const el = document.getElementById('nav-start')!
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    ev.preventDefault()
  }}
  class="h-12 text-center uppercase font-serif font-bold text-white text-shadow-[0_1.5px_0_#0004] flexcc text-5 tracking-wider relative"
  style={`background-image: url(${guardaTexture})`}
>
  <span
    class="absolute inset-0 pointer-events-none shadow-[inset_0_-5px_0_#0002,inset_0_-1.5px_0_#0005,inset_0_5px_0_#fff2,inset_0_1.5px_0_#fff3]"
  ></span>
  <span
    class="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-black/5"
  ></span>
  Casa Nami
</a>
