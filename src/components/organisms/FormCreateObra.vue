<template>
	<section class="form-page" aria-labelledby="create-obra-title">
		<form class="form-card" novalidate @submit.prevent="onSubmit">
			<div>
				<p class="eyebrow">Administração</p>
				<h1 id="create-obra-title" class="page-title">Cadastrar obra</h1>
				<p class="muted">
					Cadastre uma obra em nome de um autor aprovado.
				</p>
			</div>

			<label class="field" for="nome">
				<span>Nome da obra</span>
				<input
					id="nome"
					v-model.trim="form.nome"
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

			<label class="field" for="select_autor">
				<span>Autor</span>
				<select
					id="select_autor"
					v-model="form.autor"
					name="select_autor"
					class="form-select"
					:aria-invalid="Boolean(errors.autor)"
					aria-describedby="autor-error"
				>
					<option disabled value="">Selecione o autor</option>
					<option v-for="autor in autores" :key="autor.id" :value="autor.id">
						{{ autor.nome }}
					</option>
				</select>
				<p v-if="errors.autor" id="autor-error" class="field-error">
					{{ errors.autor }}
				</p>
			</label>

			<label class="field" for="select_genero_literario">
				<span>Gênero literário</span>
				<select
					id="select_genero_literario"
					v-model="form.genero"
					name="select_genero_literario"
					class="form-select"
					:aria-invalid="Boolean(errors.genero)"
					aria-describedby="genero-error"
				>
					<option disabled value="">Selecione o gênero</option>
					<option v-for="genero in generos" :key="genero.id" :value="genero.id">
						{{ genero.nome }}
					</option>
				</select>
				<p v-if="errors.genero" id="genero-error" class="field-error">
					{{ errors.genero }}
				</p>
			</label>

			<label class="field" for="pdfFile">
				<span>Arquivo PDF</span>
				<input
					id="pdfFile"
					ref="file"
					type="file"
					class="form-control"
					accept="application/pdf"
					:aria-invalid="Boolean(errors.file)"
					aria-describedby="pdf-error"
					@change="onSelect"
				/>
				<p v-if="errors.file" id="pdf-error" class="field-error">
					{{ errors.file }}
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
					@change="onAudioSelect"
				/>
			</label>

			<label class="field" for="endereco_video">
				<span>Link do vídeo do YouTube (opcional)</span>
				<input
					id="endereco_video"
					v-model.trim="form.endereco_video"
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
						v-model="form.autorizacao"
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
				{{ isSubmitting ? 'Enviando...' : 'Salvar' }}
			</button>
		</form>
	</section>
</template>

<script>
import { api, getAuthConfig } from '../../services/api'

export default {
	name: 'FormCreateObra',
	data() {
		return {
			form: {
				nome: '',
				autor: '',
				genero: '',
				endereco_video: '',
				autorizacao: false,
			},
			file: null,
			audioFile: null,
			autores: [],
			generos: [],
			errors: {},
			isSubmitting: false,
			submitError: '',
		}
	},
	methods: {
		onSelect() {
			this.file = this.$refs.file.files[0] || null
			this.errors = { ...this.errors, file: '' }
		},
		onAudioSelect() {
			this.audioFile = this.$refs.audioFile.files[0] || null
		},
		validateForm() {
			const errors = {}

			if (!this.form.nome) errors.nome = 'Preencha o nome da obra.'
			if (!this.form.autor) errors.autor = 'Selecione o autor.'
			if (!this.form.genero) errors.genero = 'Selecione o gênero literário.'
			if (!this.file) errors.file = 'Adicione o arquivo PDF da obra.'
			if (!this.form.autorizacao) {
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
			formData.append('file', this.file)
			formData.append('audioFile', this.audioFile)
			formData.append('endereco_video', this.form.endereco_video)
			formData.append('nome', this.form.nome)
			formData.append('select_autor', this.form.autor)
			formData.append('select_genero_literario', this.form.genero)

			this.isSubmitting = true

			try {
				await api.post('/create_obra', formData, getAuthConfig())
				this.$router.push({ name: 'ObraView' })
			} catch (error) {
				console.error(error)
				this.submitError =
					error.response?.data?.mensagem ||
					'Não foi possível cadastrar a obra. Tente novamente.'
			} finally {
				this.isSubmitting = false
			}
		},
		async getAutores() {
			try {
				const res = await api.get('/lista_autor')
				this.autores = res.data?.autor || []
			} catch (error) {
				console.error(error)
				this.autores = []
			}
		},
		async getGenerosLiterarios() {
			try {
				const res = await api.get('/lista_generos_literarios')
				this.generos = res.data?.generoLiterario || []
			} catch (error) {
				console.error(error)
				this.generos = []
			}
		},
	},
	mounted() {
		this.getAutores()
		this.getGenerosLiterarios()
	},
}
</script>
