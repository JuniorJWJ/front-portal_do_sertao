<template>
	<div class="app-shell">
		<NavbarNav />
		<main class="app-content" id="conteudo-principal">
			<router-view />
		</main>
		<FooterFoot />
		<ToastNotification />
	</div>
</template>

<script>
import NavbarNav from './components/organisms/NavbarNav.vue'
import FooterFoot from './components/organisms/FooterFoot.vue'
import ToastNotification from './components/molecules/ToastNotification.vue'

export default {
	name: 'App',
	components: {
		NavbarNav,
		FooterFoot,
		ToastNotification,
	},
}
</script>

<style></style>
