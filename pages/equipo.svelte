<script lang="ts" module>
  export const metadata: Metadata = {
    title: 'Equipo',
    peoplePos: [
      [412, 94],
      [211, 206],
      [94, 44],
    ],
    peopleNames: [
      'Ezequiel\nAdrián\nSchwartzman',
      'Rodrigo\nSebastian\nValdés\nOrtiz',
      'Mirta\nLiliana\nCappelluti',
    ],
    people: [
      {
        name: 'Ezequiel\nAdrián\nSchwartzman',
        image: 'ezequiel',
        links: [
          { linkType: 'web', href: 'https://ezequielschwartzman.org' },
          { linkType: 'telegram', href: 'https://t.me/ezequielschwartzman' },
          { linkType: 'whatsapp', href: 'https://wa.me/5492235235568' },
          { linkType: 'email', href: 'mailto:ezequielschwartzman@gmail.com' },
        ],
      },
      {
        name: 'Rodrigo\nSebastian\nValdés\nOrtiz',
        image: 'rodrigo',
        links: [
          {
            linkType: 'instagram',
            href: 'https://www.instagram.com/rodrigovaldesortiz/',
          },
          { linkType: 'whatsapp', href: 'https://wa.me/5492236757563' },
        ],
      },
      {
        name: 'Mirta\nLiliana\nCappelluti',
        image: 'mirta',
        links: [
          {
            linkType: 'instagram',
            href: 'https://www.instagram.com/mirtali.artcappe',
          },
          { linkType: 'whatsapp', href: 'https://wa.me/5492235278258' },
        ],
      },
    ],
  }

  type Person = {
    name: string
    image: string
    links: Link[]
  }

  type Link = {
    linkType: string
    href: string
  }

  type Metadata = {
    title: string
    peoplePos: [number, number][]
    peopleNames: string[]
    people: Person[]
  }
</script>

<script lang="ts">
  import IconGlobe from '~icons/fa6-solid/globe'
  import IconWhatsapp from '~icons/fa6-brands/whatsapp'
  import IconTelegram from '~icons/fa6-brands/telegram'
  import IconEmail from '~icons/fa6-solid/envelope'
  import IconInstagram from '~icons/fa6-brands/instagram'

  import DocPage from '../components/DocPage.svelte'

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

  import { onMount, type Component } from 'svelte'
  import { draggable } from '@/center/utils/runes.svelte'
  import { mergeImagesImports } from '@/center/utils/neutral'
  import OptimizedImg from '@/substrates/toroid-web/components/OptimizedImg.svelte'

  let M = $state<Metadata>(metadata)

  let dragging = $state<null | {
    personIndex: number
  }>(null)

  const drag = draggable(
    () => {},
    (pos) => {
      M.peoplePos[dragging!.personIndex][0] += pos.dx
      M.peoplePos[dragging!.personIndex][1] += pos.dy
    },
    () => {
      setOwnMetadata()
    },
  )

  function handleDragOnMouseDown(personIndex: number, ev: MouseEvent) {
    dragging = { personIndex }
    drag.handleDragOnMouseDown(ev)
  }

  async function setOwnMetadata() {
    const response = await fetch(
      'http://localhost:19835/repos/casa-nami/tunnel.ts/setMetadata',
      {
        method: 'POST',
        body: JSON.stringify({ page: 'equipo', metadata: M }),
      },
    )
    const data = await response.json()
  }

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
</script>

{#snippet angularButton(
  n: number,
  href: string,
  title: string,
  Icon: Component,
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
        class="w-full h-full flexcc"><Icon class="size-50%" /></span
      >
    </a>
  </div>
{/snippet}

{#snippet person(person: Person, x: number, y: number, index: number)}
  {@const buttons = person.links}
  {@const image = pictures[person.image]}
  <div
    style={`left: ${x}px; top: ${y}px`}
    class="absolute bg-sky-900 h30 w30 rounded-full p1.5 contents sm:block"
  >
    <div
      class="block sm:contents bg-sky-900 h30 w30 rounded-full p1.5 relative mt18"
    >
      <OptimizedImg {...image} alt={person.name} class="rounded-full" />
      <!-- onclick={setMetadataTest} -->

      {#if import.meta.env.DEV}
        <button
          class="absolute h-full w-full cursor-move opacity-0 rounded-full top-0 left-0"
          onmousedown={(ev) => handleDragOnMouseDown(index, ev)}
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
        )}
      {/each}
    </div>
  </div>
{/snippet}

<DocPage>
  <h1>Equipo</h1>

  <div class="sm:h-90 relative flexcc flex-col">
    {#each M.peoplePos as pos, i}
      {@render person(M.people[i], pos[0], pos[1], i)}
    {/each}
  </div>
</DocPage>
