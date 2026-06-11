<template>
	<section class="page-surface welcome" aria-labelledby="welcome-title">
		<div>
			<p class="eyebrow">Painel</p>
			<h1 id="welcome-title" class="page-title">
				Bem-vindo{{ userName ? `, ${userName}` : '' }}
			</h1>
			<p class="muted">O que você gostaria de fazer hoje?</p>
		</div>

		<nav class="quick-links" aria-label="Atalhos do painel">
			<router-link
				v-for="link in quickLinks"
				:key="link.to"
				:to="link.to"
				class="quick-link"
			>
				<span class="icon" aria-hidden="true">{{ link.icon }}</span>
				<strong>{{ link.label }}</strong>
				<small>{{ link.description }}</small>
			</router-link>
		</nav>
	</section>
</template>

<script>
import { getCurrentUser, isAdmin } from '../services/auth'
import { api } from '../services/api'

const authorLinks = [
	{
		to: '/minhas_obras',
		icon: '📚',
		label: 'Minhas obras',
		description: 'Acompanhe o status das suas obras',
	},
	{
		to: '/register_obra',
		icon: '📤',
		label: 'Cadastrar obra',
		description: 'Envie uma nova obra para aprovação',
	},
	{
		to: '/perfil',
		icon: '👤',
		label: 'Meu perfil',
		description: 'Veja e edite seus dados',
	},
]

const adminLinks = [
	{
		to: '/edit_autor_list',
		icon: '👥',
		label: 'Gerenciar autores',
		description: 'Aprove, edite ou exclua autores',
	},
	{
		to: '/edit_obra_list',
		icon: '📚',
		label: 'Gerenciar obras',
		description: 'Aprove, edite ou exclua obras',
	},
	{
		to: '/create_obra',
		icon: '📤',
		label: 'Cadastrar obra',
		description: 'Cadastre uma obra para um autor',
	},
	{
		to: '/dados_autores',
		icon: '📈',
		label: 'Gráficos',
		description: 'Dados demográficos dos autores',
	},
]

export default {
	name: 'UserComponent',
	data() {
		return {
			userName: '',
			quickLinks: isAdmin() ? adminLinks : authorLinks,
		}
	},
	methods: {
		async getProfile(userId) {
			try {
				const res = await api.get(`/autor/${userId}`)
				this.userName = res.data?.autor?.[0]?.nome || ''
			} catch (error) {
				console.error(error)
			}
		},
	},
	mounted() {
		const currentUser = getCurrentUser()

		if (!currentUser) {
			this.$router.push({ name: 'LogUserView' })
			return
		}

		this.getProfile(currentUser.id)
	},
}
</script>

<style scoped>
.welcome {
	display: grid;
	gap: var(--space-6);
}

.quick-links {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	gap: var(--space-3);
}

.quick-link {
	display: grid;
	gap: var(--space-1);
	padding: var(--space-4);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface);
	color: var(--color-text);
	text-decoration: none;
	box-shadow: var(--shadow-sm);
	transition:
		transform 160ms ease,
		border-color 160ms ease,
		box-shadow 160ms ease;
}

.quick-link:hover {
	transform: translateY(-2px);
	border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
	box-shadow: var(--shadow-md);
}

.quick-link .icon {
	font-size: 1.6rem;
}

.quick-link small {
	color: var(--color-muted);
}
</style>
