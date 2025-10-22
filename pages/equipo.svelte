<script lang="ts" module>
  export const metadata = { title: 'Equipo' }
</script>

<script lang="ts">
  import IconGlobe from '~icons/fa6-solid/globe'
  import IconWhatsapp from '~icons/fa6-brands/whatsapp'
  import IconTelegram from '~icons/fa6-brands/telegram'
  import IconEmail from '~icons/fa6-solid/envelope'

  import DocPage from '../components/DocPage.svelte'

  import ezequiel from '../../ezequiel/photos/ezequiel.jpg'
  import { type Component } from 'svelte'
</script>

{#snippet angularButton(
  n: number,
  href: string,
  title: string,
  Icon: Component,
)}
  <div
    style={`transform: rotate(${n * 33}deg)`}
    class="absolute left-1/2 top-1/2"
  >
    <a
      {href}
      target="_blank"
      class="text-white btn w12 h12 absolute -translate-1/2 left-24 hover:scale-110 transition-transform bg-sky-900 rounded-full"
      {title}
    >
      <span
        style={`transform: rotate(${-n * 33}deg)`}
        class="w-full h-full flexcc"><Icon class="size-50%" /></span
      >
    </a>
  </div>
{/snippet}

{#snippet person(x: number, y: number)}
  <div
    style={`left: ${x}%; top: ${y}%`}
    class="absolute bg-sky-900 h30 w30 rounded-full p1.5"
  >
    <img src={ezequiel} alt="Ezequiel" class="rounded-full" />

    <div
      class="absolute pr3 font-serif font-bold tracking-wider top-50% right-100% -translate-y-1/2 text-right"
    >
      Ezequiel<br />
      Adrián<br />
      Schwartzman
    </div>

    {@render angularButton(
      -1,
      'https://ezequielschwartzman.org',
      'Sitio web',
      IconGlobe,
    )}
    {@render angularButton(
      0,
      'https://t.me/ezequielschwartzman',
      'Telegram',
      IconTelegram,
    )}
    {@render angularButton(
      1,
      'https://wa.me/5492235235568',
      'Whatsapp',
      IconWhatsapp,
    )}
    {@render angularButton(
      2,
      'mailto:ezequielschwartzman@gmail.com',
      'Email',
      IconEmail,
    )}
  </div>
{/snippet}

<DocPage>
  <h1>Equipo</h1>

  <div class="h-72 relative">
    {@render person(0, 0)}
    {@render person(60, 0)}
    {@render person(25, 70)}
  </div>
</DocPage>
