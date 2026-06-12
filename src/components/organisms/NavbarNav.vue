<template>
	<header class="site-header">
		<router-link class="brand" to="/" aria-label="Portal do Sertão - Home">
			<img src="../../assets/logo-4.png" alt="Portal do Sertão" />
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
			aria-label="Navegação principal"
		>
			<router-link
				v-for="item in visibleNavItems"
				:key="item.to"
				:to="item.to"
				@click="closeMenu"
			>
				{{ item.label }}
			</router-link>

			<button
				class="icon-btn"
				type="button"
				:aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
				:aria-pressed="isDark"
				@click="toggleTheme"
			>
				<AppIcon :name="isDark ? 'sun' : 'moon'" :size="18" />
			</button>

			<router-link
				v-if="!token"
				class="login"
				to="/log_user"
				@click="closeMenu"
			>
				Login
			</router-link>

			<div v-else ref="userMenu" class="user-menu">
				<button
					class="avatar-btn"
					type="button"
					:aria-expanded="dropdownOpen"
					aria-haspopup="true"
					aria-controls="user-dropdown"
					@click="dropdownOpen = !dropdownOpen"
				>
					<span class="avatar" aria-hidden="true">{{ initials }}</span>
					<AppIcon
						name="chevron-down"
						:size="14"
						class="chevron"
						:class="{ rotated: dropdownOpen }"
					/>
				</button>

				<div
					v-if="dropdownOpen"
					id="user-dropdown"
					class="dropdown"
					role="menu"
				>
					<div class="dropdown-header">
						<span class="dropdown-name">{{ userName || 'Usuário' }}</span>
						<span class="dropdown-role">{{ adm ? 'Administrador' : 'Autor' }}</span>
					</div>

					<template v-if="!adm">
						<router-link
							v-for="item in authorDropdownItems"
							:key="item.to"
							:to="item.to"
							class="dropdown-item"
							role="menuitem"
							@click="closeAll"
						>
							{{ item.label }}
						</router-link>
						<hr class="dropdown-divider" />
					</template>

					<button
						class="dropdown-item danger"
						type="button"
						role="menuitem"
						@click="deslogUser"
					>
						<AppIcon name="log-out" :size="16" />
						Sair
					</button>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import { getCurrentUser, getToken, logout } from '../../services/auth'
import AppIcon from '../atoms/AppIcon.vue'

const publicItems = [
	{ to: '/', label: 'Home' },
	{ to: '/list_obra', label: 'Obras' },
	{ to: '/list_autor', label: 'Autores' },
	{ to: '/sobre', label: 'Sobre' },
	{ to: '/dados_autores', label: 'Gráficos' },
]

const adminItems = [
	{ to: '/edit_autor_list', label: 'Editar Autores' },
	{ to: '/create_obra', label: 'Criar Obra' },
	{ to: '/create_autor', label: 'Criar Autor' },
	{ to: '/edit_obra_list', label: 'Editar Obras' },
]

const authorDropdownItems = [
	{ to: '/minhas_obras', label: 'Minhas Obras' },
	{ to: '/perfil', label: 'Perfil' },
	{ to: '/edit_perfil', label: 'Editar Perfil' },
	{ to: '/register_obra', label: 'Registrar Obra' },
]

