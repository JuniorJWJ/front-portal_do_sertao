<template>
	<div id="mainAutor">
		<div id="barraLateralAutor">
			<ul>
				<li
					v-for="nomecidade in Cidade.cidade"
					:key="nomecidade.nome"
					:value="nomecidade.id"
					@click="toggleFilterOption(nomecidade.id)"
					:class="[activeFilterOption === nomecidade.id ? 'activeOption' : '']"
				>
					{{ nomecidade.nome }}
					<i v-show="activeFilterOption === nomecidade.id" class="bi-check"></i>
				</li>
			</ul>
		</div>
		<section id="listaAutorMain">
			<div id="pesquisaAutor">
				<input
					v-model="searchQuery"
					class="form-control inputsearch"
					placeholder="Digite o nome do Autor..."
				/>
			</div>
			<div v-if="resultQuery.length === 0" class="no-results">
				Nenhum autor encontrado.
			</div>
			<article
				v-else
				class="container"
				v-for="r of resultQuery"
				:key="r.id"
				@click="show_autor(r.id)"
			>
				<div>
					<img :src="r.endereco_foto" />
					{{ r.nome }}
				</div>
				<i class="bi-chevron-right"></i>
			</article>
		</section>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'AutorList',
	data() {
		return {
			autores: { autor: [] }, // Inicializando autores.autor como array vazio
			searchQuery: null,
			activeFilterOption: '',
			Cidade: { cidade: [] }, // Inicializando Cidade.cidade como array vazio
		}
	},
	methods: {
		getAutores() {
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_autor`)
				.then((res) => {
					this.autores = res.data || { autor: [] } // Garantindo que autores seja um objeto com a propriedade autor
				})
				.catch((error) => {
					console.log(error)
					this.autores = { autor: [] } // Garantindo que autores seja um objeto com a propriedade autor
				})
		},
		getAutorFiltroCidade(id) {
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_autor/cidade/${id}`)
				.then((res) => {
					this.autores = res.data || { autor: [] } // Garantindo que autores seja um objeto com a propriedade autor
				})
				.catch((error) => {
					console.log(error)
					this.autores = { autor: [] } // Garantindo que autores seja um objeto com a propriedade autor
				})
		},
		getCidades() {
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_cidade`)
				.then((res) => {
					this.Cidade = res.data || { cidade: [] } // Garantindo que Cidade seja um objeto com array vazio
				})
				.catch((error) => {
					console.log(error)
					this.Cidade = { cidade: [] } // Garantindo que Cidade seja um objeto com array vazio
				})
		},
		show_autor(id) {
			this.$router.push({ name: 'AutorShow', params: { id: id } })
		},
		toggleFilterOption(itemId) {
			if (this.activeFilterOption === itemId) {
				this.activeFilterOption = ''
				this.getAutores()
				return
			}

			this.getAutorFiltroCidade(itemId)
			this.activeFilterOption = itemId
		},
	},
	mounted() {
		this.getAutores()
		this.getCidades()
	},
	computed: {
		resultQuery() {
			if (this.searchQuery && this.autores.autor) {
				return this.autores.autor.filter((item) => {
					return this.searchQuery
						.toLowerCase()
						.split(' ')
						.every((v) => item.nome.toLowerCase().includes(v))
				})
			} else {
				return this.autores.autor || [] // Garantindo que seja um array
			}
		},
	},
}
</script>

<style scoped>
#barraLateralAutor {
	display: flex;
	text-align: left;
	outline: none;
	font-size: 22px;
}
#barraLateralAutor ul li:hover,
.activeOption {
	background-color: #dad8d8;
}
#mainAutor {
	display: flex;
}
#listaAutorMain {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.container {
	background-color: #fafafa;
	box-shadow: 3px 2px 7px rgba(0, 0, 0, 0.15);
	border: 1px solid #d2d2d2;
	border-radius: 16px;
	font-size: 22px;
	color: #3b3b3b;
	width: 100%;
	padding: 10px 15px;
	text-transform: capitalize;
	cursor: pointer;
	transition: all ease 0.5s;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.container:hover {
	background-color: #a2691a;
	color: #f2f2f2;
}
img {
	width: 50px;
	height: 50px;
	border-radius: 8px;
	margin-right: 10px;
}
ul li {
	list-style-type: none;
}
.inputsearch {
	border-radius: 8px;
	width: 740px;
}
img {
	width: 40px;
}
ul li {
	margin-right: 30px;
	width: 300px;
	padding: 10px;
	border-top: 1px solid #ccc;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
}
#barraLateralAutor ul li:first-child {
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
#barraLateralAutor ul li:last-child {
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	border-bottom: 1px solid #ccc;
}
.no-results {
	font-size: 18px;
	color: #666;
	text-align: center;
	margin-top: 20px;
}
</style>
