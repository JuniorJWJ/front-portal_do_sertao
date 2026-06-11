<template>
	<section class="login-page" aria-labelledby="login-title">
		<form class="login-card" @submit.prevent="logUser">
			<div>
				<p class="eyebrow">Acesso</p>
				<h1 id="login-title" class="page-title">Entrar no Portal</h1>
				<p class="muted">Use sua conta aprovada para gerenciar perfil e obras.</p>
			</div>

			<label for="login">
				<span>Email</span>
				<input
					id="login"
					v-model.trim="email"
					type="email"
					name="email"
					class="form-control"
					autocomplete="email"
					required
				/>
			</label>

			<label for="password">
				<span>Senha</span>
				<input
					id="password"
					v-model="password"
					type="password"
					name="password"
					class="form-control"
					autocomplete="current-password"
					required
				/>
			</label>

			<p v-if="errorMessage" class="error-message" role="alert">
				{{ errorMessage }}
			</p>

			<button type="submit" class="ui-button" :disabled="isSubmitting">
				{{ isSubmitting ? 'Entrando...' : 'Entrar' }}
			</button>
		</form>
	</section>
</template>

<script>
import { getCurrentUser } from '../services/auth'
import { api } from '../services/api'

export default {
	name: 'FormLogUser',
	mounted() {
		const currentUser = getCurrentUser()
		if (currentUser) {
			this.userId = currentUser.id
			this.$router.push({ name: 'UserView' })
		}
	},
	data() {
		return {
			email: '',
			password: '',
			errorMessage: '',
			id: null,
			isSubmitting: false,
		}
	},
	methods: {
		async logUser() {
			this.errorMessage = ''

			if (!this.email || !this.password) {
				this.errorMessage = 'Informe email e senha para continuar.'
				return
			}

			this.isSubmitting = true

			try {
				const { data } = await api.post('/autor/log', {
					email: this.email,
					password: this.password,
				})
				const tokenjwt = data.token

				if (tokenjwt) {
					localStorage.setItem('token', tokenjwt)
					this.$router.push({ name: 'UserView' }).then(() => {
						location.reload()
					})
					return
				}

				this.errorMessage =
					data.mensagem || 'Falha ao efetuar login. Verifique suas credenciais.'
			} catch (error) {
				console.log(error)
				this.errorMessage =
					error.response?.data?.mensagem ||
					'Falha ao efetuar login. Verifique suas credenciais.'
			} finally {
				this.isSubmitting = false
			}
		},
	},
}
</script>

<style scoped>
.login-page {
	display: grid;
	place-items: center;
	min-height: 58vh;
}

.login-card {
	width: min(100%, 430px);
	display: grid;
	gap: var(--space-4);
	padding: clamp(1.25rem, 4vw, 2rem);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	background: var(--color-surface);
	box-shadow: var(--shadow-md);
}

.eyebrow {
	margin: 0 0 var(--space-2);
	color: var(--color-primary);
	font-size: 0.78rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

label {
	display: grid;
	gap: var(--space-2);
	color: var(--color-muted);
	font-weight: 700;
}

.ui-button[disabled] {
	opacity: 0.72;
	cursor: wait;
	transform: none;
}

.error-message {
	margin: 0;
	padding: var(--space-3);
	border: 1px solid color-mix(in srgb, var(--color-danger) 35%, transparent);
	border-radius: var(--radius-sm);
	background: color-mix(in srgb, var(--color-danger) 10%, transparent);
	color: var(--color-danger);
	font-weight: 700;
}
</style>
