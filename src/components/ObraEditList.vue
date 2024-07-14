<template>
  <div class="corpo">
    <h1 class="title">Obras</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Código Obra</th>
          <th class="nomeobratabela" scope="col">Nome</th>
          <th scope="col">Link Obra</th>
          <th scope="col">Opções</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in obras.obra" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td class="nomeobratabela">{{ item.nome }}</td>
          <td class="endereco_pdf">
            <a :href="item.endereco_pdf" target="_blank">
              <button class="btn botaoacessarobra">
                <span>Acessar Obra</span>
                <i></i>
              </button>
            </a>
          </td>
          <td>
            <button @click="editObras(item.id)" class="btn btn buttonedit">
              Editar
            </button>
            <button @click="deleteObras(item.id)" class="btn btn buttondelet">
              Excluir
            </button>
          </td>
          <td>
            <button
              @click="approvObras(item.id)"
              class="btn"
              :class="{
                'btn-warning': item.aprovado === 0,
                'btn-success': item.aprovado === 1,
              }"
            >
              {{ item.aprovado === 1 ? 'Aprovada' : 'Pendente' }}
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
  name: 'ObraEditList',
  data() {
    return {
      obras: [],
    }
  },
  methods: {
    getObras() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/lista_obra_adm`)
        .then((res) => {
          this.obras = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteObras(id) {
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
    approvObras(id) {
      axios
        .patch(`${process.env.VUE_APP_API_URL}/obra/approv/${id}`)
        .then(() => {
          this.getObras()
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getObras()
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
.botaoacessarobra {
  background-color: #343a40;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  color: #f2f2f2;
  text-transform: capitalize;
  cursor: pointer;
  transition: all ease 0.5s;
  align-items: center;
  gap: 5px;
  padding: 8px 4px;
}
</style>
