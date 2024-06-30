<template>
  <main>
    <NavbarNav />
    <router-view />
    <FooterFoot />
  </main>
</template>

<script>
import NavbarNav from './components/NavbarNav.vue'
import FooterFoot from './components/FooterFoot.vue'

export default {
  name: 'App',
  components: {
    NavbarNav,
    FooterFoot,
  },
}
</script>

<style>
main {
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  overflow-x: hidden;
}
</style>
