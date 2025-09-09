import defineConfig from '@/substrates/linear-web/define-config'
import title from './title.png'
import titleBg from './title-bg.jpg'
import SeparatorIcon from '~icons/fa6-solid/flask'
import ezequiel from '../ezequiel/photos/faces/joy.jpg'

import minga from './fliers/minga-pre-primavera-2025.png'
import mingaContent from './fliers/minga-pre-primavera-2025.txt?raw'
import webs from './fliers/sitios-web.png'
import websContent from './fliers/sitios-web.txt?raw'

export default defineConfig({
  title: 'Casa Experimental',
  colors: {
    main: {
      hue: 207,
      saturation: 50,
    },
    alt: {
      hue: 35,
      saturation: 75,
    },
  },
  css: {
    width: 'max-w-screen-md',
  },
  nav: {
    show: true,
    separator: SeparatorIcon,
  },
  header: {
    titleImg: title,
    bgImg: titleBg,
    css: {
      img: 'max-h-300px',
    },
  },
  floatingIcons: {},
  separators: [
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
  ],
  sections: [
    {
      title: 'Cartelera',
      id: 'cartelera',
      showOnNavigation: true,
      components: [
        {
          type: 'Fliers',
          fliers: {
            'minga-pre-primavera-2025': {
              img: minga,
              title: 'Minga pre-primavera 2025',
              description: mingaContent,
              hue: 100,
            },
            'sitios-web': {
              img: webs,
              title: 'Servicio Sitios Web',
              description: websContent,
              hue: 170,
            },
          },
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
              img: ezequiel,
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
              img: ezequiel,
              name: 'Mirta L. Cappelluti',
              role: 'Custodia del espacio, administradora,',
              about: '...',
              contactLinks: [
                { type: 'telegram', value: '5492235235568' },
                { type: 'whatsapp', value: '5492235235568' },
                { type: 'email', value: 'zequez@gmail.com' },
              ],
            },
            {
              img: ezequiel,
              name: 'Meri',
              role: 'Guardiana del espacio en el plano astral',
              about: 'Felix Domesticus',
              contactLinks: [],
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
