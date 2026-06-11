<template>
	<section class="page-surface directory-page" aria-labelledby="obras-title">
		<div class="directory-header">
			<div>
				<p class="eyebrow">Biblioteca</p>
				<h1 id="obras-title" class="page-title">Obras</h1>
				<p class="muted">Filtre por genero literario ou pesquise pelo titulo.</p>
			</div>
			<label class="search-field" for="obra-search">
				<span>Buscar obra</span>
				<input
					id="obra-search"
					v-model="searchQuery"
					class="form-control"
					type="search"
					placeholder="Pesquisar obra"
				/>
			</label>
		</div>

		<div class="directory-layout">
			<aside class="filter-panel" aria-label="Filtro por genero literario">
				<h2>Generos</h2>
				<button
					type="button"
					class="filter-option"
					:class="{ active: activeFilterOption === '' }"
					@click="clearFilter"
				>
					Todos
				</button>
				<button
					v-for="genero in GenerosLiterarios.generoLiterario"
					:key="genero.id"
					type="button"
					class="filter-option"
					:class="{ active: activeFilterOption === genero.id }"
					@click="toggleFilterOption(genero.id)"
				>
					{{ genero.nome }}
				</button>
			</aside>

			<div class="results-panel" aria-live="polite">
				<div v-if="loading" class="results-grid">
					<div v-for="item in 6" :key="item" class="work-card skeleton-card">
						<span class="line skeleton"></span>
						<span class="short-line skeleton"></span>
					</div>
				</div>

				<div v-else-if="errorMessage" class="status-box" role="alert">
					{{ errorMessage }}
					<button type="button" class="ui-button secondary" @click="getObras">
						Tentar novamente
					</button>
				</div>

				<div v-else-if="resultQuery.length === 0" class="status-box">
					Nenhuma obra encontrada.
				</div>

				<div v-else class="results-grid">
					<button
						v-for="obra in resultQuery"
						:key="obra.id"
						type="button"
						class="work-card"
						@click="show_obra(obra.id)"
					>
						<span>
							<strong>{{ obra.nome }}</strong>
							<small>Ver detalhes da obra</small>
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
	name: 'ObraList',
	data() {
		return {
			obras: { obra: [] },
			searchQuery: '',
			activeFilterOption: '',
			GenerosLiterarios: { generoLiterario: [] },
			loading: true,
			errorMessage: '',
		}
	},
	methods: {
		async getObras() {
			this.loading = true
			this.errorMessage = ''

			try {
				const res = await api.get('/lista_obra')
				this.obras = res.data || { obra: [] }
			} catch (error) {
				console.log(error)
				this.obras = { obra: [] }
				this.errorMessage = 'Nao foi possivel carregar as obras.'
			} finally {
				this.loading = false
			}
		},
		async getObrasFiltroGenero(id) {
			this.loading = true
			this.errorMessage = ''

			try {
				const res = await api.get(`/lista_obra/genero/${id}`)
				this.obras = res.data || { obra: [] }
			} catch (error) {
				console.log(error)
				this.obras = { obra: [] }
				this.errorMessage = 'Nenhuma obra encontrada para este genero.'
			} finally {
				this.loading = false
			}
		},
		async getGenerosLiterarios() {
			try {
				const res = await api.get('/lista_generos_literarios')
				this.GenerosLiterarios = res.data || { generoLiterario: [] }
			} catch (error) {
				console.log(error)
				this.GenerosLiterarios = { generoLiterario: [] }
			}
		},
		show_obra(id) {
			this.$router.push({ name: 'ObraShow', params: { id } })
		},
		clearFilter() {
			this.activeFilterOption = ''
			this.getObras()
		},
		toggleFilterOption(itemId) {
			if (this.activeFilterOption === itemId) {
				this.clearFilter()
				return
			}

			this.activeFilterOption = itemId
			this.getObrasFiltroGenero(itemId)
		},
	},
	mounted() {
		this.getObras()
		this.getGenerosLiterarios()
	},
	computed: {
		resultQuery() {
			const obras = this.obras.obra || []
			const query = this.searchQuery.trim().toLowerCase()

			if (!query) {
				return obras
			}

			return obras.filter((item) =>
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

.work-card {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-height: 110px;
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

.work-card::after {
	content: "Abrir";
	color: var(--color-primary);
	font-size: 0.8rem;
	font-weight: 800;
}

.work-card:hover {
	transform: translateY(-2px);
	border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
	box-shadow: var(--shadow-md);
}

.work-card strong,
.work-card small {
	display: block;
}

.work-card small {
	margin-top: var(--space-2);
	color: var(--color-muted);
}

.line,
.short-line {
	display: block;
	height: 16px;
	border-radius: 999px;
}

.line {
	width: 70%;
}

.short-line {
	width: 42%;
}

.skeleton-card {
	display: grid;
	align-content: center;
	gap: var(--space-3);
	cursor: default;
}

.skeleton-card::after {
	content: "";
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
