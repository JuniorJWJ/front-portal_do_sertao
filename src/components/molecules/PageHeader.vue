<template>
	<div class="page-header">
		<p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
		<h1 :id="titleId" class="page-title">{{ title }}</h1>
		<p v-if="description" class="muted">{{ description }}</p>
	</div>
</template>

<script>
/**
 * Molécula: cabeçalho padrão de página (eyebrow + título + descrição).
 * Garante hierarquia de headings e espaçamento consistentes.
 */
export default {
	name: 'PageHeader',
	props: {
		title: {
			type: String,
			required: true,
		},
		titleId: {
			type: String,
			default: undefined,
		},
		eyebrow: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
	},
}
</script>

<style scoped>
.page-header .page-title {
	margin-bottom: var(--space-2);
}

.page-header .muted {
	margin: 0;
}
</style>
