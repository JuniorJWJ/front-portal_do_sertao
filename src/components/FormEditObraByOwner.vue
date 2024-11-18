<template>
	<div>
		<h2 class="titulo">Alterar Obra:</h2>
		<form
			class="form-group container"
			@submit="updateObra"
			enctype="multipart/form-data"
		>
			<fieldset class="grupo">
				<div class="campo">
					<label for="nome">Nome:</label>
					<input
						type="text"
						id="nome"
						name="nome"
						class="form-control"
						v-model="obra.nome"
					/>

					<input
						type="hidden"
						:value="obra.id_autor"
						name="select_autor"
						id="select_autor"
					/>

					<label for="select_genero_literario">Gênero Literário:</label>
					<select
						name="select_genero_literario"
						id="select_genero_literario"
						v-model="obra.id_genero_literario"
						class="form-select"
					>
						<option
							v-for="nomegeneroliterario in GenerosLiterarios.generoLiterario"
							:key="nomegeneroliterario.nome"
							:value="nomegeneroliterario.id"
							:selected="obra.id_genero_literario == nomegeneroliterario.id"
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
						v-model="obra.endereco_video"
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
					<input type="checkbox" id="autorizacao" v-model="obra.autorizacao" />
					<span>Declaro que li e aceito os termos de uso</span>

					<button type="submit" class="btn btn-success">
						Salvar alterações
					</button>
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'FormEditAutor',
	data() {
		return {
			id: this.$route.params.id,
			obra: {
				nome: '',
				id_autor: '',
				id_genero_literario: '',
				endereco_video: '',
				autorizacao: false, // Para autorização
			},
			GenerosLiterarios: [],
			file: null, // Para armazenar o arquivo PDF
			audioFile: null, // Para armazenar o arquivo de áudio
		}
	},
	methods: {
		// Seleciona o arquivo PDF
		async onSelect() {
			const file = this.$refs.file.files[0]
			this.file = file
		},

		// Seleciona o arquivo de áudio
		async onAudioSelect() {
			const audioFile = this.$refs.audioFile.files[0]
			this.audioFile = audioFile
		},

		// Atualiza a obra
		async updateObra(e) {
			e.preventDefault()
			const formData = new FormData()

			formData.append('file', this.file) // PDF
			formData.append('audioFile', this.audioFile) // Áudio
			formData.append('endereco_video', this.obra.endereco_video)
			formData.append('nome', this.obra.nome)
			formData.append('select_autor', this.obra.id_autor)
			formData.append('select_genero_literario', this.obra.id_genero_literario)
			formData.append('autorizacao', this.obra.autorizacao) // Autorização
			console.log("formData: " + formData)
			try {
				await axios.put(
					`${process.env.VUE_APP_API_URL}/obra/update/${this.id}`,
					formData
				)
				this.$router.push({ name: 'ObraEditList' })
			} catch (err) {
				console.log(err)
			}
		},

		// Carrega as informações da obra
		getObra(id) {
			axios
				.get(`${process.env.VUE_APP_API_URL}/obra/${id}`)
				.then((res) => {
					this.obra = res.data.obra[0]
				})
				.catch((error) => {
					console.log(error)
				})
		},

		// Carrega os gêneros literários
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
	mounted() {
		this.getObra(this.$route.params.id)
		this.getGenerosLiterarios()
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
