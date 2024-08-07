<template>
	<div class="dados-autores">
		<h1>Dados dos Autores</h1>
		<CityChart v-if="cityChartData" :chartData="cityChartData" />
		<GenderChart v-if="genderChartData" :chartData="genderChartData" />
	</div>
</template>

<script>
import axios from 'axios'
import CityChart from './CityChart.vue'
import GenderChart from './GenderChart.vue'

export default {
	name: 'DadosAutores',
	components: {
		CityChart,
		GenderChart,
	},
	data() {
		return {
			cityChartData: null,
			genderChartData: null,
			cidades: [],
			cityNames: {},
			autores: { autor: [] },
		}
	},
	mounted() {
		this.fetchData().then(() => {
			this.processCityData()
			this.processGenderData()
		})
	},
	methods: {
		getCidades() {
			axios
				.get(`${process.env.VUE_APP_API_URL}/lista_cidade`)
				.then((res) => {
					// Acesso correto à lista de cidades
					this.cidades = res.data.cidade
					this.updateCityNames() // Atualiza o mapeamento de cidades
				})
				.catch((error) => {
					console.log(error)
				})
		},

		updateCityNames() {
			this.cityNames = this.cidades.reduce((acc, cidade) => {
				console.log(
					`ID da cidade: ${cidade.id}, Nome da cidade: ${cidade.nome}`
				)
				acc[cidade.id] = cidade.nome
				return acc
			}, {})
		},

		async getAutores() {
			try {
				const res = await axios.get(
					`${process.env.VUE_APP_API_URL}/lista_autor`
				)
				console.log('Autores:', res.data) // Verifique o formato dos dados
				this.autores = res.data || { autor: [] }
				console.log(this.autores.autor.length)
			} catch (error) {
				console.error('Error fetching authors:', error)
				this.autores = { autor: [] }
			}
		},
		processCityData1() {
			console.log(
				'check:',
				this.cidades.cidade.length,
				this.autores.autor.length
			)
			if (!this.cidades.cidade.length || !this.autores.autor.length) return
			console.log('chegou aqui')
			const cityCounts = this.cidades.cidade.reduce((acc, cidade) => {
				acc[cidade.id] = 0 // Use o ID da cidade como chave
				return acc
			}, {})
			console.log('this.autores.autor', this.autores.autor)
			this.autores.autor.forEach((autor) => {
				if (cityCounts[autor.id_cidade] !== undefined) {
					cityCounts[autor.id_cidade]++
				}
			})

			const labels = this.cidade.cidades.map((cidade) => cidade.nome)
			const data = labels.map(
				(nome) =>
					cityCounts[this.cidades.find((cidade) => cidade.nome === nome)?.id] ||
					0
			)

			this.cityChartData = {
				labels: labels,
				datasets: [
					{
						label: 'Número de Autores por Cidade',
						data: data,
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
				],
			}

			console.log('City Chart Data:', this.cityChartData)
		},
		processCityData() {
			if (!this.autores || !this.autores.autor.length) return

			const cityCounts = this.autores.autor.reduce((acc, autor) => {
				const cityId = autor.id_cidade
				const cityName = this.cityNames[cityId] || 'Desconhecida'
				acc[cityName] = (acc[cityName] || 0) + 1
				return acc
			}, {})

			this.cityChartData = {
				labels: Object.keys(cityCounts),
				datasets: [
					{
						label: 'Número de Autores por Cidade',
						data: Object.values(cityCounts),
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
				],
			}

			console.log('City Chart Data:', this.cityChartData)
		},
		processGenderData() {
			if (!this.autores || !this.autores.autor.length) return

			const genderCounts = this.autores.autor.reduce((acc, autor) => {
				acc[autor.genero] = (acc[autor.genero] || 0) + 1
				return acc
			}, {})

			this.genderChartData = {
				labels: Object.keys(genderCounts),
				datasets: [
					{
						label: 'Distribuição de Gênero dos Autores',
						data: Object.values(genderCounts),
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
						],
						borderWidth: 1,
					},
				],
			}

			//   console.log('Gender Chart Data:', this.genderChartData)
		},
		async fetchData() {
			await this.getCidades()
			await this.getAutores()
		},
	},
}
</script>

<style scoped>
.dados-autores {
	padding: 20px;
}

h1 {
	text-align: center;
	margin-bottom: 20px;
}
</style>
