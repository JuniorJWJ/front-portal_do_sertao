<template>
	<div>
		<h2>Distribuição de Gênero dos Autores</h2>
		<Pie :data="chartData" />
	</div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	CategoryScale,
	LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
	name: 'GenderChart',
	components: {
		Pie,
	},
	props: {
		chartData: {
			type: Object,
			required: true,
		},
	},
	watch: {
		chartData(newData) {
			if (!newData.labels || !newData.datasets) {
				console.error('Gender chartData is not correctly structured:', newData)
			}
		},
	},
}
</script>
