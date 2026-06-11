<template>
	<Teleport to="body">
		<div
			v-if="open"
			class="dialog-overlay"
			@click.self="cancel"
			@keydown.esc="cancel"
		>
			<div
				ref="dialog"
				class="dialog"
				role="alertdialog"
				aria-modal="true"
				:aria-label="title"
				aria-describedby="confirm-dialog-message"
			>
				<span class="dialog-icon">
					<AppIcon name="alert-triangle" :size="24" />
				</span>
				<h2 class="dialog-title">{{ title }}</h2>
				<p id="confirm-dialog-message" class="dialog-message">{{ message }}</p>
				<div class="dialog-actions">
					<button
						ref="cancelButton"
						type="button"
						class="ui-button secondary"
						@click="cancel"
					>
						{{ cancelLabel }}
					</button>
					<button type="button" class="ui-button danger" @click="confirm">
						{{ confirmLabel }}
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script>
import AppIcon from '../atoms/AppIcon.vue'

/**
 * Diálogo de confirmação para ações destrutivas.
 * Uso:
 *   <ConfirmDialog ref="confirm" />
 *   const ok = await this.$refs.confirm.ask({ title, message })
 */
export default {
	name: 'ConfirmDialog',
	components: { AppIcon },
	data() {
		return {
			open: false,
			title: 'Confirmar ação',
			message: '',
			confirmLabel: 'Excluir',
			cancelLabel: 'Cancelar',
			resolver: null,
		}
	},
	methods: {
		ask({ title, message, confirmLabel, cancelLabel } = {}) {
			this.title = title || 'Confirmar ação'
			this.message = message || ''
			this.confirmLabel = confirmLabel || 'Excluir'
			this.cancelLabel = cancelLabel || 'Cancelar'
			this.open = true

			this.$nextTick(() => {
				// Foco inicial na ação segura (cancelar)
				this.$refs.cancelButton?.focus()
			})

			return new Promise((resolve) => {
				this.resolver = resolve
			})
		},
		confirm() {
			this.close(true)
		},
		cancel() {
			this.close(false)
		},
		close(result) {
			this.open = false
			if (this.resolver) {
				this.resolver(result)
				this.resolver = null
			}
		},
	},
}
</script>

<style scoped>
.dialog-overlay {
	position: fixed;
	inset: 0;
	z-index: 100;
	display: grid;
	place-items: center;
	padding: var(--space-4);
	background: rgba(0, 0, 0, 0.45);
	backdrop-filter: blur(3px);
	animation: dialog-fade 160ms ease-out both;
}

.dialog {
	width: min(100%, 420px);
	display: grid;
	gap: var(--space-3);
	padding: var(--space-5);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	background: var(--color-surface);
	box-shadow: var(--shadow-md);
	text-align: center;
	justify-items: center;
	animation: dialog-pop 180ms ease-out both;
}

.dialog-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 52px;
	height: 52px;
	border-radius: 999px;
	background: color-mix(in srgb, var(--color-danger) 12%, transparent);
	color: var(--color-danger);
}

.dialog-title {
	margin: 0;
	font-size: 1.2rem;
	font-weight: 800;
}

.dialog-message {
	margin: 0;
	color: var(--color-muted);
	line-height: 1.6;
}

.dialog-actions {
	display: flex;
	gap: var(--space-3);
	margin-top: var(--space-2);
	width: 100%;
}

.dialog-actions .ui-button {
	flex: 1;
}

@keyframes dialog-fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes dialog-pop {
	from {
		opacity: 0;
		transform: scale(0.95) translateY(8px);
	}
	to {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
}

@media (max-width: 480px) {
	.dialog-overlay {
		place-items: end center;
		padding: 0;
	}

	.dialog {
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		border-bottom: 0;
	}
}
</style>
