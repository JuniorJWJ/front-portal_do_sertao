<template>
	<section class="page-surface profile" aria-labelledby="perfil-title">
		<div v-if="loading" class="status-box">Carregando perfil...</div>
		<div v-else-if="errorMessage" class="status-box" role="alert">
			{{ errorMessage }}
		</div>

		<template v-else>
			<header class="profile-header">
				<img
					:src="autor.endereco_foto"
					:alt="`Foto de ${autor.nome}`"
					loading="lazy"
				/>
				<div>
					<p class="eyebrow">Minha conta</p>
					<h1 id="perfil-title" class="page-title">{{ autor.nome }}</h1>
					<p class="muted">{{ autor.profissao }} · {{ cidadeNome }}</p>
				</div>
				<router-link class="ui-button secondary" to="/edit_perfil">
					Editar perfil
				</router-link>
			</header>

			<div class="info-grid">
				<article>
					<span>Email</span>
					<strong>{{ autor.email }}</strong>
				</article>
				<article>
					<span>Cidade</span>
					<strong>{{ cidadeNome }}</strong>
				</article>
				<article class="bio">
					<span>Biografia</span>
					<p>{{ autor.biografia }}</p>
				</article>
			</div>
		</template>
	</section>
</template>

<script>
import { getCurrentUser } from '../services/auth'
import { api } from '../services/api'

export default {
	name: 'PerfilAutor',
	data() {
		return {
			autor: {},
			cidadeNome: '',
			loading: true,
			errorMessage: '',
		}
	},
	methods: {
		async getAutor(id) {
			this.loading = true
			this.errorMessage = ''

			try {
				const res = await api.get(`/autor/${id}`)
				this.autor = res.data?.autor?.[0] || {}
				if (this.autor.id_cidade) {
					await this.getCidade(this.autor.id_cidade)
				}
			} catch (error) {
				console.error(error)
				this.errorMessage = 'Não foi possível carregar seu perfil.'
			} finally {
				this.loading = false
			}
		},
		async getCidade(id) {
			try {
				const res = await api.get(`/cidade/${id}`)
				this.cidadeNome = res.data?.cidade?.[0]?.nome || ''
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

		this.getAutor(currentUser.id)
	},
}
</script>

<style scoped>
.profile {
	display: grid;
	gap: var(--space-5);
}

.profile-header {
	display: flex;
	align-items: center;
	gap: var(--space-5);
	flex-wrap: wrap;
}

.profile-header > div {
	flex: 1;
	min-width: 200px;
}

.profile-header img {
	width: clamp(84px, 14vw, 132px);
	height: clamp(84px, 14vw, 132px);
	border-radius: 999px;
	object-fit: cover;
	box-shadow: var(--shadow-sm);
}

.info-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: var(--space-3);
}

.info-grid article {
	padding: var(--space-4);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface);
	box-shadow: var(--shadow-sm);
}

.info-grid span {
	display: block;
	margin-bottom: var(--space-1);
	color: var(--color-muted);
	font-size: 0.85rem;
	font-weight: 800;
	text-transform: uppercase;
}

.bio {
	grid-column: 1 / -1;
}

.bio p {
	margin: 0;
	line-height: 1.7;
}

@media (max-width: 720px) {
	.info-grid {
		grid-template-columns: 1fr;
	}
}
</style>
