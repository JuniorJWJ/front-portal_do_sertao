<template>
	<div class="toast-region" aria-live="polite" aria-atomic="false">
		<div
			v-for="item in items"
			:key="item.id"
			class="toast"
			:class="'toast--' + item.type"
		>
			<AppIcon :name="iconFor(item.type)" :size="18" class="toast-icon" />
			<span class="toast-msg">{{ item.message }}</span>
			<button
				class="toast-close"
				type="button"
				aria-label="Fechar notificação"
				@click="dismiss(item.id)"
			>
				<AppIcon name="x" :size="15" />
			</button>
		</div>
	</div>
</template>

<script>
import { toastState } from '../../services/toast'
import AppIcon from '../atoms/AppIcon.vue'

const iconMap = {
	success: 'check-circle',
	error: 'alert-triangle',
	info: 'info',
}

export default {
	name: 'ToastNotification',
	components: { AppIcon },
	computed: {
		items() {
			return toastState.items
		},
	},
	methods: {
		iconFor(type) {
			return iconMap[type] || 'info'
		},
		dismiss(id) {
			const i = toastState.items.findIndex((t) => t.id === id)
			if (i !== -1) toastState.items.splice(i, 1)
		},
	},
}
</script>

<style scoped>
.toast-region {
	position: fixed;
	bottom: var(--space-5);
	right: var(--space-5);
	z-index: 9000;
	display: flex;
	flex-direction: column;
	gap: var(--space-2);
	pointer-events: none;
	max-width: min(380px, calc(100vw - 2 * var(--space-5)));
}

.toast {
	display: flex;
	align-items: flex-start;
	gap: var(--space-3);
	padding: var(--space-3) var(--space-4);
	border-radius: var(--radius-md);
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	box-shadow: var(--shadow-md);
	pointer-events: all;
	animation: toast-in 240ms ease;
}

.toast--success {
	border-color: color-mix(in srgb, var(--color-success) 40%, transparent);
	background: color-mix(in srgb, var(--color-success) 8%, var(--color-surface));
}

.toast--success .toast-icon {
	color: var(--color-success);
}

.toast--error {
	border-color: color-mix(in srgb, var(--color-danger) 40%, transparent);
	background: color-mix(in srgb, var(--color-danger) 8%, var(--color-surface));
}

.toast--error .toast-icon {
	color: var(--color-danger);
}

.toast--info .toast-icon {
	color: var(--color-primary);
}

.toast-icon {
	flex-shrink: 0;
	margin-top: 1px;
}

.toast-msg {
	flex: 1;
	min-width: 0;
	font-size: 0.9rem;
	color: var(--color-text);
	line-height: 1.45;
	font-weight: 500;
}

.toast-close {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 28px;
	height: 28px;
	margin: -0.15rem -0.4rem -0.15rem 0;
	padding: 0;
	border: 0;
	border-radius: var(--radius-sm);
	background: transparent;
	color: var(--color-muted);
	cursor: pointer;
	transition:
		background-color 140ms ease,
		color 140ms ease;
}

.toast-close:hover {
	background: color-mix(in srgb, var(--color-text) 10%, transparent);
	color: var(--color-text);
}

@keyframes toast-in {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (max-width: 480px) {
	.toast-region {
		bottom: var(--space-3);
		right: var(--space-3);
		left: var(--space-3);
		max-width: none;
	}
}
</style>
