<template>
	<div class="home">
		<!-- <header class="header">
			<h1 class="logo">Portal do Sertão</h1>
			<nav class="nav">
				<router-link
					to="/register_autor"
					:class="[
						'nav-link',
						activeNavItem === '/register_autor' ? 'active' : '',
					]"
				> 
				</router-link>
			</nav>
		</header> -->
		<main class="main">
			<section class="intro-section">
				<div class="hero-content">
					<div class="text-content">
						<h2 class="hero-title">Bem-vindo ao Portal Literário do Sertão</h2>
						<p class="hero-description">
							Uma plataforma para descobrir e compartilhar informações sobre a
							cultura do sertão.
						</p>
						<div class="cta-buttons">
							<router-link to="/register_autor" class="hero-cta">
								Junte-se a nós
							</router-link>
							<router-link to="/log_user" class="hero-cta secondary">
								Entrar
							</router-link>
						</div>
					</div>
					<div class="image-content">
						<img src="../assets/logo-4.png" alt="Cultura do Sertão" />
						<img src="../assets/logo-4.png" alt="Cultura do Sertão" />
					</div>
				</div>
			</section>
		</main>
		<!-- <footer class="footer">
			<p class="footer-text">
				© 2023 Portal do Sertão. Todos os direitos reservados.
			</p>
		</footer> -->
	</div>
</template>

<script>
export default {
	name: 'HomePage',
	data() {
		return {
			activeNavItem: '',
			apiURL: process.env.VUE_APP_API_URL,
		}
	},
}
</script>

<style scoped>
/* Estilos base */
.home {
	display: flex;
	flex-direction: column; 
}

/* Cabeçalho */
.header {
	background-color: #3e2723;
	padding: 20px;
}

.logo {
	color: #ffcc00;
	font-size: 24px;
	margin: 0;
}

.nav {
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
}

.nav-link {
	color: #fff;
	text-decoration: none;
	margin-left: 20px;
}

.nav-link.active {
	font-weight: bold;
}

/* Seção principal */
.main {
	flex: 1;
}

.intro-section {
	background-color: #3e2723;
	color: #fff;
	padding: 60px 20px;
	text-align: center;
}

.hero-content {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}

.text-content {
	max-width: 600px;
	margin: 0 20px;
}

.hero-title {
	font-size: 2.5rem;
	color: #ffcc00;
	margin-bottom: 20px;
}

.hero-description {
	color: #ffe600;
	font-size: 1.2rem;
	margin-bottom: 30px;
}

.cta-buttons {
	margin-top: 20px;
}

.hero-cta {
	background-color: #ffcc00;
	color: #3e2723;
	font-size: 1.1rem;
	padding: 15px 30px;
	text-decoration: none;
	border-radius: 8px;
	margin: 10px;
	transition: background-color 0.3s ease, transform 0.3s ease;
}

.hero-cta.secondary {
	background-color: #ffb300;
}

.hero-cta:hover {
	transform: scale(1.05);
}

/* Conteúdo de imagem */
.image-content img {
	max-width: 100px;
	height: auto;
	margin: 10px;
	border-radius: 10px;
}

/* Rodapé */
.footer {
	background-color: #333;
	color: #fff;
	padding: 20px;
	text-align: center;
}

.footer-text {
	margin: 0;
}

/* Responsividade */
@media (max-width: 768px) {
	.hero-title {
		font-size: 2rem;
	}
	.hero-description {
		font-size: 1rem;
	}
}

@media (max-width: 480px) {
	.hero-cta {
		font-size: 0.9rem;
		padding: 10px 15px;
	}

	.image-content img {
		max-width: 80px;
	}
}
</style>
