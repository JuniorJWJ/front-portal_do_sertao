<template>
	<header class="site-header">
		<router-link class="brand" to="/" aria-label="Portal do Sertao - Home">
			<img src="../assets/logo-4.png" alt="Portal do Sertao" />
		</router-link>

		<button
			class="menu-toggle"
			type="button"
			:aria-expanded="menuOpen"
			aria-controls="main-navigation"
			@click="menuOpen = !menuOpen"
		>
			<span></span>
			<span></span>
			<span></span>
			<span class="sr-only">Abrir menu</span>
		</button>

		<nav
			id="main-navigation"
			class="main-nav"
			:class="{ open: menuOpen }"
			aria-label="Navegacao principal"
		>
			<router-link
				v-for="item in visibleNavItems"
				:key="item.to"
				:to="item.to"
				@click="closeMenu"
			>
				{{ item.label }}
			</router-link>

			<router-link
				v-if="!token"
				class="login"
				to="/log_user"
				@click="closeMenu"
			>
				Login
			</router-link>
			<button v-else class="login" type="button" @click="deslogUser">Sair</button>
		</nav>
	</header>
</template>

<script>
import { getCurrentUser, getToken, logout } from '../services/auth'

const publicItems = [
	{ to: '/', label: 'Home' },
	{ to: '/list_obra', label: 'Obras' },
	{ to: '/list_autor', label: 'Autores' },
	{ to: '/sobre', label: 'Sobre' },
	{ to: '/dados_autores', label: 'Graficos' },
]

const adminItems = [
	{ to: '/edit_autor_list', label: 'Editar Autor' },
	{ to: '/create_obra', label: 'Criar Obra' },
	{ to: '/create_autor', label: 'Criar Autor' },
	{ to: '/edit_obra_list', label: 'Editar Obra' },
]

const authorItems = [
	{ to: '/minhas_obras', label: 'Minhas Obras' },
	{ to: '/perfil', label: 'Perfil' },
	{ to: '/edit_perfil', label: 'Editar Perfil' },
	{ to: '/register_obra', label: 'Registrar Obra' },
]

export default {
	name: 'NavbarNav',
	data() {
		const currentUser = getCurrentUser()

		return {
			token: getToken(),
			adm: currentUser?.adm === 1,
			menuOpen: false,
		}
	},
	computed: {
		visibleNavItems() {
			if (!this.token) {
				return publicItems
			}

			return this.adm
				? [...publicItems, ...adminItems]
				: [...publicItems, ...authorItems]
		},
	},
	watch: {
		// Reavalia o estado de autenticação a cada navegação,
		// dispensando o location.reload() após login/logout.
		$route() {
			this.refreshAuth()
			this.closeMenu()
		},
	},
	methods: {
		refreshAuth() {
			const currentUser = getCurrentUser()
			this.token = getToken()
			this.adm = currentUser?.adm === 1
		},
		deslogUser() {
			logout()
			this.closeMenu()
			this.$router.push({ name: 'LogUserView' })
		},
		closeMenu() {
			this.menuOpen = false
		},
	},
}
</script>

<style scoped>
.site-header {
	position: sticky;
	top: 0;
	z-index: 20;
	width: min(100%, var(--container));
	margin: 0 auto var(--space-5);
	padding: var(--space-3) var(--space-5);
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--space-4);
	background: color-mix(in srgb, var(--color-surface) 92%, transparent);
	backdrop-filter: blur(14px);
	border: 1px solid var(--color-border);
	border-top: 0;
	border-radius: 0 0 var(--radius-lg) var(--radius-lg);
	box-shadow: var(--shadow-sm);
}

.brand {
	display: flex;
	align-items: center;
	flex: 0 0 auto;
}

.brand img {
	width: 86px;
	height: auto;
	display: block;
}

.main-nav {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: var(--space-2);
	flex-wrap: wrap;
}

.main-nav a,
.login {
	display: inline-flex;
	align-items: center;
	min-height: 38px;
	padding: 0.5rem 0.72rem;
	border-radius: var(--radius-sm);
	color: var(--color-muted);
	font-size: 0.95rem;
	font-weight: 700;
	text-decoration: none;
	white-space: nowrap;
	transition:
		background-color 160ms ease,
		color 160ms ease,
		transform 160ms ease;
}

.main-nav a:hover,
.main-nav a.router-link-active {
	background: var(--color-primary-soft);
	color: var(--color-primary-strong);
}

.login {
	border: 0;
	background: var(--color-primary);
	color: #fff;
	cursor: pointer;
}

.login:hover {
	background: var(--color-primary-strong);
	color: #fff;
	transform: translateY(-1px);
}

.menu-toggle {
	display: none;
	width: 42px;
	height: 42px;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-sm);
	background: var(--color-surface);
	cursor: pointer;
	padding: 0.55rem;
}

.menu-toggle span:not(.sr-only) {
	display: block;
	height: 2px;
	margin: 5px 0;
	background: var(--color-text);
	border-radius: 999px;
}

@media (max-width: 960px) {
	.site-header {
		margin-bottom: var(--space-3);
		border-radius: 0;
		padding: var(--space-3);
	}

	.menu-toggle {
		display: block;
	}

	.main-nav {
		display: none;
		position: absolute;
		inset: calc(100% - 1px) var(--space-3) auto;
		padding: var(--space-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		box-shadow: var(--shadow-md);
		align-items: stretch;
		flex-direction: column;
	}

	.main-nav.open {
		display: flex;
	}

	.main-nav a,
	.login {
		width: 100%;
		justify-content: flex-start;
	}
}
</style>
