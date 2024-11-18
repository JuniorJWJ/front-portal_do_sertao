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

					<label for="select_autor">Autor:</label>
					<select
						name="select_autor"
						id="select_autor"
						v-model="obra.id_autor"
						class="form-select"
					>
						<option
							v-for="autorselecionado in autores.autor"
							:key="autorselecionado.nome"
							:value="autorselecionado.id"
							:selected="autorselecionado.id == obra.id_autor"
						>
							{{ autorselecionado.nome }}
						</option>
					</select>

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
					<label for="pdfFile">Arquivo PDF:</label>
					<input
						type="file"
						ref="pdfFile"
						@change="onSelectPDF"
						class="form-control"
						id="pdfFile"
						accept="application/pdf"
					/>

					<!-- Campo para Áudio -->
					<label for="audioFile">Arquivo de Áudio:</label>
					<input
						type="file"
						ref="audioFile"
						@change="onSelectAudio"
						class="form-control"
						id="audioFile"
						accept="audio/*"
					/>

					<!-- Link para vídeo -->
					<label for="endereco_video">Link do vídeo (YouTube):</label>
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
			obra: [],
			autores: [],
			GenerosLiterarios: [],
			file: null,
			audioFile: null,
		}
	},
	methods: {
		async onSelectPDF() {
			const file = this.$refs.pdfFile.files[0]
			this.obra.pdfFile = file
		},
		async onSelectAudio() {
			const audioFile = this.$refs.audioFile.files[0]
			this.obra.audioFile = audioFile
		},
		async updateObra(e) {
			e.preventDefault()

			// Verificação de campos obrigatórios
			if (!this.obra.autorizacao) {
				alert('Você precisa aceitar os termos de uso.')
				return
			}

			const formData = new FormData()
			formData.append('pdfFile', this.obra.pdfFile)
			formData.append('audioFile', this.obra.audioFile)
			formData.append('endereco_video', this.obra.endereco_video)
			formData.append('nome', this.obra.nome)
			formData.append('select_autor', this.obra.id_autor)
			formData.append('select_genero_literario', this.obra.id_genero_literario)
			console.log("formdata: " + formData)

			try {
				await axios.put(
					`${process.env.VUE_APP_API_URL}/obra/update/${this.id}`,
					formData
				)
				this.$router.push({ name: 'MinhasObrasView' })
			} catch (err) {
				console.log(err)
			}
		},
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
		getAutores() {
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_autor`)
				.then((res) => {
					this.autores = res.data
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
	mounted() {
		this.getObra(this.$route.params.id),
			this.getAutores(),
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
