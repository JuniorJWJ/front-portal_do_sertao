<template>
	<header>
		<div>
			<a class="logo" href="#"><img src="../assets/logo-4.png" alt="" /></a>
		</div>

		<nav @click="setActiveNav()">
			<router-link to="/" :class="[activeNavItem == '/' ? 'activeItem' : '']"
				>Home</router-link
			>
			<router-link
				to="/list_obra"
				:class="[activeNavItem === '/list_obra' ? 'activeItem' : '']"
				>Obras</router-link
			>
			<router-link
				to="/list_autor"
				:class="[activeNavItem === '/list_autor' ? 'activeItem' : '']"
				>Autores</router-link
			>
			<router-link
				v-show="token && adm"
				to="/edit_autor_list"
				:class="[activeNavItem === '/edit_autor_list' ? 'activeItem' : '']"
				>Editar Autor</router-link
			>
			<router-link
				v-show="token && adm"
				to="/create_obra"
				:class="[activeNavItem === '/create_obra' ? 'activeItem' : '']"
				>Criar Obra</router-link
			>
			<router-link
				v-show="token && adm"
				to="/create_autor"
				:class="[activeNavItem === '/create_autor' ? 'activeItem' : '']"
				>Criar Autor</router-link
			>
			<router-link
				v-show="token && adm"
				to="/edit_obra_list"
				:class="[activeNavItem === '/edit_obra_list' ? 'activeItem' : '']"
				>Editar Obra</router-link
			>
			<router-link
				v-show="token && !adm"
				to="/minhas_obras"
				:class="[activeNavItem === '/edit_obra_list' ? 'activeItem' : '']"
				>Minhas Obras</router-link
			>
			<router-link
				v-show="token && !adm"
				to="/perfil"
				:class="[activeNavItem === '/perfil' ? 'activeItem' : '']"
				>Perfil</router-link
			>
			<router-link
				v-show="token && !adm"
				to="/edit_perfil"
				:class="[activeNavItem === '/edit_obra_list' ? 'activeItem' : '']"
				>Editar Perfil</router-link
			>
			<router-link
				v-show="token && !adm"
				to="/register_obra"
				:class="[activeNavItem === '/register_obra' ? 'activeItem' : '']"
				>Registrar Obra</router-link
			>
			<router-link
				to="/sobre"
				:class="[activeNavItem === '/sobre' ? 'activeItem' : '']"
				>Sobre</router-link
			>
			<router-link
				to="/dados_autores"
				:class="[activeNavItem === '/dados_autores' ? 'activeItem' : '']"
				>Gráficos</router-link
			>
		</nav>

		<div v-if="!token">
			<router-link class="login" to="/log_user">
				<i class="bi-person-circle"></i>
				<span>Login</span>
			</router-link>
		</div>
		<div v-if="token">
			<router-link class="login" to="/log_user" @click="deslogUser">
				<i class="bi-box-arrow-right"></i>
				<span>Logoff</span>
			</router-link>
		</div>
	</header>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
	name: 'NavbarNav',
	mounted() {
		if (!this.isReloaded) {
			this.isReloaded = true
			const token = localStorage.getItem('token')
			if (token) {
				const decodedToken = jwtDecode(token)
				console.log(decodedToken.id)
				this.userId = decodedToken.id
				this.decodedToken = decodedToken // Adicionado o atributo decodedToken ao data
				this.adm = decodedToken.adm
				console.log(this.adm)
			}
		}
	},
	data() {
		return {
			token: localStorage.getItem('token'),
			activeNavItem: '/',
			decodedToken: null,
			adm: null,
		}
	},
	methods: {
		async deslogUser() {
			localStorage.clear()
			location.reload()
			this.$router.push({ name: 'LogUserView' })
		},
		setActiveNav() {
			this.activeNavItem = this.$route.path
		},
	},
}
</script>
<style scoped>
header {
	background-image: #f2f2f2;
	color: #3b3b3b;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 10px 50px;
	border-bottom: 1px solid #d2d2d28e;
	box-shadow: 1px 5px 15px rgba(0, 0, 0, 0.05);
	margin-bottom: 30px;
	max-width: 1280px;
}
nav a {
	color: #a2691a;
	font-size: 25px;
	font-weight: 500;
	text-decoration: none;
	margin-left: 20px;
}
.activeItem,
nav a:hover {
	border-bottom: 2px solid #a2691a;
	padding-bottom: 5px;
}
.logo img {
	width: 100px;
}
.login {
	background-color: #a2691a;
	border-radius: 10px;
	border: none;
	font-size: 22px;
	color: #f2f2f2;
	text-transform: capitalize;
	padding: 5px 10px;
	margin: 10px 0;
	cursor: pointer;
	transition: all ease 0.5s;
	text-decoration: none;
}

.login:hover {
	background-color: #c9872c;
}
.login i {
	color: #f2f2f2;
	margin-right: 5px;
}
</style>
