import { parse } from 'yaml'
import { globImportToRecord } from '@/center/utils/neutral'

import defineConfig from '@/substrates/linear-web/define-config'

import title from './title.png'
import titleBg from './title-bg.jpg'
import favicon from './favicon.png'

/*<SEPARATOR_ICON/>  IMPORT*/
import SEPARATOR_ICON from '~icons/fa6-solid/flask'

/*<MEMBERS_PHOTOS> IMPORTS*/
import MEMBERS_PHOTOS_0 from '../ezequiel/photos/faces/joy.jpg'
import MEMBERS_PHOTOS_1 from './photos/mirta.jpg'
/*</MEMBERS_PHOTOS>*/

// ███████╗██╗     ██╗███████╗██████╗ ███████╗
// ██╔════╝██║     ██║██╔════╝██╔══██╗██╔════╝
// █████╗  ██║     ██║█████╗  ██████╔╝███████╗
// ██╔══╝  ██║     ██║██╔══╝  ██╔══██╗╚════██║
// ██║     ███████╗██║███████╗██║  ██║███████║
// ╚═╝     ╚══════╝╚═╝╚══════╝╚═╝  ╚═╝╚══════╝

const allFliersRawImages = import.meta.glob('./fliers/*.png', {
  eager: true,
}) as Record<string, { default: string }>

const allFliersRawContent = import.meta.glob('./fliers/*.txt', {
  eager: true,
  as: 'raw',
}) as Record<string, string>

const allFliersRawYaml = import.meta.glob('./fliers/*.yml', {
  eager: true,
  as: 'raw',
}) as Record<string, string>

// Import fliers
const fliersContents = globImportToRecord(
  './fliers/',
  (v) => v,
  allFliersRawContent,
)
const fliersImages = globImportToRecord(
  './fliers/',
  (v) => v.default,
  allFliersRawImages,
)
const fliersYml = globImportToRecord(
  './fliers/',
  (v) => parse(v),
  allFliersRawYaml,
)

const fliers: {
  [key: string]: {
    img: string
    description: string
    title: string
    hue: number
  }
} = {}

for (const key in fliersContents) {
  if (key in fliersImages && key in fliersYml) {
    fliers[key] = {
      img: fliersImages[key],
      description: fliersContents[key],
      ...fliersYml[key],
    }
  }
}

const fliersOrder = /*<FLIERS_ORDER> STRING_LIST */ [
  'minga-pre-primavera-2025',
  'sitios-web',
]

const sortedFliers: typeof fliers = {}

for (const key of fliersOrder) {
  console.log(fliers)
  sortedFliers[key] = fliers[key]
}

//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝

export default defineConfig({
  title: /*<TITLE> STR*/ 'Casa Experimental',
  colors: {
    main: {
      hue: /*<MAIN_HUE> NUMBER*/ 207,
      saturation: /*<MAIN_SATURATION> NUMBER*/ 50,
    },
    alt: {
      hue: /*<ALT_HUE> NUMBER*/ 35,
      saturation: /*<ALT_SATURATION> NUMBER*/ 75,
    },
  },
  icon: favicon,
  css: {
    width: 'max-w-screen-md',
  },
  nav: {
    show: /*<NAV_SHOW> BOOLEAN*/ true,
    separator: SEPARATOR_ICON,
  },
  header: {
    titleImg: title,
    bgImg: titleBg,
    css: {
      img: /*<HEADER_MAX_HEIGHT> STRING*/ 'max-h-300px',
    },
  },
  floatingIcons: {},
  separators: /*<SEPARATORS>*/ [
    {
      id: 'zig-zag',
      snapTo: 'next',
      viewboxShift: [0, 0, -70, 0],
      marginInner: 3,
      marginOuter: 2,
    },
    {
      id: 'clouds',
      snapTo: 'next',
      marginInner: -0.3,
      marginOuter: -0,
    },
    {
      id: 'wavy-loops',
      snapTo: 'next',
      marginInner: -0.2,
    },
    {
      id: 'triangle-dent',
      snapTo: 'prev',
      marginInner: 0.2,
      marginOuter: 0.3,
    },
    {
      id: 'tri-triangle',
      snapTo: 'prev',
      marginOuter: 0.3,
      marginInner: 0.2,
    },
    {
      id: 'bubbles',
      snapTo: 'prev',
      marginInner: 0,
      marginOuter: 0,
    },
  ] /*</SEPARATORS>*/,
  sections: [
    {
      title: 'Cartelera',
      id: 'cartelera',
      showOnNavigation: true,
      components: [
        {
          type: 'Fliers',
          fliers: sortedFliers,
        },
      ],
    },
    {
      title: 'Espacio',
      id: 'espacio',
      showOnNavigation: true,
      components: [
        {
          type: 'Markdown',
          content: `Fotos:
        - Jardín
        - Kincho
        - Cocina
        - Baños
        - Frente
        - Habitaciones
        - Estanque
        - Personas
        `,
        },
      ],
    },
    {
      title: 'Posibilidades',
      id: 'servicios',
      showOnNavigation: true,
      components: [
        {
          type: 'Markdown',
          content: `

## Algunas posibilidades en el espacio

- Talleres y entrenamientos
- Experiencias gastronómicas
- Exposiciones de arte
- Celebraciones
- Producción y/o venta de productos alimenticios
- Taller de cerámica
- Círculos de apoyo mutuo, aprendizaje e investigación
- Co-working
- Club de juego libre para infancias
- Hospedaje

Si estás inspirad@, contactar y compartir tu propuesta
      `,
        },
      ],
    },
    {
      title: 'Equipo',
      id: 'equipo',
      showOnNavigation: true,
      components: [
        {
          type: 'Team',
          members: [
            {
              img: MEMBERS_PHOTOS_0,
              name: 'Ezequiel A. Schwartzman',
              website: 'https://ezequielschwartzman.org',
              role: 'Custodio del espacio, guardián y facilitador de colaboración creativa',
              about: 'Artista | Inventor | Investigador | Facilitador',
              contactLinks: [
                { type: 'telegram', value: '5492235235568' },
                { type: 'whatsapp', value: '5492235235568' },
                { type: 'email', value: 'zequez@gmail.com' },
              ],
            },
            {
              img: MEMBERS_PHOTOS_1,
              name: 'Mirta L. Cappelluti',
              role: 'Custodia del espacio, administradora,',
              about: '...',
              contactLinks: [
                { type: 'telegram', value: '5492235235568' },
                { type: 'whatsapp', value: '5492235235568' },
                { type: 'email', value: 'zequez@gmail.com' },
              ],
            },
          ],
        },
      ],
    },

    {
      title: 'Redes',
      id: 'redes',
      showOnNavigation: true,
      components: [
        {
          type: 'Markdown',
          content: 'Instagram / YouTube / Email',
        },
      ],
    },
  ],
})
