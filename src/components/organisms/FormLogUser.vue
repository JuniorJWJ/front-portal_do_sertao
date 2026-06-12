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
				<span class="input-icon-wrap">
					<AppIcon class="leading-icon" name="mail" :size="18" />
					<input
						id="login"
						v-model.trim="email"
						type="email"
						name="email"
						class="form-control has-leading-icon"
						autocomplete="email"
						required
					/>
				</span>
			</label>

			<PasswordField
				id="password"
				v-model="password"
				autocomplete="current-password"
			/>

			<p v-if="errorMessage" class="notice error" role="alert">
				{{ errorMessage }}
			</p>

			<button type="submit" class="ui-button" :disabled="isSubmitting">
				<span v-if="isSubmitting" class="btn-spinner" aria-hidden="true"></span>
				{{ isSubmitting ? 'Entrando...' : 'Entrar' }}
			</button>
		</form>
	</section>
</template>

<script>
import { getCurrentUser } from '../../services/auth'
import { api } from '../../services/api'
import AppIcon from '../atoms/AppIcon.vue'
import PasswordField from '../molecules/PasswordField.vue'

export default {
	name: 'FormLogUser',
	components: { AppIcon, PasswordField },
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
					this.$router.push({ name: 'UserView' })
					return
				}

				this.errorMessage =
					data.mensagem || 'Falha ao efetuar login. Verifique suas credenciais.'
			} catch (error) {
				console.error(error)
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
	grid-template-columns: minmax(0, 1fr);
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

label {
	display: grid;
	gap: var(--space-2);
	color: var(--color-muted);
	font-weight: 700;
}

</style>
