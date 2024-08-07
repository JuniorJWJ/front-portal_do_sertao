<template>
	<div>
		<h1>Bem-vindo, {{ userName }}</h1>
	</div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export default {
	name: 'UserComponent',
	data() {
		return {
			userId: null,
			userName: null,
			isReloaded: false,
		}
	},
	mounted() {
		if (!this.isReloaded) {
			this.isReloaded = true
			const token = localStorage.getItem('token')
			if (token) {
				const decodedToken = jwtDecode(token)
				// console.log(decodedToken.id)
				this.userId = decodedToken.id
			}
			if (!token) {
				this.$router.push({ name: 'LogUserView' })
			}
		}
		this.getProfile(this.userId)
	},
	methods: {
		getProfile(userId) {
			// console.log("dentro do get profile",userId)
			axios
				.get(`${process.env.VUE_APP_API_URL}/autor/${userId}`)
				.then((res) => {
					this.autor = res.data.autor[0]
					this.userName = this.autor.nome
					// console.log(this.obra);
					// this.getObra(this.obra.id_autor);
					// // console.log(this.obra.id_genero_literario);
					// this.getGeneroLiterario(this.obra.id_genero_literario)
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},
}
</script>

<style scoped></style>

<!-- <template>
  <div>
    <h1>Bem-vindo, ADM</h1>
  </div>
</template>

<script>
export default {
  name: "UserComponent",
  data() {
    return {
      users: null,
      isReloaded: false
    }
  },
  mounted() {
    if (!this.isReloaded) {
      this.isReloaded = true;
      console.log(this.isReloaded);
    }
  }
}
</script>

<style scoped>
  
</style> -->
