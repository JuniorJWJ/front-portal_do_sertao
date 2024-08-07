<template>
	<div>
		<ObraList />
	</div>
</template>

<script>
import ObraList from '../components/ObraList.vue'
// import GenerosLiterarios from "../components/GeneroLiterarioFiltro.vue"

export default {
	name: 'ObraView',
	components: {
		ObraList,
		// GenerosLiterarios
	},
}
</script>