export default {
	name: 'NavbarNav',
	components: { AppIcon },
	data() {
		const currentUser = getCurrentUser()
		const savedTheme = localStorage.getItem('theme')
		const systemDark =
			window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
		return {
			token: getToken(),
			adm: currentUser?.adm === 1,
			userName: currentUser?.nome || currentUser?.email || '',
			menuOpen: false,
			dropdownOpen: false,
			theme: savedTheme || (systemDark ? 'dark' : 'light'),
		}
	},
	computed: {
		isDark() {
			return this.theme === 'dark'
		},
		initials() {
			const name = this.userName
			if (!name) return '?'
			return name
				.trim()
				.split(/\s+/)
				.slice(0, 2)
				.map((p) => p[0])
				.join('')
				.toUpperCase()
		},
		visibleNavItems() {
			if (!this.token) return publicItems
			return this.adm ? [...publicItems, ...adminItems] : publicItems
		},
		authorDropdownItems() {
			return authorDropdownItems
		},
	},
	watch: {
		$route() {
			this.refreshAuth()
			this.closeAll()
		},
	},
	mounted() {
		document.addEventListener('click', this.onDocumentClick)
	},
	beforeUnmount() {
		document.removeEventListener('click', this.onDocumentClick)
	},
	methods: {
		refreshAuth() {
			const currentUser = getCurrentUser()
			this.token = getToken()
			this.adm = currentUser?.adm === 1
			this.userName = currentUser?.nome || currentUser?.email || ''
		},
		toggleTheme() {
			const next = this.theme === 'dark' ? 'light' : 'dark'
			this.theme = next
			document.documentElement.dataset.theme = next
			localStorage.setItem('theme', next)
		},
		deslogUser() {
			logout()
			this.closeAll()
			this.$router.push({ name: 'LogUserView' })
		},
		closeAll() {
			this.menuOpen = false
			this.dropdownOpen = false
		},
		closeMenu() {
			this.menuOpen = false
		},
		onDocumentClick(event) {
			if (
				this.$refs.userMenu &&
				!this.$refs.userMenu.contains(event.target)
			) {
				this.dropdownOpen = false
			}
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

/* ── Toggle de tema ───────────────────────────────────────────────────── */
.icon-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border: 0;
	border-radius: var(--radius-sm);
	background: transparent;
	color: var(--color-muted);
	cursor: pointer;
	flex-shrink: 0;
	transition:
		background-color 160ms ease,
		color 160ms ease;
}

.icon-btn:hover {
	background: var(--color-primary-soft);
	color: var(--color-primary-strong);
}

/* ── Avatar + dropdown ────────────────────────────────────────────────── */
.user-menu {
	position: relative;
}

.avatar-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
	padding: 0.3rem 0.5rem 0.3rem 0.3rem;
	border: 0;
	border-radius: var(--radius-sm);
	background: transparent;
	color: var(--color-muted);
	cursor: pointer;
	transition: background-color 160ms ease;
}

.avatar-btn:hover {
	background: var(--color-primary-soft);
}

.avatar {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	border-radius: 999px;
	background: var(--color-primary);
	color: #fff;
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.04em;
	flex-shrink: 0;
}

.chevron {
	transition: transform 200ms ease;
}

.chevron.rotated {
	transform: rotate(180deg);
}

.dropdown {
	position: absolute;
	top: calc(100% + 8px);
	right: 0;
	min-width: 200px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-md);
	overflow: hidden;
	z-index: 50;
}

.dropdown-header {
	padding: 0.75rem 1rem;
	border-bottom: 1px solid var(--color-border);
}

.dropdown-name {
	display: block;
	font-weight: 700;
	color: var(--color-text);
	font-size: 0.9rem;
	line-height: 1.3;
}

.dropdown-role {
	display: block;
	font-size: 0.78rem;
	color: var(--color-muted);
	margin-top: 0.1rem;
}

.dropdown-item {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	padding: 0.65rem 1rem;
	border: 0;
	background: transparent;
	color: var(--color-text);
	font-size: 0.9rem;
	font-weight: 500;
	text-decoration: none;
	cursor: pointer;
	transition: background-color 140ms ease;
	text-align: left;
}

.dropdown-item:hover {
	background: var(--color-surface-muted);
}

.dropdown-item.danger {
	color: var(--color-danger);
}

.dropdown-divider {
	margin: 0;
	border: 0;
	border-top: 1px solid var(--color-border);
}

/* ── Hambúrguer ───────────────────────────────────────────────────────── */
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

/* ── Responsivo ───────────────────────────────────────────────────────── */
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

	.icon-btn {
		width: 100%;
		justify-content: flex-start;
		padding: 0.5rem 0.72rem;
		gap: 0.5rem;
		height: auto;
		min-height: 38px;
		border-radius: var(--radius-sm);
		font-size: 0.95rem;
		font-weight: 700;
	}

	.user-menu {
		width: 100%;
	}

	.avatar-btn {
		width: 100%;
		padding: 0.5rem 0.72rem;
		border-radius: var(--radius-sm);
		gap: 0.5rem;
	}

	.dropdown {
		position: static;
		box-shadow: none;
		border: 0;
		border-top: 1px solid var(--color-border);
		border-radius: 0;
		margin-top: var(--space-2);
	}
}
</style>
