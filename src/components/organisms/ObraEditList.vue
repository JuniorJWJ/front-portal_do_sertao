<template>
	<section class="page-surface" aria-labelledby="obra-admin-title">
		<PageHeader
			class="list-header"
			eyebrow="Administração"
			title="Gerenciar obras"
			title-id="obra-admin-title"
			description="Aprove, edite ou exclua obras enviadas pelos autores."
		/>

		<p v-if="feedback" class="notice error" role="alert">{{ feedback }}</p>

		<div v-if="!loading && obras.length === 0" class="status-box">
			Nenhuma obra cadastrada.
		</div>

		<div v-if="loading || obras.length > 0" class="table-wrapper">
			<table class="data-table">
				<thead>
					<tr>
						<th scope="col">Código</th>
						<th scope="col">Nome</th>
						<th scope="col">Status</th>
						<th scope="col">Ações</th>
					</tr>
				</thead>
				<tbody v-if="loading">
					<tr v-for="i in 5" :key="i">
						<th scope="row"><span class="skeleton skel-text short"></span></th>
						<td><span class="skeleton skel-text medium"></span></td>
						<td><span class="skeleton skel-badge"></span></td>
						<td>
							<div class="table-actions">
								<span class="skeleton skel-btn"></span>
								<span class="skeleton skel-btn"></span>
								<span class="skeleton skel-btn"></span>
								<span class="skeleton skel-btn"></span>
							</div>
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr v-for="item in obras" :key="item.id">
						<th scope="row">{{ item.id }}</th>
						<td>{{ item.nome }}</td>
						<td>
							<StatusBadge
								:approved="item.aprovado === 1"
								approved-label="Aprovada"
							/>
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

		<ConfirmDialog ref="confirm" />
	</section>
</template>

<script>
import { api, getAuthConfig } from '../../services/api'
import StatusBadge from '../atoms/StatusBadge.vue'
import ConfirmDialog from '../molecules/ConfirmDialog.vue'
import PageHeader from '../molecules/PageHeader.vue'

export default {
	name: 'ObraEditList',
	components: { ConfirmDialog, PageHeader, StatusBadge },
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
			const confirmed = await this.$refs.confirm.ask({
				title: 'Excluir obra',
				message: `Excluir a obra "${obra.nome}"? Essa ação não pode ser desfeita.`,
			})
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
