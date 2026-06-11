<template>
	<section class="form-page" aria-labelledby="create-autor-title">
		<form class="form-card" novalidate @submit.prevent="onSubmit">
			<div>
				<p class="eyebrow">Cadastro</p>
				<h1 id="create-autor-title" class="page-title">Registrar autor</h1>
				<p class="muted">
					Preencha seus dados. O cadastro passa por aprovação antes de ser
					publicado.
				</p>
			</div>

			<label class="field" for="email">
				<span>Email</span>
				<input
					id="email"
					v-model.trim="form.email"
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

			<label class="field" for="password">
				<span>Senha</span>
				<input
					id="password"
					v-model="form.password"
					type="password"
					name="password"
					class="form-control"
					autocomplete="new-password"
					:aria-invalid="Boolean(errors.password)"
					aria-describedby="password-error"
				/>
				<p v-if="errors.password" id="password-error" class="field-error">
					{{ errors.password }}
				</p>
			</label>

			<label class="field" for="confirmpassword">
				<span>Confirmar senha</span>
				<input
					id="confirmpassword"
					v-model="form.confirmpassword"
					type="password"
					name="confirmpassword"
					class="form-control"
					autocomplete="new-password"
					:aria-invalid="Boolean(errors.confirmpassword)"
					aria-describedby="confirmpassword-error"
				/>
				<p
					v-if="errors.confirmpassword"
					id="confirmpassword-error"
					class="field-error"
				>
					{{ errors.confirmpassword }}
				</p>
			</label>

			<label class="field" for="nome">
				<span>Nome</span>
				<input
					id="nome"
					v-model.trim="form.nome"
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

			<label class="field" for="profissao">
				<span>Profissão</span>
				<input
					id="profissao"
					v-model.trim="form.profissao"
					type="text"
					name="profissao"
					class="form-control"
					:aria-invalid="Boolean(errors.profissao)"
					aria-describedby="profissao-error"
				/>
				<p v-if="errors.profissao" id="profissao-error" class="field-error">
					{{ errors.profissao }}
				</p>
			</label>

			<label class="field" for="biografia">
				<span>Biografia</span>
				<textarea
					id="biografia"
					v-model.trim="form.biografia"
					name="biografia"
					rows="4"
					class="form-control"
					:aria-invalid="Boolean(errors.biografia)"
					aria-describedby="biografia-error"
				></textarea>
				<p v-if="errors.biografia" id="biografia-error" class="field-error">
					{{ errors.biografia }}
				</p>
			</label>

			<label class="field" for="select_cidade">
				<span>Cidade</span>
				<select
					id="select_cidade"
					v-model="form.cidade"
					name="select_cidade"
					class="form-select"
					:aria-invalid="Boolean(errors.cidade)"
					aria-describedby="cidade-error"
				>
					<option disabled value="">Selecione a cidade</option>
					<option
						v-for="cidade in cidades"
						:key="cidade.id"
						:value="cidade.id"
					>
						{{ cidade.nome }}
					</option>
				</select>
				<p v-if="errors.cidade" id="cidade-error" class="field-error">
					{{ errors.cidade }}
				</p>
			</label>

			<label class="field" for="genero">
				<span>Gênero</span>
				<select
					id="genero"
					v-model="form.genero"
					name="genero"
					class="form-select"
					:aria-invalid="Boolean(errors.genero)"
					aria-describedby="genero-error"
				>
					<option disabled value="">Selecione</option>
					<option>Masculino</option>
					<option>Feminino</option>
					<option>Prefiro não informar</option>
				</select>
				<p v-if="errors.genero" id="genero-error" class="field-error">
					{{ errors.genero }}
				</p>
			</label>

			<label class="field" for="cor_de_pele">
				<span>Cor/Raça</span>
				<select
					id="cor_de_pele"
					v-model="form.cor_de_pele"
					name="cor_de_pele"
					class="form-select"
					:aria-invalid="Boolean(errors.cor_de_pele)"
					aria-describedby="cor-error"
				>
					<option disabled value="">Selecione</option>
					<option>Branca</option>
					<option>Preta</option>
					<option>Parda</option>
					<option>Amarela</option>
					<option>Indígena</option>
				</select>
				<p v-if="errors.cor_de_pele" id="cor-error" class="field-error">
					{{ errors.cor_de_pele }}
				</p>
			</label>

			<label class="field" for="foto">
				<span>Foto de perfil</span>
				<input
					id="foto"
					ref="file"
					type="file"
					class="form-control"
					accept="image/jpeg, image/pjpeg, image/png"
					:aria-invalid="Boolean(errors.file)"
					aria-describedby="foto-error foto-hint"
					@change="onSelect"
				/>
				<p id="foto-hint" class="field-hint">
					Somente imagens JPEG ou PNG.
				</p>
				<p v-if="errors.file" id="foto-error" class="field-error">
					{{ errors.file }}
				</p>
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
			<p v-if="successMessage" class="notice success" role="status">
				{{ successMessage }}
			</p>

			<button type="submit" class="ui-button" :disabled="isSubmitting">
				{{ isSubmitting ? 'Enviando...' : 'Salvar' }}
			</button>
		</form>
	</section>
