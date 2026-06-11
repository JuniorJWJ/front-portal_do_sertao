<template>
	<section class="page-surface dados-autores" aria-labelledby="dados-title">
		<PageHeader
			eyebrow="Estatísticas"
			title="Dados dos Autores"
			title-id="dados-title"
			description="Distribuição demográfica dos autores cadastrados no portal."
		/>

		<div v-if="loading" class="status-box">Carregando dados...</div>
		<div v-else-if="errorMessage" class="status-box" role="alert">
			{{ errorMessage }}
		</div>
		<div v-else class="charts-grid">
			<CityChart v-if="cityChartData" :chartData="cityChartData" />
			<GenderChart v-if="genderChartData" :chartData="genderChartData" />
			<ColorChart v-if="colorChartData" :chartData="colorChartData" />
		</div>
	</section>
</template>

<script>
import { api } from '../../services/api'
import { chartPalette } from '../../services/chartTheme'
import PageHeader from '../molecules/PageHeader.vue'
import CityChart from '../molecules/CityChart.vue'
import GenderChart from '../molecules/GenderChart.vue'
import ColorChart from '../molecules/ColorChart.vue'

export default {
	name: 'DadosAutores',
	components: {
		PageHeader,
		CityChart,
		GenderChart,
		ColorChart,
	},
	data() {
		return {
			cityChartData: null,
			genderChartData: null,
			colorChartData: null,
			cidades: [],
			cityNames: {},
			autores: { autor: [] },
			loading: true,
			errorMessage: '',
		}
	},
	mounted() {
		this.fetchData()
	},
	methods: {
		async getCidades() {
			const res = await api.get('/lista_cidade')
			this.cidades = res.data?.cidade || []
			this.cityNames = this.cidades.reduce((acc, cidade) => {
				acc[cidade.id] = cidade.nome
				return acc
			}, {})
		},

		async getAutores() {
			const res = await api.get('/lista_autor')
			this.autores = res.data || { autor: [] }
		},

		/** Conta ocorrências e monta o dataset com a paleta do tema */
		buildChartData(counts, label) {
			const labels = Object.keys(counts)
			const palette = chartPalette(labels.length)

			return {
				labels,
				datasets: [
					{
						label,
						data: Object.values(counts),
						backgroundColor: palette.backgroundColor,
						borderColor: palette.borderColor,
						borderWidth: 1,
					},
				],
			}
		},

		processCityData() {
			if (!this.autores.autor.length) return

			const cityCounts = this.autores.autor.reduce((acc, autor) => {
				const cityName = this.cityNames[autor.id_cidade] || 'Desconhecida'
				acc[cityName] = (acc[cityName] || 0) + 1
				return acc
			}, {})

			this.cityChartData = this.buildChartData(
				cityCounts,
				'Número de Autores por Cidade'
			)
		},

		processGenderData() {
			if (!this.autores.autor.length) return

			const genderCounts = this.autores.autor.reduce((acc, autor) => {
				acc[autor.genero] = (acc[autor.genero] || 0) + 1
				return acc
			}, {})

			this.genderChartData = this.buildChartData(
				genderCounts,
				'Distribuição de Gênero dos Autores'
			)
		},

		processColorData() {
			if (!this.autores.autor.length) return

			const colorCounts = this.autores.autor.reduce((acc, autor) => {
				acc[autor.cor_de_pele] = (acc[autor.cor_de_pele] || 0) + 1
				return acc
			}, {})

			this.colorChartData = this.buildChartData(
				colorCounts,
				'Distribuição de Cor/Raça dos Autores'
			)
		},

		async fetchData() {
			this.loading = true
			this.errorMessage = ''

			try {
				await Promise.all([this.getCidades(), this.getAutores()])
				this.processCityData()
				this.processGenderData()
				this.processColorData()
			} catch (error) {
				console.error(error)
				this.errorMessage = 'Não foi possível carregar os dados dos autores.'
			} finally {
				this.loading = false
			}
		},
	},
}
</script>

<style scoped>
.dados-autores {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-5);
}

.charts-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: var(--space-4);
}

/* O gráfico de cidades (barras) ocupa a largura toda */
.charts-grid :deep(.chart-card--wide) {
	grid-column: 1 / -1;
}

@media (max-width: 820px) {
	.charts-grid {
		grid-template-columns: 1fr;
	}
}
</style>
