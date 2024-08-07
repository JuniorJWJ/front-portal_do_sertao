<template>
	<div>
		<UserComponent />
	</div>
</template>

<script>
import UserComponent from '../components/UserComponent.vue'

export default {
	name: 'UserView',
	components: {
		UserComponent,
	},
}
</script>
