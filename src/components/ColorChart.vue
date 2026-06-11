<template>
	<article class="chart-card">
		<h2>Distribuição de Cor/Raça dos Autores</h2>
		<div class="chart-area">
			<Pie :data="chartData" :options="options" />
		</div>
	</article>
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from 'chart.js'
import { chartOptions } from '../services/chartTheme'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
	name: 'ColorChart',
	components: {
		Pie,
	},
	props: {
		chartData: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			options: chartOptions(),
		}
	},
}
</script>

<style scoped src="../styles/chart-card.css"></style>
