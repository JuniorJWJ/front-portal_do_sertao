<template>
	<section class="about" aria-labelledby="about-title">
		<h2 id="about-title">Promovendo a Cultura Literária do Sertão</h2>
		<p>
			O Portal Literário do Sertão é um espaço dedicado à valorização e
			divulgação das produções literárias regionais. Aqui, autores podem
			publicar suas obras e leitores têm acesso a um vasto acervo de histórias,
			poesias e muito mais.
		</p>
		<ul class="features">
			<li v-for="feature in features" :key="feature.label">
				<span class="icon">
					<AppIcon :name="feature.icon" :size="26" />
				</span>
				<p>{{ feature.label }}</p>
			</li>
		</ul>
	</section>
</template>

<script>
import AppIcon from '../ui/AppIcon.vue'

export default {
	name: 'AboutSection',
	components: { AppIcon },
	data() {
		return {
			features: [
				{ icon: 'book-open', label: 'Descubra Obras Regionais' },
				{ icon: 'feather', label: 'Cadastre-se como Autor' },
				{ icon: 'globe', label: 'Valorize a Cultura Local' },
			],
		}
	},
}
</script>

<style scoped>
.about {
	padding: clamp(2.5rem, 6vw, 4rem) var(--space-4);
	text-align: center;
}

.about h2 {
	margin: 0 0 var(--space-4);
	font-size: clamp(1.5rem, 3.2vw, 2.2rem);
	font-weight: 800;
	color: var(--color-text);
}

.about > p {
	max-width: 760px;
	margin: 0 auto var(--space-5);
	color: var(--color-muted);
	font-size: 1.05rem;
	line-height: 1.8;
}

.features {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: var(--space-5);
	margin: 0;
	padding: 0;
	list-style: none;
}

.features li {
	min-width: 180px;
	padding: var(--space-4);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface);
	box-shadow: var(--shadow-sm);
}

.features p {
	margin: var(--space-2) 0 0;
	font-weight: 700;
}

.icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 52px;
	height: 52px;
	border-radius: 999px;
	background: var(--color-primary-soft);
	color: var(--color-primary);
}
</style>
