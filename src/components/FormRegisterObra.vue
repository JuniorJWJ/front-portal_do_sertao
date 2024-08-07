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
				<!-- {{ select_autor }} -->
				<!-- <input type="hidden" 
       name="select_autor"
       id="select_autor"
       v-model="select_autor"
       :value="idAutor"> -->

				<!-- <label for="select_autor">Autor</label>
        <select
          name="select_autor"
          id="select_autor"
          v-model="select_autor"
          class="form-select"
        >
          <option
            v-for="nomeautor in autores.autor"
            :key="nomeautor.nome"
            :selected="nomeautor.id == select_autor.id"
            :value="nomeautor.id"
          >
            {{ nomeautor.nome }}
          </option>
        </select> -->

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

				<label for="input-file"
					>Caso queira disponibilizar, insira aqui o PDF da Obra completa .
					Autorizo a veiculação do(s) material(is) encaminhado(s) para uso na
					plataforma digital do projeto “Portal da Literatura”, do IFBA Feira de
					Santana. Autorizo, também, o uso de minha imagem em todo e qualquer
					material entre imagens de vídeo, fotos e documentos, para ser
					utilizada no referido projeto e também nas peças de comunicação que
					serão veiculadas através dos canais de mídia do IFBA e outras
					plataformas vinculadas ao projeto. A presente autorização é concedida
					a título gratuito. Fica ainda autorizada, de livre e espontânea
					vontade, para os mesmos fins, a cessão de direitos da veiculação das
					imagens, não recebendo, para tanto, qualquer tipo de
					remuneração.</label
				>
				<input
					name="input-file"
					type="file"
					ref="file"
					@change="onSelect"
					class="form-control"
					id="customFile"
				/>

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
			console.log(decodedToken.id)
			this.userId = decodedToken.id
			// this.decodedToken = decodedToken;  // Adicionado o atributo decodedToken ao data
			// this.id = decodedToken.id
			// console.log(this.id)
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
			decodedToken: null,
			adm: null,
			userId: null,
			idAutor: null,
		}
	},
	methods: {
		async onSelect() {
			const file = this.$refs.file.files[0]
			this.file = file
			console.log(this.file.name)
		},
		async onSubmit(e) {
			e.preventDefault()
			const formData = new FormData()
			formData.append('file', this.file)
			formData.append('nome', this.nome)
			formData.append('select_autor', this.idAutor)
			formData.append('select_genero_literario', this.select_genero_literario)
			console.log(formData)
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
					console.log(this.GenerosLiterarios)
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
