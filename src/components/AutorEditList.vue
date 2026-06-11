<template>
	<section class="page-surface" aria-labelledby="autor-admin-title">
		<div class="list-header">
			<div>
				<p class="eyebrow">Administração</p>
				<h1 id="autor-admin-title" class="page-title">Gerenciar autores</h1>
				<p class="muted">
					Aprove, edite ou exclua cadastros de autores.
				</p>
			</div>
		</div>

		<p v-if="feedback" class="notice error" role="alert">{{ feedback }}</p>

		<div v-if="loading" class="status-box">Carregando autores...</div>
		<div v-else-if="autores.length === 0" class="status-box">
			Nenhum autor cadastrado.
		</div>

		<div v-else class="table-wrapper">
			<table class="data-table">
				<thead>
					<tr>
						<th scope="col">Código</th>
						<th scope="col">Autor</th>
						<th scope="col">Status</th>
						<th scope="col">Ações</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in autores" :key="item.id">
						<th scope="row">{{ item.id }}</th>
						<td>
							<div class="author-cell">
								<img
									:src="item.endereco_foto"
									:alt="`Foto de ${item.nome}`"
									loading="lazy"
								/>
								<span>{{ item.nome }}</span>
							</div>
						</td>
						<td>
							<span
								class="badge"
								:class="item.aprovado === 1 ? 'success' : 'pending'"
							>
								{{ item.aprovado === 1 ? 'Aprovado' : 'Pendente' }}
							</span>
						</td>
						<td>
							<div class="table-actions">
								<button
									type="button"
									class="ui-button secondary small"
									@click="editAutor(item.id)"
								>
									Editar
								</button>
								<button
									v-if="item.aprovado !== 1"
									type="button"
									class="ui-button small"
									:disabled="actingId === item.id"
									@click="approveAutor(item.id)"
								>
									Aprovar
								</button>
								<button
									type="button"
									class="ui-button danger small"
									:disabled="actingId === item.id"
									@click="deleteAutor(item)"
								>
									Excluir
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script>
import { api, getAuthConfig } from '../services/api'

export default {
	name: 'AutorEditList',
	data() {
		return {
			autores: [],
			loading: true,
			feedback: '',
			actingId: null,
		}
	},
	methods: {
		async getAutores() {
			this.loading = true

			try {
				const res = await api.get('/lista_autor_adm', getAuthConfig())
				this.autores = res.data?.autor || []
			} catch (error) {
				console.error(error)
				this.autores = []
				this.feedback = 'Não foi possível carregar os autores.'
			} finally {
				this.loading = false
			}
		},
		async deleteAutor(autor) {
			const confirmed = window.confirm(
				`Excluir o autor "${autor.nome}"? Essa ação não pode ser desfeita.`
			)
			if (!confirmed) return

			this.feedback = ''
			this.actingId = autor.id

			try {
				await api.delete(`/autor/delete/${autor.id}`, getAuthConfig())
				await this.getAutores()
			} catch (error) {
				console.error(error)
				this.feedback = 'Não foi possível excluir o autor.'
			} finally {
				this.actingId = null
			}
		},
		async approveAutor(id) {
			this.feedback = ''
			this.actingId = id

			try {
				await api.patch(`/autor/approv/${id}`, null, getAuthConfig())
				await this.getAutores()
			} catch (error) {
				console.error(error)
				this.feedback = 'Não foi possível aprovar o autor.'
			} finally {
				this.actingId = null
			}
		},
		editAutor(id) {
			this.$router.push({ name: 'AutorEditView', params: { id } })
		},
	},
	mounted() {
		this.getAutores()
	},
}
</script>

<style scoped>
.list-header {
	margin-bottom: var(--space-5);
}

.notice {
	margin-bottom: var(--space-4);
}

.author-cell {
	display: flex;
	align-items: center;
	gap: var(--space-3);
}

.author-cell img {
	width: 44px;
	height: 44px;
	border-radius: 999px;
	object-fit: cover;
	flex: 0 0 auto;
}
</style>
