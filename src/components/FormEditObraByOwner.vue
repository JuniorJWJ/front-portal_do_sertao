<template>
	<ObraEditForm
		:obra-id="$route.params.id"
		redirect-route-name="MinhasObrasView"
	/>
</template>

<script>
import ObraEditForm from './forms/ObraEditForm.vue'

export default {
	name: 'FormEditObraByOwner',
	components: { ObraEditForm },
}
</script>
