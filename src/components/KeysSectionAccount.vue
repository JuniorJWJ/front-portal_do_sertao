<template>
	<section class="highlight-authors">
		<h2>Autores em Destaque</h2>
		<p>Conheça alguns autores cadastrados no Portal Literário do Sertão.</p>
		<div class="author-cards">
			<article v-for="author in displayedAuthors" :key="author.id" class="author-card">
				<img :src="author.endereco_foto" alt="Foto do Autor" />
				<h3>{{ author.nome }}</h3>
				<button @click="show_autor(author.id)">Ver Mais</button>
			</article>
		</div>
		<div v-if="authors.length > displayedAuthors.length" class="load-more">
			<button @click="loadMore">Carregar Mais</button>
		</div>
	</section>
</template>

<script>
import axios from 'axios';

export default {
	name: 'HighlightAuthors',
	data() {
		return {
			authors: [], // Lista completa de autores
			displayedAuthors: [], // Autores exibidos na tela (limitados)
			authorsLimit: 5, // Limite de autores por vez
		};
	},
	methods: {
		getAutores() {
			// Faz a requisição para buscar os autores
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_autor`)
				.then((res) => {
					this.authors = res.data || []; // Garantindo que seja um array de autores
					console.log(this.authors.autor);
					this.displayedAuthors = this.authors.autor.slice(0, this.authorsLimit); // Exibindo os primeiros 5 autores
				})
				.catch((error) => {
					console.error(error);
					this.authors = [];
					this.displayedAuthors = [];
				});
		},
		loadMore() {
			// Carrega mais autores
			const nextAuthors = this.authors.slice(
				this.displayedAuthors.length,
				this.displayedAuthors.length + this.authorsLimit
			);
			this.displayedAuthors.push(...nextAuthors); // Adiciona os novos autores à lista exibida
		},
		show_autor(id) {
			// Redireciona para a página do autor
			this.$router.push({ name: 'AutorShow', params: { id: id } });
		},
	},
	mounted() {
		this.getAutores(); // Carrega a lista de autores ao montar o componente
	},
};
</script>

<style scoped>
.highlight-authors {
	padding: 50px 20px;
	background: #f8f4ed;
	text-align: center;
}

.highlight-authors h2 {
	font-size: 2.5rem;
	color: #6c4f31;
	margin-bottom: 20px;
	font-weight: bold;
}

.highlight-authors p {
	font-size: 1.2rem;
	color: #5a5a5a;
	margin-bottom: 30px;
}

.author-cards {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 20px;
}

.author-card {
	background: #fff;
	border: 1px solid #ddd;
	border-radius: 10px;
	padding: 20px;
	width: 200px;
	text-align: center;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.author-card:hover {
	transform: translateY(-10px);
	box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.author-card img {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-bottom: 15px;
}

.author-card h3 {
	font-size: 1.2rem;
	color: #6c4f31;
	margin-bottom: 10px;
}

.author-card button {
	background-color: #ffcc00;
	color: #6c4f31;
	border: none;
	padding: 10px 20px;
	font-size: 1rem;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.author-card button:hover {
	background-color: #e6b800;
}

.load-more {
	margin-top: 20px;
}

.load-more button {
	background-color: #6c4f31;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.load-more button:hover {
	background-color: #a2691a;
}
</style>
