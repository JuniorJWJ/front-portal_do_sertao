<template>
	<section class="about">
		<h2>Promovendo a Cultura Literária do Sertão</h2>
		<p>
			O Portal Literário do Sertão é um espaço dedicado à valorização e
			divulgação das produções literárias regionais. Aqui, autores podem
			publicar suas obras e leitores têm acesso a um vasto acervo de histórias,
			poesias e muito mais.
		</p>
		<div class="features">
			<div class="feature-item">
				<i class="icon">📚</i>
				<p>Descubra Obras Regionais</p>
			</div>
			<div class="feature-item">
				<i class="icon">✍️</i>
				<p>Cadastre-se como Autor</p>
			</div>
			<div class="feature-item">
				<i class="icon">🌍</i>
				<p>Valorize a Cultura Local</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'AboutSection',
}
</script>

<style scoped>
.about {
	padding: 60px 20px;
	text-align: center;
}

.about h2 {
	font-size: 2.5rem;
	color: #6c4f31;
	margin-bottom: 20px;
	font-weight: bold;
}

.about p {
	font-size: 1.1rem;
	color: #555;
	max-width: 800px;
	margin: 0 auto 30px;
	line-height: 1.8;
}

.features {
	display: flex;
	justify-content: center;
	gap: 40px;
	margin-top: 30px;
}

.feature-item {
	text-align: center;
}

.icon {
	font-size: 2.5rem;
	margin-bottom: 10px;
	color: #ffcc00;
}
</style>
