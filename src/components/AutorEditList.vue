<template>
  <div>
    <h1>Autores</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Código Autor</th>
          <th scope="col">Nome</th>
          <th scope="col">Foto</th>
          <th scope="col">Ação</th>
          <th scope="col">Aprovar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in autores.autor" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.nome }}</td>
          <td>
            <img :src="item.endereco_foto" />
          </td>
          <td>
            <button @click="editAutores(item.id)" class="btn btn-info">
              Editar
            </button>
            <button @click="deleteAutores(item.id)" class="btn btn-danger">
              Excluir
            </button>
          </td>
          <td>
            <button
              @click="approvAutores(item.id)"
              class="btn"
              :class="{
                'btn-info': item.aprovado === 0,
                'btn-success': item.aprovado === 1,
              }"
            >
              <span v-if="item.aprovado === 0">Aprovar</span>
              <span v-if="item.aprovado === 1">Aprovado</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AutorEditList',
  data() {
    return {
      autores: [],
      lista_autores: null,
    }
  },
  methods: {
    getAutores() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/lista_autor_adm`)
        .then((res) => {
          this.autores = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteAutores(id) {
      axios
        .delete(`${process.env.VUE_APP_API_URL}/autor/delete/${id}`)
        .then(() => {
          this.getAutores()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    approvAutores(id) {
      axios
        .patch(`${process.env.VUE_APP_API_URL}/autor/approv/${id}`)
        .then(() => {
          this.getAutores()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editAutores(id) {
      this.$router.push({ name: 'AutorEditView', params: { id: id } })
    },
  },
  mounted() {
    this.getAutores()
  },
}
</script>

<style scoped>
img {
  width: 60px;
  height: 60px;
}
</style>
