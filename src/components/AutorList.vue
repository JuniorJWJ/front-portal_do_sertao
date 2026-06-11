<template>
	<section class="page-surface directory-page" aria-labelledby="autores-title">
		<div class="directory-header">
			<div>
				<p class="eyebrow">Catalogo</p>
				<h1 id="autores-title" class="page-title">Autores</h1>
				<p class="muted">Explore autores aprovados por cidade ou nome.</p>
			</div>
			<label class="search-field" for="autor-search">
				<span>Buscar autor</span>
				<input
					id="autor-search"
					v-model="searchQuery"
					class="form-control"
					type="search"
					placeholder="Digite o nome do autor"
				/>
			</label>
		</div>

		<div class="directory-layout">
			<aside class="filter-panel" aria-label="Filtro por cidade">
				<h2>Cidades</h2>
				<button
					type="button"
					class="filter-option"
					:class="{ active: activeFilterOption === '' }"
					@click="clearFilter"
				>
					Todas
				</button>
				<button
					v-for="cidade in Cidade.cidade"
					:key="cidade.id"
					type="button"
					class="filter-option"
					:class="{ active: activeFilterOption === cidade.id }"
					@click="toggleFilterOption(cidade.id)"
				>
					{{ cidade.nome }}
				</button>
			</aside>

			<div class="results-panel" aria-live="polite">
				<div v-if="loading" class="results-grid">
					<div v-for="item in 4" :key="item" class="author-card skeleton-card">
						<span class="avatar skeleton"></span>
						<span class="line skeleton"></span>
					</div>
				</div>

				<div v-else-if="errorMessage" class="status-box" role="alert">
					{{ errorMessage }}
					<button type="button" class="ui-button secondary" @click="getAutores">
						Tentar novamente
					</button>
				</div>

				<div v-else-if="resultQuery.length === 0" class="status-box">
					Nenhum autor encontrado.
				</div>

				<div v-else class="results-grid">
					<button
						v-for="autor in resultQuery"
						:key="autor.id"
						type="button"
						class="author-card"
						@click="show_autor(autor.id)"
					>
						<img
							:src="autor.endereco_foto"
							:alt="`Foto de ${autor.nome}`"
							loading="lazy"
						/>
						<span>
							<strong>{{ autor.nome }}</strong>
							<small>{{ autor.profissao || 'Autor' }}</small>
						</span>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { api } from '../services/api'

export default {
	name: 'AutorList',
	data() {
		return {
			autores: { autor: [] },
			searchQuery: '',
			activeFilterOption: '',
			Cidade: { cidade: [] },
			loading: true,
			errorMessage: '',
		}
	},
	methods: {
		async getAutores() {
			this.loading = true
			this.errorMessage = ''

			try {
				const res = await api.get('/lista_autor')
				this.autores = res.data || { autor: [] }
			} catch (error) {
				console.log(error)
				this.autores = { autor: [] }
				this.errorMessage = 'Nao foi possivel carregar os autores.'
			} finally {
				this.loading = false
			}
		},
		async getAutorFiltroCidade(id) {
			this.loading = true
			this.errorMessage = ''

			try {
				const res = await api.get(`/lista_autor/cidade/${id}`)
				this.autores = res.data || { autor: [] }
			} catch (error) {
				console.log(error)
				this.autores = { autor: [] }
				this.errorMessage = 'Nenhum autor encontrado para esta cidade.'
			} finally {
				this.loading = false
			}
		},
		async getCidades() {
			try {
				const res = await api.get('/lista_cidade')
				this.Cidade = res.data || { cidade: [] }
			} catch (error) {
				console.log(error)
				this.Cidade = { cidade: [] }
			}
		},
		show_autor(id) {
			this.$router.push({ name: 'AutorShow', params: { id } })
		},
		clearFilter() {
			this.activeFilterOption = ''
			this.getAutores()
		},
		toggleFilterOption(itemId) {
			if (this.activeFilterOption === itemId) {
				this.clearFilter()
				return
			}

			this.activeFilterOption = itemId
			this.getAutorFiltroCidade(itemId)
		},
	},
	mounted() {
		this.getAutores()
		this.getCidades()
	},
	computed: {
		resultQuery() {
			const autores = this.autores.autor || []
			const query = this.searchQuery.trim().toLowerCase()

			if (!query) {
				return autores
			}

			return autores.filter((item) =>
				query.split(' ').every((value) => item.nome.toLowerCase().includes(value))
			)
		},
	},
}
</script>

<style scoped>
.directory-page {
	display: flex;
	flex-direction: column;
	gap: var(--space-6);
}

.directory-header {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
	gap: var(--space-5);
	align-items: end;
}

.eyebrow {
	margin: 0 0 var(--space-2);
	color: var(--color-primary);
	font-size: 0.78rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.search-field {
	display: grid;
	gap: var(--space-2);
	color: var(--color-muted);
	font-weight: 700;
}

.directory-layout {
	display: grid;
	grid-template-columns: 260px minmax(0, 1fr);
	gap: var(--space-5);
	align-items: start;
}

.filter-panel {
	position: sticky;
	top: 112px;
	display: grid;
	gap: var(--space-2);
	padding: var(--space-3);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface-muted);
}

.filter-panel h2 {
	margin: 0 0 var(--space-2);
	font-size: 0.9rem;
	color: var(--color-muted);
	text-transform: uppercase;
}

.filter-option {
	width: 100%;
	min-height: 40px;
	padding: 0.55rem 0.7rem;
	border: 0;
	border-radius: var(--radius-sm);
	background: transparent;
	color: var(--color-text);
	text-align: left;
	cursor: pointer;
}

.filter-option:hover,
.filter-option.active {
	background: var(--color-surface);
	color: var(--color-primary-strong);
	box-shadow: var(--shadow-sm);
}

.results-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	gap: var(--space-3);
}

.author-card {
	display: flex;
	align-items: center;
	gap: var(--space-3);
	width: 100%;
	min-height: 86px;
	padding: var(--space-3);
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

.author-card:hover {
	transform: translateY(-2px);
	border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
	box-shadow: var(--shadow-md);
}

.author-card img,
.avatar {
	width: 56px;
	height: 56px;
	border-radius: var(--radius-sm);
	object-fit: cover;
	flex: 0 0 auto;
}

.author-card strong,
.author-card small {
	display: block;
}

.author-card small {
	color: var(--color-muted);
	margin-top: var(--space-1);
}

.line {
	width: 55%;
	height: 16px;
	border-radius: 999px;
}

.skeleton-card {
	cursor: default;
}

@media (max-width: 820px) {
	.directory-header,
	.directory-layout {
		grid-template-columns: 1fr;
	}

	.filter-panel {
		position: static;
		display: flex;
		overflow-x: auto;
	}

	.filter-panel h2 {
		display: none;
	}

	.filter-option {
		flex: 0 0 auto;
		width: auto;
	}
}
</style>
