<template>
  <router-view/>
  <NavbarNav />
  <FooterFoot />
</template>

<script>
import NavbarNav from './components/NavbarNav.vue'
import FooterFoot from './components/FooterFoot.vue'

export default {
  name: 'App',
  components: {
    NavbarNav,
    FooterFoot
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 200px;
  max-width: 1123px;
  margin: 150px auto;
}
</style>
