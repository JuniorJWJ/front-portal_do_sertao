<template>
	<section class="page-surface" aria-labelledby="minhas-obras-title">
		<div class="list-header">
			<PageHeader
				eyebrow="Minhas obras"
				title="Obras enviadas"
				title-id="minhas-obras-title"
				description="Acompanhe o status de aprovação e gerencie suas obras."
			/>
			<router-link class="ui-button" to="/register_obra">
				Cadastrar nova obra
			</router-link>
		</div>

		<p v-if="feedback" class="notice error" role="alert">{{ feedback }}</p>

		<div v-if="!loading && obras.length === 0" class="status-box">
			Você ainda não enviou nenhuma obra.
		</div>

		<div v-if="loading || obras.length > 0" class="table-wrapper">
			<table class="data-table">
				<thead>
					<tr>
						<th scope="col">Nome</th>
						<th scope="col">Status</th>
						<th scope="col">Ações</th>
					</tr>
				</thead>
				<tbody v-if="loading">
					<tr v-for="i in 5" :key="i">
						<td><span class="skeleton skel-text"></span></td>
						<td><span class="skeleton skel-badge"></span></td>
						<td>
							<div class="table-actions">
								<span class="skeleton skel-btn"></span>
								<span class="skeleton skel-btn"></span>
								<span class="skeleton skel-btn"></span>
							</div>
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr v-for="item in obras" :key="item.id">
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
import { getCurrentUser } from '../../services/auth'
import { api, getAuthConfig } from '../../services/api'
import StatusBadge from '../atoms/StatusBadge.vue'
import ConfirmDialog from '../molecules/ConfirmDialog.vue'
import PageHeader from '../molecules/PageHeader.vue'

export default {
	name: 'MinhasObras',
	components: { ConfirmDialog, PageHeader, StatusBadge },
	data() {
		return {
			obras: [],
			userId: getCurrentUser()?.id ?? null,
			loading: true,
			feedback: '',
			actingId: null,
		}
	},
	methods: {
		async getObras() {
			this.loading = true

			try {
				const res = await api.get(`/lista_obra/autor/${this.userId}`)
				this.obras = res.data?.obra || []
			} catch (error) {
				console.error(error)
				this.obras = []
				this.feedback = 'Não foi possível carregar suas obras.'
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
		editObra(id) {
			this.$router.push({ name: 'ObraEditByOwnerView', params: { id } })
		},
	},
	mounted() {
		if (!this.userId) {
			this.$router.push({ name: 'LogUserView' })
			return
		}
		this.getObras()
	},
}
</script>

<style scoped>
.list-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: var(--space-4);
	flex-wrap: wrap;
	margin-bottom: var(--space-5);
}

.notice {
	margin-bottom: var(--space-4);
}
</style>
