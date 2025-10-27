<script lang="ts" module>
  export const metadata: Metadata = {
    title: 'Tripulación',
    peoplePos: [
      [412, 94],
      [211, 206],
      [94, 44],
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
  }
</script>

<script lang="ts">
  import DocPage from '../components/DocPage.svelte'

  import { draggable } from '@/center/utils/runes.svelte'
  import Teammate from '../components/Teammate.svelte'

  const people = ['ezequiel', 'rodrigo', 'mirta']

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
</script>

{#snippet person(personId: string, x: number, y: number, index: number)}
  <div class="absolute" style={`left: ${x}px; top: ${y}px`}>
    <Teammate
      person={personId as any}
      onmousedown={(ev) => handleDragOnMouseDown(index, ev)}
    />
  </div>
{/snippet}

<DocPage>
  <h1>Tripulación</h1>

  <div class="sm:h-90 relative flexcc flex-col">
    {#each M.peoplePos as pos, i}
      {@render person(people[i], pos[0], pos[1], i)}
    {/each}
  </div>
</DocPage>
