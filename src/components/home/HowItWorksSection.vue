<template>
	<section class="how-it-works" aria-labelledby="how-title">
		<h2 id="how-title">Como Funciona</h2>
		<ol class="steps">
			<li v-for="(step, index) in steps" :key="step.label">
				<span class="step-number" aria-hidden="true">{{ index + 1 }}</span>
				<span class="icon" aria-hidden="true">{{ step.icon }}</span>
				<p>{{ step.label }}</p>
			</li>
		</ol>
	</section>
</template>

<script>
export default {
	name: 'HowItWorksSection',
	data() {
		return {
			steps: [
				{ icon: '📝', label: 'Cadastre-se como Autor' },
				{ icon: '👩‍🏫', label: 'Aguarde a Validação do Cadastro' },
				{ icon: '📤', label: 'Envie Suas Obras Literárias' },
				{ icon: '✅', label: 'Aguarde a Aprovação da Obra' },
				{ icon: '📚', label: 'Compartilhe Sua Produção com o Mundo' },
			],
		}
	},
}
</script>

<style scoped>
.how-it-works {
	padding: clamp(2.5rem, 6vw, 4rem) var(--space-4);
	text-align: center;
	border-radius: var(--radius-lg);
	background: var(--color-surface-muted);
}

.how-it-works h2 {
	margin: 0 0 var(--space-5);
	font-size: clamp(1.5rem, 3.2vw, 2.2rem);
	font-weight: 800;
	color: var(--color-text);
}

.steps {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
	gap: var(--space-4);
	max-width: 980px;
	margin: 0 auto;
	padding: 0;
	list-style: none;
	counter-reset: step;
}

.steps li {
	position: relative;
	padding: var(--space-5) var(--space-4) var(--space-4);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface);
	box-shadow: var(--shadow-sm);
}

.step-number {
	position: absolute;
	top: calc(-1 * var(--space-3));
	left: 50%;
	transform: translateX(-50%);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	border-radius: 999px;
	background: var(--color-primary);
	color: #fff;
	font-weight: 800;
	font-size: 0.9rem;
}

.icon {
	display: block;
	font-size: 2rem;
}

.steps p {
	margin: var(--space-2) 0 0;
	font-weight: 700;
}
</style>
