<template>
	<section class="hero" aria-labelledby="hero-title">
		<div class="hero-text">
			<p class="eyebrow">Portal Literário do Sertão</p>
			<h1 id="hero-title">Bem-vindo ao Portal Literário do Sertão</h1>
			<p class="hero-description">
				Uma plataforma para descobrir e compartilhar a produção literária e a
				cultura do sertão.
			</p>
			<div class="cta-buttons">
				<router-link to="/register_autor" class="ui-button">
					Junte-se a nós
				</router-link>
				<router-link to="/list_obra" class="ui-button secondary">
					Explorar obras
				</router-link>
			</div>
		</div>
		<img
			class="hero-logo"
			src="../../assets/logo-4.png"
			alt=""
			aria-hidden="true"
		/>
	</section>
</template>

<script>
export default {
	name: 'HeroSection',
}
</script>

<style scoped>
.hero {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--space-6);
	padding: clamp(2rem, 6vw, 4rem) clamp(1.25rem, 4vw, 3rem);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	background:
		radial-gradient(
			1100px 380px at 85% -10%,
			color-mix(in srgb, var(--color-primary) 18%, transparent),
			transparent
		),
		var(--color-surface);
	box-shadow: var(--shadow-md);
}

.hero-text {
	max-width: 560px;
}

.hero h1 {
	margin: 0 0 var(--space-3);
	font-size: clamp(1.9rem, 4.5vw, 2.8rem);
	font-weight: 800;
	line-height: 1.15;
	letter-spacing: -0.01em;
}

.hero-description {
	margin: 0 0 var(--space-5);
	color: var(--color-muted);
	font-size: clamp(1rem, 2vw, 1.15rem);
	line-height: 1.7;
}

.cta-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-3);
}

.hero-logo {
	width: clamp(120px, 18vw, 200px);
	height: auto;
	flex: 0 0 auto;
}

@media (max-width: 720px) {
	.hero {
		flex-direction: column-reverse;
		text-align: center;
	}

	.cta-buttons {
		justify-content: center;
	}

	.cta-buttons .ui-button {
		flex: 1 1 100%;
	}
}
</style>
