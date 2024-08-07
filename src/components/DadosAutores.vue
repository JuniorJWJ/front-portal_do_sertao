<template>
	<div class="dados-autores">
		<h1>Dados dos Autores</h1>
		<CityChart v-if="cityChartData" :chartData="cityChartData" />
		<GenderChart v-if="genderChartData" :chartData="genderChartData" />
		<ColorChart v-if="colorChartData" :chartData="colorChartData" />
	</div>
</template>

<script>
import axios from 'axios'
import CityChart from './CityChart.vue'
import GenderChart from './GenderChart.vue'
import ColorChart from './ColorChart.vue'

export default {
	name: 'DadosAutores',
	components: {
		CityChart,
		GenderChart,
		ColorChart,
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
			this.processColorData()
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
		processCityData() {
			if (!this.autores || !this.autores.autor.length) return

			const cityCounts = this.autores.autor.reduce((acc, autor) => {
				const cityId = autor.id_cidade
				const cityName = this.cityNames[cityId] || 'Desconhecida'
				acc[cityName] = (acc[cityName] || 0) + 1
				return acc
			}, {})

			// Lista de 17 cores distintas
			const colors = [
				'rgba(255, 99, 132, 0.2)', // Red
				'rgba(54, 162, 235, 0.2)', // Blue
				'rgba(75, 192, 192, 0.2)', // Green
				'rgba(255, 206, 86, 0.2)', // Yellow
				'rgba(153, 102, 255, 0.2)', // Purple
				'rgba(255, 159, 64, 0.2)', // Orange
				'rgba(199, 199, 199, 0.2)', // Light Gray
				'rgba(83, 102, 255, 0.2)', // Light Blue
				'rgba(255, 107, 107, 0.2)', // Light Red
				'rgba(162, 255, 162, 0.2)', // Light Green
				'rgba(255, 255, 107, 0.2)', // Light Yellow
				'rgba(102, 255, 255, 0.2)', // Light Cyan
				'rgba(255, 102, 255, 0.2)', // Light Magenta
				'rgba(255, 179, 102, 0.2)', // Light Orange
				'rgba(102, 255, 179, 0.2)', // Light Olive
				'rgba(179, 102, 255, 0.2)', // Light Purple
				'rgba(102, 102, 255, 0.2)', // Light Blue (Variation)
			]

			this.cityChartData = {
				labels: Object.keys(cityCounts),
				datasets: [
					{
						label: 'Número de Autores por Cidade',
						data: Object.values(cityCounts),
						backgroundColor: colors.slice(0, Object.keys(cityCounts).length),
						borderColor: colors
							.slice(0, Object.keys(cityCounts).length)
							.map((color) => color.replace('0.2', '1')),
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
		processColorData() {
			if (!this.autores || !this.autores.autor.length) return

			const colorCounts = this.autores.autor.reduce((acc, autor) => {
				acc[autor.cor_de_pele] = (acc[autor.cor_de_pele] || 0) + 1
				return acc
			}, {})

			this.colorChartData = {
				labels: Object.keys(colorCounts),
				datasets: [
					{
						label: 'Distribuição de Cor/raça dos Autores',
						data: Object.values(colorCounts),
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)', // Red
							'rgba(54, 162, 235, 0.2)', // Blue
							'rgba(75, 192, 192, 0.2)', // Green
							'rgba(255, 159, 64, 0.2)', // Orange
							'rgba(153, 102, 255, 0.2)', // Purple
						],
						borderColor: [
							'rgba(255, 99, 132, 1)', // Red
							'rgba(54, 162, 235, 1)', // Blue
							'rgba(75, 192, 192, 1)', // Green
							'rgba(255, 159, 64, 1)', // Orange
							'rgba(153, 102, 255, 1)', // Purple
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