</template>

<script>
import { api } from '../../services/api'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/pjpeg', 'image/png']

export default {
	name: 'FormCreateAutor',
	data() {
		return {
			form: {
				email: '',
				password: '',
				confirmpassword: '',
				nome: '',
				profissao: '',
				biografia: '',
				cidade: '',
				genero: '',
				cor_de_pele: '',
				autorizacao: false,
			},
			file: null,
			cidades: [],
			errors: {},
			isSubmitting: false,
			submitError: '',
			successMessage: '',
		}
	},
	methods: {
		onSelect() {
			const file = this.$refs.file.files[0]

			if (file && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
				this.errors = { ...this.errors, file: 'Somente arquivos JPEG e PNG são permitidos.' }
				this.file = null
				return
			}

			this.errors = { ...this.errors, file: '' }
			this.file = file || null
		},
		validateForm() {
			const errors = {}
			const { form } = this

			if (!form.email) errors.email = 'E-mail é obrigatório.'
			if (!form.password) errors.password = 'Senha é obrigatória.'
			if (!form.confirmpassword) {
				errors.confirmpassword = 'Confirmação de senha é obrigatória.'
			} else if (form.password !== form.confirmpassword) {
				errors.confirmpassword = 'As senhas não coincidem.'
			}
			if (!form.nome) errors.nome = 'Nome é obrigatório.'
			if (!form.profissao) errors.profissao = 'Profissão é obrigatória.'
			if (!form.biografia) errors.biografia = 'Biografia é obrigatória.'
			if (!form.cidade) errors.cidade = 'Cidade é obrigatória.'
			if (!form.genero) errors.genero = 'Gênero é obrigatório.'
			if (!form.cor_de_pele) errors.cor_de_pele = 'Cor/Raça é obrigatória.'
			if (!this.file) errors.file = 'Foto é obrigatória.'
			if (!form.autorizacao) {
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
			formData.append('nome', this.form.nome)
			formData.append('profissao', this.form.profissao)
			formData.append('biografia', this.form.biografia)
			formData.append('email', this.form.email)
			formData.append('password', this.form.password)
			formData.append('id_cidade', this.form.cidade)
			formData.append('genero', this.form.genero)
			formData.append('cor_de_pele', this.form.cor_de_pele)

			this.isSubmitting = true

			try {
				await api.post('/create_autor', formData)
				this.successMessage =
					'Seus dados foram recebidos. Aguarde a aprovação do seu registro no sistema.'
				setTimeout(() => {
					this.$router.push({ name: 'HomeView' })
				}, 5000)
			} catch (error) {
				console.error(error)
				this.submitError =
					error.response?.data?.mensagem ||
					'Não foi possível enviar o cadastro. Tente novamente.'
			} finally {
				this.isSubmitting = false
			}
		},
		async getCidades() {
			try {
				const res = await api.get('/lista_cidade')
				this.cidades = res.data?.cidade || []
			} catch (error) {
				console.error(error)
				this.cidades = []
			}
		},
	},
	mounted() {
		this.getCidades()
	},
}
</script>
