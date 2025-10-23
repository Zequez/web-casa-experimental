<script lang="ts" module>
  export const metadata = { title: 'Galería' }
</script>

<script lang="ts">
  import { getSvgPathFromStrokePoints } from 'tldraw'

  import DocPage from '../components/DocPage.svelte'
  import OptimizedImg from '@/substrates/toroid-web/components/OptimizedImg.svelte'

  const photosSrc = import.meta.glob('../photos/**/*.{png,jpg}', {
    query: { format: 'webp', width: '100;250;500', picture: '' },
    import: 'default',
    eager: true,
  })

  const photosMeta = import.meta.glob('../photos/**/*.{png,jpg}', {
    query: { format: 'webp', as: 'meta:height;width', picture: '' },
    import: 'default',
    eager: true,
  })

  // const photosOriginal = import.meta.glob('../photos/**/*.{png,jpg}', {
  //   import: 'default',
  //   eager: true
  // })

  console.log(photosSrc, photosMeta)

  let photos: { [key: string]: ImgData } = {}
  for (let srcs in photosSrc) {
    const name = srcs
      .replace('../photos/', '')
      .replace('.png', '')
      .replace('.jpg', '')
    const src = photosSrc[srcs]
    const meta = photosMeta[srcs]
    photos[name] = {
      src: src as [string, string, string],
      meta: meta as { width: number; height: number },
    }
  }

  // for (let path in photos) {
  //   const parts = path.split('/')
  //   const dir = parts[0]
  //   const img = photos[path]

  //   photos[dir] = photos[dir] || {}

  //   (photos[dir] as any)[parts.slice(1).join('/')] = img
  // }

  type ImgData = {
    src: [string, string, string]
    meta: { width: number; height: number }
  }

  type FlatRecord = Record<string, ImgData>

  // Generic recursive type for the resulting tree
  type NestedRecord = {
    [key: string]: ImgData | NestedRecord
  }

  function nestBySlash(flat: FlatRecord): NestedRecord {
    const root: NestedRecord = {}

    for (const [key, value] of Object.entries(flat)) {
      const parts = key.split('/')
      let current = root

      // Traverse the path, creating nested objects if needed
      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1
        if (isLast) {
          current[part] = value
        } else {
          if (!current[part] || typeof current[part] !== 'object') {
            current[part] = {}
          }
          current = current[part] as NestedRecord
        }
      })
    }

    return root
  }

  const nestedPhotos = nestBySlash(photos)

  function pickPhotos(photos: NestedRecord, list: string[]) {
    const result: FlatRecord = {}
    for (let name of list) {
      result[name] = photos[name] as ImgData
    }
    return result
  }

  let gallery = $derived(
    pickPhotos(nestedPhotos.galeria as FlatRecord, [
      'kincho',
      'kincho-2',
      'infancias',
      'cocina',
      'parque',
      'mesa',
      'taller',
    ]),
  )

  console.log(nestedPhotos)
</script>

<DocPage>
  <h1>Galería</h1>

  {#each Object.values(gallery) as photo}
    <OptimizedImg {...photo} alt="a" />
  {/each}
</DocPage>
