<template>
	<section class="how-it-works">
		<h2>Como Funciona</h2>
		<div class="steps">
			<div class="step">
				<i class="icon">📝</i>
				<p>Cadastre-se como Autor</p>
			</div>
      <div class="step">
				<i class="icon">👩‍🏫</i>
				<p>Aguarde a Validação</p>
			</div>
			<div class="step">
				<i class="icon">📤</i>
				<p>Envie Suas Obras Literárias</p>
			</div>
			<div class="step">
				<i class="icon">👩‍🏫</i>
				<p>Aguarde a Validação</p>
			</div>
			<div class="step">
				<i class="icon">📚</i>
				<p>Compartilhe Sua Produção com o Mundo</p>
			</div>
		</div>
	</section>
</template>


<script>
export default {
	name: 'HowItWorksSection',
}
</script>

<style scoped>
.how-it-works {
	padding: 60px 20px;
	text-align: center;
	background: #efebeb;
}

.how-it-works h2 {
	font-size: 2.5rem;
	color: #6c4f31;
	margin-bottom: 20px;
	font-weight: bold;
}

.steps {
	display: flex;
	justify-content: center;
	gap: 40px;
	margin-top: 30px;
}

.step {
	text-align: center;
}

.icon {
	font-size: 2.5rem;
	margin-bottom: 10px;
	color: #ffcc00;
}
</style>
