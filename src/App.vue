<template>
	<div class="app-shell">
		<NavbarNav />
		<main class="app-content" id="conteudo-principal">
			<router-view />
		</main>
		<FooterFoot />
	</div>
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

<style></style>
