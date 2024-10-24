<template>
	<div class="container">
		<article>
			<span>Nome da Obra</span>
			<h5>{{ obra.nome }}</h5>
		</article>

		<article>
			<span>Autor</span>
			<h5>{{ obra.id_autor }}</h5>
		</article>

		<article>
			<span>Gênero literário</span>
			<h5>{{ obra.id_genero_literario }}</h5>
		</article>

		<article v-if="obra.endereco_audio">
			<span>Áudio da Obra</span>
			<audio controls :src="obra.endereco_audio"></audio>
		</article>

		<article v-if="obra.endereco_video">
			<span>Vídeo da Obra</span>
			<div class="video-container">
				<iframe
					:src="embedYouTubeURL(obra.endereco_video)"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</article>

		<article v-if="obra.endereco_pdf">
			<span>Visualizar Obra</span>
			<div class="pdf-container">
				<iframe
					:src="obra.endereco_pdf"
					frameborder="0"
					width="100%"
					height="600px"
				></iframe>
			</div>
		</article>
		<div class="action">
			<a @click="goBack()">
				<button>
					<i class="bi-chevron-left"></i>
					<span>Voltar</span>
				</button>
			</a>

			<a :href="obra.endereco_pdf" target="_blank">
				<button>
					<span>Acessar Obra</span>
					<i class="bi-chevron-right"></i>
				</button>
			</a>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'AutorShow',
	data() {
		return {
			id: this.$route.params.id,
			obra: [],
			id_autor: '',
			nome: '',
			endereco_pdf: '',
			endereco_audio: '',
			genero_literario: '',
		}
	},
	methods: {
		getObra(id) {
			axios
				.get(`${process.env.VUE_APP_API_URL}/obra/${id}`)
				.then((res) => {
					this.obra = res.data.obra[0]
					console.log('this.obra:', this.obra)
					this.getAutor(this.obra.id_autor)
					// console.log(this.obra.id_genero_literario);
					this.getGeneroLiterario(this.obra.id_genero_literario)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		getAutor(id) {
			axios
				.get(`${process.env.VUE_APP_API_URL}/autor/${id}`)
				.then((res) => {
					this.autor = res.data.autor
					// console.log(this.autor[0].nome)
					this.obra.id_autor = this.autor[0].nome
				})
				.catch((error) => {
					console.log(error)
				})
		},
		getGeneroLiterario(id) {
			axios
				.get(`${process.env.VUE_APP_API_URL}/genero_literario/${id}`)
				.then((res) => {
					this.genero_literario = res.data.generoLiterario
					// console.log(this.genero_literario)
					// console.log(this.genero_literario[0].nome)
					this.obra.id_genero_literario = this.genero_literario[0].nome
				})
				.catch((error) => {
					console.log(error)
				})
		},
		goBack() {
			window.history.back()
		},
		embedYouTubeURL(url) {
			const videoId = url.split('v=')[1]
			const ampersandPosition = videoId ? videoId.indexOf('&') : -1
			if (ampersandPosition !== -1) {
				return `https://www.youtube.com/embed/${videoId.substring(
					0,
					ampersandPosition
				)}`
			}
			return `https://www.youtube.com/embed/${videoId}`
		},
	},
	created() {
		this.getObra(this.$route.params.id)
	},
}
</script>

<style scoped>
img {
	width: 60px;
	height: 60px;
}
.container {
	background-color: #fafafa;
	box-shadow: 3px 2px 7px rgba(0, 0, 0, 0.15);
	border: 1px solid #d2d2d2;
	border-radius: 16px;
	font-size: 22px;
	color: #3b3b3b;
	text-transform: capitalize;
	padding: 0;
	width: 600px;
}
.container article {
	display: flex;
	align-items: center;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #d2d2d2a1;
	padding: 10px 20px;
}
.container article h5 {
	font-weight: 500;
}
.container a {
	text-decoration: none;
}
.action {
	display: flex;
	justify-content: center;
	gap: 10px;
}
.container button {
	background-color: #a2691a;
	border-radius: 10px;
	border: none;
	font-size: 22px;
	color: #f2f2f2;
	text-transform: capitalize;
	padding: 5px 10px;
	margin: 10px 0;
	cursor: pointer;
	transition: all ease 0.5s;
	display: flex;
	align-items: center;
	gap: 5px;
}
.container button:hover {
	background-color: #c9872c;
}
.video-container {
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%; /* 16:9 aspect ratio */
	border: 2px solid #d2d2d2;
	border-radius: 10px;
	background-color: #f9f9f9;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	margin-top: 20px;
}
.video-container iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: none;
}
.pdf-container {
	position: relative;
	width: 100%;
	border: 2px solid #d2d2d2;
	border-radius: 10px;
	background-color: #f9f9f9;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	margin-top: 20px;
}
.pdf-container iframe {
	width: 100%;
	height: 600px;
	border: none;
}
</style>
