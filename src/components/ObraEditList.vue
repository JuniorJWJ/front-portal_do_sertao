<template>
	<section class="page-surface" aria-labelledby="obra-admin-title">
		<div class="list-header">
			<div>
				<p class="eyebrow">Administração</p>
				<h1 id="obra-admin-title" class="page-title">Gerenciar obras</h1>
				<p class="muted">
					Aprove, edite ou exclua obras enviadas pelos autores.
				</p>
			</div>
		</div>

		<p v-if="feedback" class="notice error" role="alert">{{ feedback }}</p>

		<div v-if="loading" class="status-box">Carregando obras...</div>
		<div v-else-if="obras.length === 0" class="status-box">
			Nenhuma obra cadastrada.
		</div>

		<div v-else class="table-wrapper">
			<table class="data-table">
				<thead>
					<tr>
						<th scope="col">Código</th>
						<th scope="col">Nome</th>
						<th scope="col">Status</th>
						<th scope="col">Ações</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in obras" :key="item.id">
						<th scope="row">{{ item.id }}</th>
						<td>{{ item.nome }}</td>
						<td>
							<span
								class="badge"
								:class="item.aprovado === 1 ? 'success' : 'pending'"
							>
								{{ item.aprovado === 1 ? 'Aprovada' : 'Pendente' }}
							</span>
						</td>
						<td>
							<div class="table-actions">
								<a
									class="ui-button secondary small"
									:href="item.endereco_pdf"
									target="_blank"
									rel="noopener noreferrer"
								>
									Acessar
								</a>
								<button
									type="button"
									class="ui-button secondary small"
									@click="editObra(item.id)"
								>
									Editar
								</button>
								<button
									v-if="item.aprovado !== 1"
									type="button"
									class="ui-button small"
									:disabled="actingId === item.id"
									@click="approveObra(item.id)"
								>
									Aprovar
								</button>
								<button
									type="button"
									class="ui-button danger small"
									:disabled="actingId === item.id"
									@click="deleteObra(item)"
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
	name: 'ObraEditList',
	data() {
		return {
			obras: [],
			loading: true,
			feedback: '',
			actingId: null,
		}
	},
	methods: {
		async getObras() {
			this.loading = true

			try {
				const res = await api.get('/lista_obra_adm', getAuthConfig())
				this.obras = res.data?.obra || []
			} catch (error) {
				console.error(error)
				this.obras = []
				this.feedback = 'Não foi possível carregar as obras.'
			} finally {
				this.loading = false
			}
		},
		async deleteObra(obra) {
			const confirmed = window.confirm(
				`Excluir a obra "${obra.nome}"? Essa ação não pode ser desfeita.`
			)
			if (!confirmed) return

			this.feedback = ''
			this.actingId = obra.id

			try {
				await api.delete(`/obra/delete/${obra.id}`, getAuthConfig())
				await this.getObras()
			} catch (error) {
				console.error(error)
				this.feedback = 'Não foi possível excluir a obra.'
			} finally {
				this.actingId = null
			}
		},
		async approveObra(id) {
			this.feedback = ''
			this.actingId = id

			try {
				await api.patch(`/obra/approv/${id}`, null, getAuthConfig())
				await this.getObras()
			} catch (error) {
				console.error(error)
				this.feedback = 'Não foi possível aprovar a obra.'
			} finally {
				this.actingId = null
			}
		},
		editObra(id) {
			this.$router.push({ name: 'ObraEditView', params: { id } })
		},
	},
	mounted() {
		this.getObras()
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
</style>
