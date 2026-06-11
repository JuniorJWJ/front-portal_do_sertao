<template>
	<ObraEditForm
		:obra-id="$route.params.id"
		redirect-route-name="ObraEditList"
		allow-author-change
	/>
</template>

<script>
import ObraEditForm from './forms/ObraEditForm.vue'

export default {
	name: 'FormEditObra',
	components: { ObraEditForm },
}
</script>
