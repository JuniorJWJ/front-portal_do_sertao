<template>
	<section class="featured" aria-labelledby="featured-authors-title">
		<h2 id="featured-authors-title">Autores em Destaque</h2>
		<p class="muted">
			Conheça alguns autores cadastrados no Portal Literário do Sertão.
		</p>

		<div v-if="loading" class="cards">
			<div v-for="item in 4" :key="item" class="card skeleton-card">
				<span class="avatar skeleton"></span>
				<span class="line skeleton"></span>
			</div>
		</div>

		<div v-else-if="authors.length === 0" class="status-box">
			Nenhum autor cadastrado ainda.
		</div>

		<template v-else>
			<div class="cards">
				<button
					v-for="author in displayedAuthors"
					:key="author.id"
					type="button"
					class="card"
					@click="openAuthor(author.id)"
				>
					<img
						class="avatar"
						:src="author.endereco_foto"
						:alt="`Foto de ${author.nome}`"
						loading="lazy"
					/>
					<strong>{{ author.nome }}</strong>
					<small>{{ author.profissao || 'Autor' }}</small>
				</button>
			</div>
			<div v-if="hasMore" class="load-more">
				<button type="button" class="ui-button secondary" @click="loadMore">
					Carregar mais autores
				</button>
			</div>
		</template>
	</section>
</template>

<script>
import { api } from '../../../services/api'

const PAGE_SIZE = 4

export default {
	name: 'FeaturedAuthorsSection',
	data() {
		return {
			authors: [],
			visibleCount: PAGE_SIZE,
			loading: true,
		}
	},
	computed: {
		displayedAuthors() {
			return this.authors.slice(0, this.visibleCount)
		},
		hasMore() {
			return this.visibleCount < this.authors.length
		},
	},
	methods: {
		async getAuthors() {
			this.loading = true

			try {
				const res = await api.get('/lista_autor')
				this.authors = res.data?.autor || []
			} catch (error) {
				console.error(error)
				this.authors = []
			} finally {
				this.loading = false
			}
		},
		loadMore() {
			this.visibleCount += PAGE_SIZE
		},
		openAuthor(id) {
			this.$router.push({ name: 'AutorShow', params: { id } })
		},
	},
	mounted() {
		this.getAuthors()
	},
}
</script>

<style scoped>
.featured {
	padding: clamp(2.5rem, 6vw, 4rem) var(--space-4);
	text-align: center;
	border-radius: var(--radius-lg);
	background: var(--color-surface-muted);
}

.featured h2 {
	margin: 0 0 var(--space-2);
	font-size: clamp(1.5rem, 3.2vw, 2.2rem);
	font-weight: 800;
	color: var(--color-text);
}

.featured > p {
	margin: 0 0 var(--space-5);
	font-size: 1.05rem;
}

.cards {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
	gap: var(--space-3);
	max-width: 980px;
	margin: 0 auto;
}

.card {
	display: grid;
	justify-items: center;
	gap: var(--space-2);
	padding: var(--space-4);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface);
	color: var(--color-text);
	box-shadow: var(--shadow-sm);
	cursor: pointer;
	transition:
		transform 160ms ease,
		border-color 160ms ease,
		box-shadow 160ms ease;
}

.card:hover {
	transform: translateY(-2px);
	border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
	box-shadow: var(--shadow-md);
}

.card small {
	color: var(--color-muted);
}

.avatar {
	width: 84px;
	height: 84px;
	border-radius: 999px;
	object-fit: cover;
}

.line {
	display: block;
	width: 60%;
	height: 14px;
	border-radius: 999px;
}

.skeleton-card {
	cursor: default;
}

.load-more {
	margin-top: var(--space-5);
}
</style>
