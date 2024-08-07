<template>
	<div>
		<h2>Autores por Cidade</h2>
		<Bar :data="chartData" />
	</div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
	name: 'CityChart',
	components: {
		Bar,
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
				console.error('City chartData is not correctly structured:', newData)
			}
		},
	},
}
</script>
