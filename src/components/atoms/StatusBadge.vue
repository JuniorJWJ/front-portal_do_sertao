<template>
	<span class="badge" :class="approved ? 'success' : 'pending'">
		{{ approved ? approvedLabel : pendingLabel }}
	</span>
</template>

<script>
/**
 * Átomo: badge de status de aprovação.
 * Estilos `.badge`, `.success` e `.pending` vêm do theme.css.
 */
export default {
	name: 'StatusBadge',
	props: {
		approved: {
			type: Boolean,
			required: true,
		},
		approvedLabel: {
			type: String,
			default: 'Aprovado',
		},
		pendingLabel: {
			type: String,
			default: 'Pendente',
		},
	},
}
</script>
