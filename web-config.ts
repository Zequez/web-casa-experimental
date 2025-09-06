import defineConfig from '../foo/linear-foo/define-config'
import title from './title.png'
import titleBg from './title-bg.jpg'
import SeparatorIcon from '~icons/fa6-solid/flask'
import ezequiel from '../ezequiel/photos/faces/joy.jpg'

export default defineConfig({
  title: 'Casa Experimental',
  colors: {
    main: {
      hue: 215,
      saturation: 50,
    },
    alt: {
      hue: 31,
      saturation: 60,
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
  floatingIcons: {
    whatsapp: '5492235235568',
  },
  sections: [
    {
      title: 'Cartelera',
      id: 'cartelera',
      showOnNavigation: true,
      hideSeparator: false,
      components: [
        {
          type: 'Markdown',
          content: `
## Eventos próximos
- Domingo 7 Septiembre: Jornada de cerámica
- Sábado 13 Septiembre: Asado en kincho para familia y amigos

## Eventos recurrentes
- Encuentro ITAA

## Eventos tentativos próximos
-
      `,
        },
      ],
    },
    {
      title: 'Espacio',
      id: 'espacio',
      showOnNavigation: true,
      hideSeparator: false,
      components: [],
    },
    {
      title: 'Equipo',
      id: 'equipo',
      showOnNavigation: true,
      hideSeparator: false,
      components: [
        {
          type: 'Team',
          members: [
            {
              img: ezequiel,
              name: 'Ezequiel A. Schwartzman',
              href: 'https://ezequielschwartzman.org',
              role: 'Custodio del espacio, guardián y facilitador de colaboración creativa',
              about: 'Artista | Inventor | Investigador | Facilitador',
            },
            {
              img: ezequiel,
              name: 'Mirta L. Cappelluti',
              href: '#',
              role: 'Custodia del espacio, administradora,',
              about: '...',
            },
            {
              img: ezequiel,
              name: 'Meri',
              href: '#',
              role: 'Guardiana del espacio en el plano astral',
              about: 'Felix Domesticus',
            },
          ],
        },
      ],
    },
    {
      title: 'Servicios',
      id: 'servicios',
      showOnNavigation: true,
      hideSeparator: false,
      components: [
        {
          type: 'Markdown',
          content: `
- Salón y cocina para eventos gastronómicos
- Salón para talleres
- Hostel de equipo
- Jornada taller de cerámica los Domingos
- Asados en Kincho
      `,
        },
      ],
    },
    {
      title: 'Contacto',
      id: 'comunicaciones',
      showOnNavigation: true,
      hideSeparator: false,
      components: [
        {
          type: 'Markdown',
          content: 'Instagram / Whatsapp / Telegram / YouTube / Email',
        },
      ],
    },
  ],
})
