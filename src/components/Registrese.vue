<!-- <template>
  <div id="campo">
    junte-se a nois

    <router-link
      to="/register_autor"
      :class="[activeNavItem === '/register_autor' ? 'activeItem' : '']"
      >Obras</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'NavbarNav',
}
</script>
<style scoped></style> -->

<template>
	<div class="home">
		<header class="header">
			<h1 class="logo">Portal do Sertão</h1>
			<nav class="nav">
				<router-link
					to="/register_autor"
					:class="[
						'nav-link',
						activeNavItem === '/register_autor' ? 'active' : '',
					]"
				>
					Cadastre-se como autor
				</router-link>
			</nav>
		</header>
		<main class="main">
			<section class="hero">
				<div class="hero-content">
					<h2 class="hero-title">Bem-vindo ao Portal Literário do Sertão</h2>
					<p class="hero-description">
						Uma plataforma para descobrir e compartilhar informações sobre a
						cultura do sertão.
					</p>
					<router-link to="/register_autor" class="hero-cta">
						Junte-se a nós
					</router-link>
				</div>
			</section>
		</main>
		<footer class="footer">
			<p class="footer-text">
				© 2023 Portal do Sertão. Todos os direitos reservados.
			</p>
		</footer>
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
.home {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.header {
	background-color: #333;
	padding: 20px;
}

.logo {
	color: #fff;
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

.main {
	flex: 1;
}

.hero {
	background-color: #f4f4f4;
	padding: 60px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.hero-title {
	font-size: 32px;
	margin: 0;
}

.hero-description {
	color: #666;
	font-size: 18px;
	margin-bottom: 20px;
}

.hero-cta {
	display: inline-block;
	background-color: #ff0000;
	color: #fff;
	padding: 10px 20px;
	font-size: 16px;
	text-decoration: none;
	border-radius: 5px;
}

.footer {
	background-color: #333;
	color: #fff;
	padding: 20px;
	text-align: center;
}

.footer-text {
	margin: 0;
}
</style>
