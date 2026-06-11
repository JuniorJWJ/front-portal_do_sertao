<template>
	<section class="page-surface author-detail" aria-labelledby="autor-title">
		<div v-if="loading" class="status-box">Carregando autor...</div>
		<div v-else-if="errorMessage" class="status-box" role="alert">
			{{ errorMessage }}
		</div>
		<template v-else>
			<header class="author-header">
				<img
					:src="autor.endereco_foto"
					:alt="`Foto de ${autor.nome}`"
					loading="lazy"
				/>
				<div>
					<p class="eyebrow">Autor</p>
					<h1 id="autor-title" class="page-title">{{ autor.nome }}</h1>
					<p class="muted">{{ autor.profissao }} · {{ cidadeNome }}</p>
				</div>
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

			<section class="works-section" aria-labelledby="obras-title">
				<h2 id="obras-title">Obras publicadas</h2>
				<div v-if="obras.obra.length === 0" class="status-box">
					Nenhuma obra publicada.
				</div>
				<div v-else class="works-grid">
					<button
						v-for="obra in obras.obra"
						:key="obra.id"
						type="button"
						class="work-card"
						@click="show_obra(obra.id)"
					>
						{{ obra.nome }}
					</button>
				</div>
			</section>
		</template>
	</section>
</template>

<script>
import { api } from '../services/api'

export default {
	name: 'AutorShow',
	data() {
		return {
			id: this.$route.params.id,
			autor: {},
			cidadeNome: '',
			obras: { obra: [] },
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
				this.autor = res.data.autor[0]
				await Promise.all([
					this.getCidade(this.autor.id_cidade),
					this.getObras(this.autor.id),
				])
			} catch (error) {
				console.log(error)
				this.errorMessage = 'Nao foi possivel carregar este autor.'
			} finally {
				this.loading = false
			}
		},
		async getCidade(id) {
			const res = await api.get(`/cidade/${id}`)
			this.cidadeNome = res.data.cidade[0].nome
		},
		async getObras(id) {
			try {
				const res = await api.get(`/lista_obra/autor/${id}`)
				this.obras = res.data || { obra: [] }
			} catch (error) {
				console.log(error)
				this.obras = { obra: [] }
			}
		},
		show_obra(id) {
			this.$router.push({ name: 'ObraShow', params: { id } })
		},
	},
	mounted() {
		this.getAutor(this.$route.params.id)
	},
}
</script>

<style scoped>
.author-detail {
	display: grid;
	gap: var(--space-6);
}

.author-header {
	display: flex;
	align-items: center;
	gap: var(--space-5);
}

.author-header img {
	width: clamp(96px, 18vw, 160px);
	height: clamp(96px, 18vw, 160px);
	border-radius: var(--radius-lg);
	object-fit: cover;
	box-shadow: var(--shadow-sm);
}

.eyebrow {
	margin: 0 0 var(--space-2);
	color: var(--color-primary);
	font-size: 0.78rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.info-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: var(--space-3);
}

.info-grid article,
.work-card {
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
	color: var(--color-text);
}

.works-section h2 {
	margin: 0 0 var(--space-3);
	font-size: 1.15rem;
}

.works-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: var(--space-3);
}

.work-card {
	width: 100%;
	min-height: 74px;
	color: var(--color-text);
	text-align: left;
	cursor: pointer;
	transition:
		transform 160ms ease,
		border-color 160ms ease,
		box-shadow 160ms ease;
}

.work-card:hover {
	transform: translateY(-2px);
	border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
	box-shadow: var(--shadow-md);
}

@media (max-width: 720px) {
	.author-header {
		align-items: flex-start;
		flex-direction: column;
	}

	.info-grid {
		grid-template-columns: 1fr;
	}
}
</style>
