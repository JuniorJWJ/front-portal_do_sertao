<template>
	<div>
		<h2 class="titulo">Cadastrar Obra</h2>
		<form
			class="form-group container"
			@submit="onSubmit"
			enctype="multipart/form-data"
		>
			<div class="">
				<label for="nome">Obra</label>
				<input
					type="text"
					id="nome"
					name="nome"
					class="form-control"
					v-model="nome"
				/>

				<label for="select_genero_literario">Gênero Literário</label>
				<select
					name="select_genero_literario"
					id="select_genero_literario"
					v-model="select_genero_literario"
					class="form-select"
				>
					<option
						v-for="nomegeneroliterario in GenerosLiterarios.generoLiterario"
						:key="nomegeneroliterario.nome"
						:value="nomegeneroliterario.id"
					>
						{{ nomegeneroliterario.nome }}
					</option>
				</select>

				<!-- Campo para PDF -->
				<label for="customFile">Arquivo PDF:</label>
				<input
					type="file"
					ref="file"
					@change="onSelect"
					class="form-control"
					id="customFile"
					accept="application/pdf"
				/>

				<!-- Campo para Áudio -->
				<label for="audioFile">Arquivo de Áudio:</label>
				<input
					type="file"
					ref="audioFile"
					@change="onAudioSelect"
					class="form-control"
					id="audioFile"
					accept="audio/*"
				/>

				<!-- Link para vídeo -->
				<label for="endereco_video">Insira o link do vídeo do Youtube:</label>
				<input
					type="text"
					id="endereco_video"
					name="endereco_video"
					class="form-control"
					v-model="endereco_video"
				/>

				<!-- Autorização -->
				<div id="agrupa_check_com_autorizacao">
					<span id="texto_termo">
						Ao clicar no checkbox abaixo, declaro que li e aceito os
						<router-link to="/termos_de_uso">termos de uso</router-link> do
						site, que incluem a autorização para o uso de minha imagem em
						materiais de comunicação vinculados ao IFBA e outras plataformas.
					</span>
				</div>
				<input type="checkbox" id="autorizacao" v-model="autorizacao" /><span
					>Declaro que li e aceito os termos de uso</span
				>

				<button type="submit" class="btn btn-success">Salvar</button>
			</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
	name: 'FormEditAutor',
	mounted() {
		const token = localStorage.getItem('token')
		if (token) {
			const decodedToken = jwtDecode(token)
			this.userId = decodedToken.id
		}

		this.getGenerosLiterarios(), this.getAutores(this.userId)
	},
	data() {
		return {
			token: localStorage.getItem('token'),
			autores: [],
			GenerosLiterarios: [],
			nome: '',
			select_autor: '',
			select_genero_literario: '',
			file: '',
			audioFile: '',
			endereco_video: '',
			autorizacao: false, // Adicionando a verificação de autorização
			userId: null,
			idAutor: null,
		}
	},
	methods: {
		async onSelect() {
			const file = this.$refs.file.files[0]
			this.file = file
		},
		async onAudioSelect() {
			const audioFile = this.$refs.audioFile.files[0]
			this.audioFile = audioFile
		},
		async onSubmit(e) {
			e.preventDefault()

			// Verificação dos campos obrigatórios, incluindo autorização
			const requiredFields = [
				{ field: this.nome, message: 'Por favor, preencha o nome da obra.' },
				{
					field: this.select_genero_literario,
					message: 'Por favor, selecione o gênero literário.',
				},
				{ field: this.file, message: 'Por favor, adicione o arquivo PDF.' },
				{
					field: this.autorizacao,
					message: 'Você precisa aceitar os termos de uso para continuar.',
				},
			]

			for (let { field, message } of requiredFields) {
				if (!field) {
					alert(message)
					return
				}
			}

			const formData = new FormData()
			formData.append('file', this.file)
			formData.append('audioFile', this.audioFile)
			formData.append('endereco_video', this.endereco_video)
			formData.append('nome', this.nome)
			formData.append('select_autor', this.idAutor)
			formData.append('select_genero_literario', this.select_genero_literario)

			try {
				await axios.post(`${process.env.VUE_APP_API_URL}/create_obra`, formData)
				this.$router.push({ name: 'MinhasObrasView' })
			} catch (err) {
				console.log(err)
			}
		},
		getAutores(userId) {
			axios
				.get(`${process.env.VUE_APP_API_URL}/autor/${userId}`)
				.then((res) => {
					this.autores = res.data
					this.idAutor = this.autores.autor[0].id
				})
				.catch((error) => {
					console.log(error)
				})
		},
		getGenerosLiterarios() {
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_generos_literarios`)
				.then((res) => {
					this.GenerosLiterarios = res.data
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
label {
	text-align: left;
	display: flex;
	margin-top: 12px;
}
button {
	margin-top: 12px;
	width: 100%;
	text-transform: uppercase;
}
#customFile {
	margin-top: 12px;
}
</style>
