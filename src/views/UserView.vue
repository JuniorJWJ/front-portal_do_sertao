<template>
	<div>
		<UserComponent />
	</div>
</template>

<script>
import UserComponent from '../components/organisms/UserComponent.vue'

export default {
	name: 'UserView',
	components: {
		UserComponent,
	},
}
</script>
