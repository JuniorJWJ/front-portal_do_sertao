<template>
	<AutorEditForm
		v-if="userId"
		:autor-id="userId"
		redirect-route-name="AutorPerfilView"
		title="Editar perfil"
		eyebrow="Minha conta"
	/>
</template>

<script>
import { getCurrentUser } from '../services/auth'
import AutorEditForm from './forms/AutorEditForm.vue'

export default {
	name: 'FormEditPerfil',
	components: { AutorEditForm },
	data() {
		return {
			userId: getCurrentUser()?.id ?? null,
		}
	},
	mounted() {
		if (!this.userId) {
			this.$router.push({ name: 'LogUserView' })
		}
	},
}
</script>
