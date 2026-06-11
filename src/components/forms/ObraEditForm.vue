<template>
	<section class="form-page" aria-labelledby="obra-edit-title">
		<div v-if="loading" class="status-box">Carregando dados da obra...</div>
		<div v-else-if="loadError" class="status-box" role="alert">
			{{ loadError }}
		</div>

		<form v-else class="form-card" novalidate @submit.prevent="onSubmit">
			<div>
				<p class="eyebrow">Edição</p>
				<h1 id="obra-edit-title" class="page-title">Alterar obra</h1>
			</div>

			<label class="field" for="nome">
				<span>Nome da obra</span>
				<input
					id="nome"
					v-model.trim="obra.nome"
					type="text"
					name="nome"
					class="form-control"
					:aria-invalid="Boolean(errors.nome)"
					aria-describedby="nome-error"
				/>
				<p v-if="errors.nome" id="nome-error" class="field-error">
					{{ errors.nome }}
				</p>
			</label>

			<label v-if="allowAuthorChange" class="field" for="select_autor">
				<span>Autor</span>
				<select
					id="select_autor"
					v-model="obra.id_autor"
					name="select_autor"
					class="form-select"
				>
					<option disabled value="">Selecione o autor</option>
					<option v-for="autor in autores" :key="autor.id" :value="autor.id">
						{{ autor.nome }}
					</option>
				</select>
			</label>

			<label class="field" for="select_genero_literario">
				<span>Gênero literário</span>
				<select
					id="select_genero_literario"
					v-model="obra.id_genero_literario"
					name="select_genero_literario"
					class="form-select"
				>
					<option disabled value="">Selecione o gênero</option>
					<option v-for="genero in generos" :key="genero.id" :value="genero.id">
						{{ genero.nome }}
					</option>
				</select>
			</label>

			<label class="field" for="pdfFile">
				<span>Arquivo PDF</span>
				<input
					id="pdfFile"
					ref="pdfFile"
					type="file"
					class="form-control"
					accept="application/pdf"
					@change="onSelectPDF"
				/>
				<p class="field-hint">
					Envie um novo PDF apenas se quiser substituir o atual.
				</p>
			</label>

			<label class="field" for="audioFile">
				<span>Arquivo de Áudio (opcional)</span>
				<input
					id="audioFile"
					ref="audioFile"
					type="file"
					class="form-control"
					accept="audio/*"
					@change="onSelectAudio"
				/>
			</label>

			<label class="field" for="endereco_video">
				<span>Link do vídeo do YouTube (opcional)</span>
				<input
					id="endereco_video"
					v-model.trim="obra.endereco_video"
					type="url"
					name="endereco_video"
					class="form-control"
					placeholder="https://www.youtube.com/watch?v=..."
				/>
			</label>

			<div class="field">
				<p class="field-hint">
					Ao marcar a opção abaixo, declaro que li e aceito os
					<router-link to="/termos_de_uso">termos de uso</router-link>
					do site, que incluem a autorização para o uso de minha imagem em
					materiais de comunicação vinculados ao IFBA e outras plataformas.
				</p>
				<label class="check-field" for="autorizacao">
					<input
						id="autorizacao"
						v-model="autorizacao"
						type="checkbox"
						:aria-invalid="Boolean(errors.autorizacao)"
						aria-describedby="autorizacao-error"
					/>
					<span>Declaro que li e aceito os termos de uso</span>
				</label>
				<p
					v-if="errors.autorizacao"
					id="autorizacao-error"
					class="field-error"
				>
					{{ errors.autorizacao }}
				</p>
			</div>

			<p v-if="submitError" class="notice error" role="alert">
				{{ submitError }}
			</p>

			<button type="submit" class="ui-button" :disabled="isSubmitting">
				{{ isSubmitting ? 'Salvando...' : 'Salvar alterações' }}
			</button>
		</form>
	</section>
</template>

<script>
import { api, getAuthConfig } from '../../services/api'

export default {
	name: 'ObraEditForm',
	props: {
		obraId: {
			type: [String, Number],
			required: true,
		},
		redirectRouteName: {
			type: String,
			required: true,
		},
		allowAuthorChange: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			obra: {
				nome: '',
				id_autor: '',
				id_genero_literario: '',
				endereco_video: '',
			},
			autorizacao: false,
			autores: [],
			generos: [],
			pdfFile: null,
			audioFile: null,
			errors: {},
			loading: true,
			loadError: '',
			isSubmitting: false,
			submitError: '',
		}
	},
	methods: {
		onSelectPDF() {
			this.pdfFile = this.$refs.pdfFile.files[0] || null
		},
		onSelectAudio() {
			this.audioFile = this.$refs.audioFile.files[0] || null
		},
		validateForm() {
			const errors = {}

			if (!this.obra.nome) errors.nome = 'Preencha o nome da obra.'
			if (!this.autorizacao) {
				errors.autorizacao = 'É necessário aceitar os termos para prosseguir.'
			}

			this.errors = errors
			return Object.keys(errors).length === 0
		},
		async onSubmit() {
			this.submitError = ''

			if (!this.validateForm()) {
				return
			}

			const formData = new FormData()
			if (this.pdfFile) {
				formData.append('file', this.pdfFile)
			}
			if (this.audioFile) {
				formData.append('audioFile', this.audioFile)
			}
			formData.append('endereco_video', this.obra.endereco_video || '')
			formData.append('nome', this.obra.nome)
			formData.append('select_autor', this.obra.id_autor)
			formData.append('select_genero_literario', this.obra.id_genero_literario)

			this.isSubmitting = true

			try {
				await api.put(
					`/obra/update/${this.obraId}`,
					formData,
					getAuthConfig()
				)
				this.$router.push({ name: this.redirectRouteName })
			} catch (error) {
				console.error(error)
				this.submitError =
					error.response?.data?.mensagem ||
					'Não foi possível salvar as alterações. Tente novamente.'
			} finally {
				this.isSubmitting = false
			}
		},
		async loadData() {
			this.loading = true
			this.loadError = ''

			try {
				const requests = [
					api.get(`/obra/${this.obraId}`),
					api.get('/lista_generos_literarios'),
				]
				if (this.allowAuthorChange) {
					requests.push(api.get('/lista_autor'))
				}

				const [obraRes, generosRes, autoresRes] = await Promise.all(requests)
				this.obra = obraRes.data?.obra?.[0] || this.obra
				this.generos = generosRes.data?.generoLiterario || []
				if (autoresRes) {
					this.autores = autoresRes.data?.autor || []
				}
			} catch (error) {
				console.error(error)
				this.loadError = 'Não foi possível carregar os dados da obra.'
			} finally {
				this.loading = false
			}
		},
	},
	mounted() {
		this.loadData()
	},
}
</script>
