<script module lang="ts">
  export const metadata = { title: 'Casa Nami' }
  import DocPage from '@/repos/ezequiel/components/DocPage.svelte'
  import DarkToggle from '@/substrates/toroid-web/components/DarkToggle.svelte'
  import HeaderBg from '../components/HeaderBg.svelte'

  let s = 1.5
</script>

<div class="absolute top-6 left-6">
  <DarkToggle />
</div>

<div class="relative">
  <HeaderBg />

  <!-- <div class="bg-[#d3895e] h-24"></div> -->
</div>
