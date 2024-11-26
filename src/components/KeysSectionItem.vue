<template>
	<section class="items">
		<h2>Obras Disponíveis</h2>
		<p>
			Aqui você pode encontrar uma seleção de obras literárias disponíveis para
			consulta e leitura.
		</p>
		<div class="item-cards">
			<article v-for="obra in displayedObras" :key="obra.id" class="item-card">
				<h3>{{ obra.nome }}</h3>
				<a :href="obra.endereco_pdf" target="_blank">Acessar Obra</a>
			</article>
		</div>
		<div v-if="obras.length > displayedObras.length" class="load-more">
			<button @click="loadMore">Carregar Mais</button>
		</div>
	</section>
</template>

<script>
import axios from 'axios';

export default {
	name: 'ObrasSection',
	data() {
		return {
			obras: [], // Lista completa de obras
			displayedObras: [], // Obras exibidas na tela (limitadas)
			obraLimit: 5, // Limite de obras por vez
		};
	},
	methods: {
		getObras() {
			// Faz a requisição para buscar as obras
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_obra`)
				.then((res) => {
					// Verifica se a resposta é um array de obras
					this.obras = res.data || [];
					// Exibe as primeiras 5 obras
					this.displayedObras = this.obras.obra.slice(0, this.obraLimit);
				})
				.catch((error) => {
					console.error(error);
					this.obras = [];
					this.displayedObras = [];
				});
		},
		loadMore() {
			// Carrega mais obras
			const nextObras = this.obras.slice(
				this.displayedObras.length,
				this.displayedObras.length + this.obraLimit
			);
			this.displayedObras.push(...nextObras); // Adiciona as novas obras à lista exibida
		},
	},
	mounted() {
		this.getObras(); // Carrega a lista de obras ao montar o componente
	},
};
</script>

<style scoped>
.items {
	padding: 50px 20px;
	background: #f7f7f7;
	text-align: center;
}

.items h2 {
	font-size: 2.5rem;
	color: #6c4f31;
	margin-bottom: 20px;
	font-weight: bold;
}

.items p {
	font-size: 1.2rem;
	color: #5a5a5a;
	margin-bottom: 30px;
}

.item-cards {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 20px;
}

.item-card {
	background: #fff;
	border: 1px solid #ddd;
	border-radius: 10px;
	padding: 20px;
	width: 200px;
	text-align: center;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item-card:hover {
	transform: translateY(-10px);
	box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.item-card h3 {
	font-size: 1.2rem;
	color: #6c4f31;
	margin-bottom: 10px;
}

.item-card a {
	color: #ffcc00;
	font-size: 1.1rem;
	text-decoration: none;
}

.item-card a:hover {
	text-decoration: underline;
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
