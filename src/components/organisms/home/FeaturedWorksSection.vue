<template>
	<section class="featured" aria-labelledby="featured-works-title">
		<h2 id="featured-works-title">Obras Disponíveis</h2>
		<p class="muted">
			Uma seleção de obras literárias disponíveis para consulta e leitura.
		</p>

		<div v-if="loading" class="cards">
			<div v-for="item in 5" :key="item" class="card skeleton-card">
				<span class="line skeleton"></span>
				<span class="short-line skeleton"></span>
			</div>
		</div>

		<div v-else-if="works.length === 0" class="status-box">
			Nenhuma obra publicada ainda.
		</div>

		<template v-else>
			<div class="cards">
				<button
					v-for="work in displayedWorks"
					:key="work.id"
					type="button"
					class="card"
					@click="openWork(work.id)"
				>
					<strong>{{ work.nome }}</strong>
					<small>Ver detalhes da obra</small>
				</button>
			</div>
			<div v-if="hasMore" class="load-more">
				<button type="button" class="ui-button secondary" @click="loadMore">
					Carregar mais obras
				</button>
			</div>
		</template>
	</section>
</template>

<script>
import { api } from '../../../services/api'

const PAGE_SIZE = 5

export default {
	name: 'FeaturedWorksSection',
	data() {
		return {
			works: [],
			visibleCount: PAGE_SIZE,
			loading: true,
		}
	},
	computed: {
		displayedWorks() {
			return this.works.slice(0, this.visibleCount)
		},
		hasMore() {
			return this.visibleCount < this.works.length
		},
	},
	methods: {
		async getWorks() {
			this.loading = true

			try {
				const res = await api.get('/lista_obra')
				this.works = res.data?.obra || []
			} catch (error) {
				console.error(error)
				this.works = []
			} finally {
				this.loading = false
			}
		},
		loadMore() {
			this.visibleCount += PAGE_SIZE
		},
		openWork(id) {
			this.$router.push({ name: 'ObraShow', params: { id } })
		},
	},
	mounted() {
		this.getWorks()
	},
}
</script>

<style scoped>
.featured {
	padding: clamp(2.5rem, 6vw, 4rem) var(--space-4);
	text-align: center;
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
	grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
	gap: var(--space-3);
	max-width: 980px;
	margin: 0 auto;
	text-align: left;
}

.card {
	display: grid;
	gap: var(--space-2);
	min-height: 96px;
	padding: var(--space-4);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface);
	color: var(--color-text);
	text-align: left;
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

.line,
.short-line {
	display: block;
	height: 14px;
	border-radius: 999px;
}

.line {
	width: 75%;
}

.short-line {
	width: 45%;
}

.skeleton-card {
	align-content: center;
	cursor: default;
}

.load-more {
	margin-top: var(--space-5);
}
</style>
