<template>
  <div class="corpo">
    <h1 class="title">Obras</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th class="nomeobratabela" scope="col">Nome</th>
          <th scope="col">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in obras.obra" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td class="nomeobratabela">{{ item.nome }}</td>
          <td>
            <button @click="editObras(item.id)" class="btn btn buttonedit">
              Editar
            </button>
            <button @click="deleteObras(item.id)" class="btn btn buttondelet">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
  name: 'MinhasObras',
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      this.userId = decodedToken.id
    }
    this.getObras(this.userId)
  },
  data() {
    return {
      obras: [],
      userId: null,
      token: null,
    }
  },
  methods: {
    getObras() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/lista_obra/autor/${this.userId}`)
        .then((res) => {
          this.obras = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteObras(id) {
      console.log('id dentro de deleteobras: ' + id)
      axios
        .delete(`${process.env.VUE_APP_API_URL}/obra/delete/${id}`)
        .then(() => {
          this.getObras()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editObras(id) {
      this.$router.push({ name: 'ObraEditView', params: { id: id } })
    },
  },
}
</script>

<style scoped>
img {
  width: 60px;
  height: 60px;
}
button {
  margin-left: 10px;
  color: white;
}
.buttonedit {
  background: #029bbf;
}
.buttondelet {
  background: #e85850;
}
.nomeobratabela {
  text-align: left;
}
#title {
  padding: 0.5em;
}
.corpo {
  height: 100%;
  padding-bottom: 40px;
}
</style>
