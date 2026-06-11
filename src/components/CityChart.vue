<template>
	<article class="chart-card chart-card--wide">
		<h2>Autores por Cidade</h2>
		<div class="chart-area">
			<Bar :data="chartData" :options="options" />
		</div>
	</article>
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
import { barChartOptions } from '../services/chartTheme'

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
	data() {
		return {
			options: barChartOptions(),
		}
	},
}
</script>

<style scoped src="../styles/chart-card.css"></style>
