<template>
	<section class="form-page" aria-labelledby="autor-edit-title">
		<div v-if="loading" class="status-box">Carregando dados do autor...</div>
		<div v-else-if="loadError" class="status-box" role="alert">
			{{ loadError }}
		</div>

		<form v-else class="form-card" novalidate @submit.prevent="onSubmit">
			<div>
				<p class="eyebrow">{{ eyebrow }}</p>
				<h1 id="autor-edit-title" class="page-title">{{ title }}</h1>
			</div>

			<label class="field" for="nome">
				<span>Nome</span>
				<input
					id="nome"
					v-model.trim="autor.nome"
					type="text"
					name="nome"
					class="form-control"
					autocomplete="name"
					:aria-invalid="Boolean(errors.nome)"
					aria-describedby="nome-error"
				/>
				<p v-if="errors.nome" id="nome-error" class="field-error">
					{{ errors.nome }}
				</p>
			</label>

			<label class="field" for="email">
				<span>Email</span>
				<input
					id="email"
					v-model.trim="autor.email"
					type="email"
					name="email"
					class="form-control"
					autocomplete="email"
					:aria-invalid="Boolean(errors.email)"
					aria-describedby="email-error"
				/>
				<p v-if="errors.email" id="email-error" class="field-error">
					{{ errors.email }}
				</p>
			</label>

			<label class="field" for="profissao">
				<span>Profissão</span>
				<input
					id="profissao"
					v-model.trim="autor.profissao"
					type="text"
					name="profissao"
					class="form-control"
				/>
			</label>

			<label class="field" for="biografia">
				<span>Biografia</span>
				<textarea
					id="biografia"
					v-model.trim="autor.biografia"
					name="biografia"
					rows="4"
					class="form-control"
				></textarea>
			</label>

			<label class="field" for="select_cidade">
				<span>Cidade</span>
				<select
					id="select_cidade"
					v-model="autor.id_cidade"
					name="select_cidade"
					class="form-select"
				>
					<option disabled value="">Selecione a cidade</option>
					<option v-for="cidade in cidades" :key="cidade.id" :value="cidade.id">
						{{ cidade.nome }}
					</option>
				</select>
			</label>

			<label class="field" for="genero">
				<span>Gênero</span>
				<select
					id="genero"
					v-model="autor.genero"
					name="genero"
					class="form-select"
				>
					<option disabled value="">Selecione</option>
					<option>Masculino</option>
					<option>Feminino</option>
					<option>Prefiro não informar</option>
				</select>
			</label>

			<label class="field" for="cor_de_pele">
				<span>Cor/Raça</span>
				<select
					id="cor_de_pele"
					v-model="autor.cor_de_pele"
					name="cor_de_pele"
					class="form-select"
				>
					<option disabled value="">Selecione</option>
					<option>Branca</option>
					<option>Preta</option>
					<option>Parda</option>
					<option>Amarela</option>
					<option>Indígena</option>
				</select>
			</label>

			<div class="field">
				<span>Foto de perfil</span>
				<img
					v-if="autor.endereco_foto"
					class="photo-preview"
					:src="autor.endereco_foto"
					:alt="`Foto atual de ${autor.nome}`"
				/>
				<input
					id="foto"
					ref="file"
					type="file"
					class="form-control"
					accept="image/jpeg, image/pjpeg, image/png"
					aria-label="Substituir foto de perfil"
					@change="onSelect"
				/>
				<p class="field-hint">
					Envie uma nova imagem apenas se quiser substituir a atual.
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
	name: 'AutorEditForm',
	props: {
		autorId: {
			type: [String, Number],
			required: true,
		},
		redirectRouteName: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			default: 'Alterar autor',
		},
		eyebrow: {
			type: String,
			default: 'Edição',
		},
	},
	data() {
		return {
			autor: {
				nome: '',
				email: '',
				profissao: '',
				biografia: '',
				id_cidade: '',
				genero: '',
				cor_de_pele: '',
				endereco_foto: '',
			},
			cidades: [],
			file: null,
			errors: {},
			loading: true,
			loadError: '',
			isSubmitting: false,
			submitError: '',
		}
	},
	methods: {
		onSelect() {
			const file = this.$refs.file.files[0]
			if (!file) return

			this.file = file
			this.autor.endereco_foto = URL.createObjectURL(file)
		},
		validateForm() {
			const errors = {}

			if (!this.autor.nome) errors.nome = 'Nome é obrigatório.'
			if (!this.autor.email) errors.email = 'E-mail é obrigatório.'

			this.errors = errors
			return Object.keys(errors).length === 0
		},
		async onSubmit() {
			this.submitError = ''

			if (!this.validateForm()) {
				return
			}

			const formData = new FormData()
			if (this.file) {
				formData.append('file', this.file)
			}
			formData.append('nome', this.autor.nome)
			formData.append('profissao', this.autor.profissao)
			formData.append('biografia', this.autor.biografia)
			formData.append('email', this.autor.email)
			formData.append('id_cidade', this.autor.id_cidade)
			formData.append('genero', this.autor.genero)
			formData.append('cor_de_pele', this.autor.cor_de_pele)

			this.isSubmitting = true

			try {
				await api.put(
					`/autor/update/${this.autorId}`,
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
				const [autorRes, cidadesRes] = await Promise.all([
					api.get(`/autor/${this.autorId}`),
					api.get('/lista_cidade'),
				])
				this.autor = autorRes.data?.autor?.[0] || this.autor
				this.cidades = cidadesRes.data?.cidade || []
			} catch (error) {
				console.error(error)
				this.loadError = 'Não foi possível carregar os dados do autor.'
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

<style scoped>
.photo-preview {
	width: 84px;
	height: 84px;
	border-radius: 999px;
	object-fit: cover;
	border: 1px solid var(--color-border);
}
</style>
