<script lang="ts">
  import App from '@/substrates/toroid-web/components/App.svelte'
  import favicon from './photos/favicon.png'
  import navBg from './photos/navBg.jpg'
  import Guarda from './components/Guarda.svelte'
  import Container from './components/Container.svelte'
  import NavContainer from './components/NavContainer.svelte'
</script>

<App
  {navBg}
  {favicon}
  {Guarda}
  title="Casa Nami"
  nav={[['index', 'equipo'], [], [], []]}
  {Container}
  {NavContainer}
></App>
