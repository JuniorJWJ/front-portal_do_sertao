<template>
	<div class="corpo">
		<h1 class="title">Obras</h1>
		<table class="table">
			<thead>
				<tr>
					<!-- <th scope="col">ID</th> -->
					<th scope="col">Nome</th>
					<th class="nomeobratabela" scope="col">Link Obra</th>
					<th scope="col">Opções</th>
					<th scope="col">Status</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in obras.obra" :key="item.id">
					<td class="nomeobratabela">{{ item.nome }}</td>
					<td class="endereco_pdf">
						<a :href="item.endereco_pdf" target="_blank">
							<button class="btn botaoacessarobra">
								<span>Acessar Obra</span>
								<i></i>
							</button>
						</a>
					</td>
					<!-- <th scope="row">{{ item.id }}</th> -->
					<td>
						<button @click="editObras(item.id)" class="btn btn buttonedit">
							Editar
						</button>
						<button @click="deleteObras(item.id)" class="btn btn buttondelet">
							Excluir
						</button>
					</td>
					<td>
						{{ item.aprovado === 1 ? 'Aprovada' : 'Pendente' }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
	name: 'MinhasObras',
	mounted() {
		const token = localStorage.getItem('token')
		if (token) {
			const decodedToken = jwtDecode(token)
			this.userId = decodedToken.id
		}
		this.getObras(this.userId)
	},
	data() {
		return {
			obras: [],
			userId: null,
			token: null,
		}
	},
	methods: {
		getObras() {
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_obra/autor/${this.userId}`)
				.then((res) => {
					this.obras = res.data
				})
				.catch((error) => {
					console.log(error)
				})
		},
		deleteObras(id) {
			console.log('id dentro de deleteobras: ' + id)
			axios
				.delete(`${process.env.VUE_APP_API_URL}/obra/delete/${id}`)
				.then(() => {
					this.getObras()
				})
				.catch((error) => {
					console.log(error)
				})
		},
		editObras(id) {
			this.$router.push({ name: 'ObraEditByOwnerView', params: { id: id } })
		},
	},
}
</script>

<style scoped>
img {
	width: 60px;
	height: 60px;
}
button {
	margin-left: 10px;
	color: white;
}
.buttonedit {
	background: #029bbf;
}
.buttondelet {
	background: #e85850;
}
.nomeobratabela {
	text-align: left;
}
#title {
	padding: 0.5em;
}
.corpo {
	height: 100%;
	padding-bottom: 40px;
}
.botaoacessarobra {
	background-color: #343a40;
	border-radius: 10px;
	border: none;
	font-size: 15px;
	color: #f2f2f2;
	text-transform: capitalize;
	cursor: pointer;
	transition: all ease 0.5s;
	align-items: center;
	gap: 5px;
	padding: 8px 4px;
}
</style>
