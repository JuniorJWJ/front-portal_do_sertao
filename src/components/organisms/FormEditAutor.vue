<template>
	<AutorEditForm
		:autor-id="$route.params.id"
		redirect-route-name="AutorEditList"
		title="Alterar autor"
		eyebrow="Administração"
	/>
</template>

<script>
import AutorEditForm from './forms/AutorEditForm.vue'

export default {
	name: 'FormEditAutor',
	components: { AutorEditForm },
}
</script>
