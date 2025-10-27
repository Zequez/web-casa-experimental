<script lang="ts" module>
  export const metadata = {
    people: {
      ezequiel: {
        name: 'Ezequiel\nAdrián\nSchwartzman',
        image: 'ezequiel',
        links: [
          { linkType: 'web', href: 'https://ezequielschwartzman.org' },
          { linkType: 'telegram', href: 'https://t.me/ezequielschwartzman' },
          {
            linkType: 'whatsapp',
            href: 'https://wa.me/5492235235568',
            text: '54 9 223 5235568',
          },
          { linkType: 'email', href: 'mailto:ezequielschwartzman@gmail.com' },
        ],
      },
      rodrigo: {
        name: 'Rodrigo\nSebastian\nValdés\nOrtiz',
        image: 'rodrigo2',
        links: [
          {
            linkType: 'instagram',
            href: 'https://www.instagram.com/rodrigovaldesortiz/',
            text: '@rodrigovaldesortiz',
          },
          {
            linkType: 'whatsapp',
            href: 'https://wa.me/5492236757563',
            text: '54 9 223 6757563',
          },
        ],
      },
      mirta: {
        name: 'Mirta\nLiliana\nCappelluti',
        image: 'mirta',
        links: [
          {
            linkType: 'instagram',
            href: 'https://www.instagram.com/mirtali.artcappe',
          },
          {
            linkType: 'whatsapp',
            href: 'https://wa.me/5492235278258',
            text: '54 9 223 5278258',
          },
        ],
      },
    },
  }
  export type Person = {
    name: string
    image: string
    links: Link[]
  }

  export type Link = {
    linkType: string
    href: string
    text?: string
  }
</script>

<script lang="ts">
  import IconGlobe from '~icons/fa6-solid/globe'
  import IconWhatsapp from '~icons/fa6-brands/whatsapp'
  import IconTelegram from '~icons/fa6-brands/telegram'
  import IconEmail from '~icons/fa6-solid/envelope'
  import IconInstagram from '~icons/fa6-brands/instagram'

  import { mergeImagesImports } from '@/center/utils'
  import OptimizedImg from '@/substrates/toroid-web/components/OptimizedImg.svelte'
  import { type Component } from 'svelte'

  const picturesSrc = import.meta.glob('../photos/equipo/*.jpg', {
    query: { format: 'webp', width: '100;250;500', picture: '' },
    import: 'default',
    eager: true,
  }) as { [key: string]: [string, string, string] }

  const picturesMeta = import.meta.glob('../photos/equipo/*.jpg', {
    query: { format: 'webp', as: 'meta:height;width', picture: '' },
    import: 'default',
    eager: true,
  }) as { [key: string]: { height: number; width: number } }

  const pictures = mergeImagesImports(
    '../photos/equipo/',
    picturesSrc,
    picturesMeta,
  )

  const linksIcons = {
    email: IconEmail,
    telegram: IconTelegram,
    whatsapp: IconWhatsapp,
    web: IconGlobe,
    instagram: IconInstagram,
  }

  const linksNames = {
    email: 'Email',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    web: 'Web',
    instagram: 'Instagram',
  }

  const props: {
    person: keyof typeof metadata.people
    expand?: boolean
    onmousedown?: (ev: MouseEvent) => void
  } = $props()

  const person = $derived(metadata.people[props.person])
  const buttons = $derived(person.links)
  const image = $derived(pictures[person.image])
</script>

{#snippet angularButton(
  n: number,
  href: string,
  title: string,
  Icon: Component,
  text?: string,
)}
  <div
    style={`transform: rotate(${n * 33 - 16.5}deg)`}
    class="absolute left-1/2 top-1/2"
  >
    <a
      {href}
      target="_blank"
      class="text-white btn w12 h12 absolute -translate-1/2 left-24 hover:scale-110 transition-transform bg-sky-900 rounded-full"
      {title}
    >
      <span
        style={`transform: rotate(${-n * 33 + 16.5}deg)`}
        class="w-full h-full flexcc relative"
        ><Icon class="size-50%" />
        {#if props.expand}
          <div
            class="absolute left-100% top-1/2 -translate-y-1/2 ml3 font-mono text-3 whitespace-nowrap"
            >{text}</div
          >
        {/if}
      </span>
    </a>
  </div>
{/snippet}

<div class="bg-sky-900 h30 w30 rounded-full p1.5 contents sm:block relative">
  <div
    class="block sm:contents bg-sky-900 h30 w30 rounded-full p1.5 relative mt18"
  >
    <OptimizedImg
      {...image}
      alt={person.name}
      class="rounded-full h-full w-full object-fill"
    />

    {#if import.meta.env.DEV && props.onmousedown}
      <button
        class="absolute h-full w-full cursor-move opacity-0 rounded-full top-0 left-0"
        onmousedown={props.onmousedown}
      >
        DRAG
      </button>
    {/if}

    <div
      class="absolute pr3 font-serif font-bold tracking-wider top-50% right-100% -translate-y-1/2 text-right"
    >
      {@html person.name.replace('\n', '<br/>')}
    </div>

    {#each buttons as button, i}
      {@const Icon = linksIcons[button.linkType as keyof typeof linksIcons]}

      {@render angularButton(
        i - Math.floor(buttons.length / 2 - 1),
        button.href,
        linksNames[button.linkType as keyof typeof linksNames],
        Icon,
        button.text,
      )}
    {/each}
  </div>
</div>
