<template>
	<section class="page-surface welcome" aria-labelledby="welcome-title">
		<PageHeader
			eyebrow="Painel"
			:title="welcomeTitle"
			title-id="welcome-title"
			description="O que você gostaria de fazer hoje?"
		/>

		<nav class="quick-links" aria-label="Atalhos do painel">
			<router-link
				v-for="link in quickLinks"
				:key="link.to"
				:to="link.to"
				class="quick-link"
			>
				<span class="icon">
					<AppIcon :name="link.icon" :size="22" />
				</span>
				<strong>{{ link.label }}</strong>
				<small>{{ link.description }}</small>
			</router-link>
		</nav>
	</section>
</template>

<script>
import { getCurrentUser, isAdmin } from '../../services/auth'
import { api } from '../../services/api'
import AppIcon from '../atoms/AppIcon.vue'
import PageHeader from '../molecules/PageHeader.vue'

const authorLinks = [
	{
		to: '/minhas_obras',
		icon: 'book-open',
		label: 'Minhas obras',
		description: 'Acompanhe o status das suas obras',
	},
	{
		to: '/register_obra',
		icon: 'upload',
		label: 'Cadastrar obra',
		description: 'Envie uma nova obra para aprovação',
	},
	{
		to: '/perfil',
		icon: 'user',
		label: 'Meu perfil',
		description: 'Veja e edite seus dados',
	},
]

const adminLinks = [
	{
		to: '/edit_autor_list',
		icon: 'users',
		label: 'Gerenciar autores',
		description: 'Aprove, edite ou exclua autores',
	},
	{
		to: '/edit_obra_list',
		icon: 'book-open',
		label: 'Gerenciar obras',
		description: 'Aprove, edite ou exclua obras',
	},
	{
		to: '/create_obra',
		icon: 'upload',
		label: 'Cadastrar obra',
		description: 'Cadastre uma obra para um autor',
	},
	{
		to: '/dados_autores',
		icon: 'bar-chart',
		label: 'Gráficos',
		description: 'Dados demográficos dos autores',
	},
]

export default {
	name: 'UserComponent',
	components: { AppIcon, PageHeader },
	computed: {
		welcomeTitle() {
			return this.userName ? `Bem-vindo, ${this.userName}` : 'Bem-vindo'
		},
	},
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
	grid-template-columns: minmax(0, 1fr);
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
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 42px;
	height: 42px;
	border-radius: var(--radius-sm);
	background: var(--color-primary-soft);
	color: var(--color-primary);
	margin-bottom: var(--space-2);
}

.quick-link small {
	color: var(--color-muted);
}
</style>
