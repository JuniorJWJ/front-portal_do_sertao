<template>
  <div>
    <form id="user-form" @submit="logUser">
      <label for="login">Login:</label>
      <input
        type="text"
        id="login"
        name="email"
        v-model="email"
        class="form-control"
      />
      <label for="password">Senha:</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
        class="form-control"
      />
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <button type="submit">Logar</button>
    </form>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'FormLogUser',
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      console.log(decodedToken.id)
      this.userId = decodedToken.id
      this.$router.push({ name: 'UserView' })
    }
  },
  data() {
    return {
      email: null,
      password: null,
      errorMessage: '',
      id: null,
    }
  },
  methods: {
    async logUser(e) {
      e.preventDefault()
      console.log('enviou o form')

      const data = {
        email: this.email,
        password: this.password,
      }
      const dataJson = JSON.stringify(data)
      const res = await fetch('${process.env.VUE_APP_API_URL}/autor/log', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        //credentials: "include",
        // mode: 'no-cors',
        body: dataJson,
      })
      const responseJson = await res.json()
      const tokenjwt = responseJson.token

      if (tokenjwt) {
        localStorage.setItem('token', tokenjwt)
        console.log('token:', tokenjwt)

        location.reload()
        this.$router.push({ name: 'UserView' })
      } else {
        console.log('Token não está definido')
        this.errorMessage =
          'Falha ao efetuar login. Verifique suas credenciais.'
      }
    },
  },
}
</script>

<style scoped>
input {
  width: 300px;
}
label {
  text-align: left;
  display: flex;
  margin-top: 12px;
}
button {
  background-color: #a2691a;
  border-radius: 10px;
  border: none;
  font-size: 22px;
  color: #f2f2f2;
  text-transform: capitalize;
  padding: 5px 10px;
  margin: 10px auto;
  cursor: pointer;
  transition: all ease 0.5s;
  width: 100%;
}
button:hover {
  background-color: #c9872c;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
