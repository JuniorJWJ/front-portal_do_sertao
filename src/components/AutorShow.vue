<template>
  <div class="body">
    <section id="main">
      <div id="foto" v-for="item in autor.autor" :key="item.id">
        <img :src="item.endereco_foto" />
      </div>
      <div class="content" v-for="item in autor.autor" :key="item.id">
        <div>
          <article>
            <span>Nome</span>
            <h5>{{ item.nome }}</h5>
          </article>

          <article>
            <span>Profissão</span>
            <h5>{{ item.profissao }}</h5>
          </article>
        </div>

        <div>
          <article>
            <span>Email</span>
            <h5>{{ item.email }}</h5>
          </article>

          <article>
            <span>Cidade</span>
            <h5>{{ item.id_cidade }}</h5>
          </article>
        </div>

        <div>
          <article>
            <span>Biografia</span>
            <h5>{{ item.biografia }}</h5>
          </article>
        </div>
      </div>
    </section>
    <h2>Obras publicadas:</h2>
    <div class="obrasContainer">
      <div
        class="container"
        v-for="item in obras.obra"
        :key="item.id"
        @click="show_obra(item.id)"
      >
        <span>{{ item.nome }}</span>
        <i class="bi-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AutorShow',
  data() {
    return {
      id: this.$route.params.id,
      autor: [],
      cidades: [],
      obras: [],
      nome: '',
      profissao: '',
      biografia: '',
      email: '',
      select_cidade: '',
      select_genero: '',
    }
  },
  methods: {
    getAutor(id) {
      axios
        .get(`${process.env.VUE_APP_API_URL}/autor/${id}`)
        .then((res) => {
          this.autor = res.data
          console.log(this.autor.autor[0].id_cidade)
          this.getCidade(this.autor.autor[0].id_cidade)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCidade(id) {
      axios
        .get(`${process.env.VUE_APP_API_URL}/cidade/${id}`)
        .then((res) => {
          this.cidade = res.data.cidade
          console.log(this.cidade[0].nome)
          this.autor.autor[0].id_cidade = this.cidade[0].nome
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getObras() {
      axios
        .get('${process.env.VUE_APP_API_URL}/lista_obra')
        .then((res) => {
          this.obras = res.data
          this.obras.obra = this.obras.obra.filter(
            (item) => item.id_autor == this.id
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
    show_obra(id) {
      this.$router.push({ name: 'ObraShow', params: { id: id } })
    },
  },
  mounted() {
    this.getAutor(this.$route.params.id), this.getObras()
  },
}
</script>

<style scoped>
.body {
  text-align: left;
}
#main {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  text-align: left;
  margin-bottom: 30px;
}
#foto img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.content {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.content div {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.content div article {
  max-width: 300px;
  word-wrap: break-word;
}
.obrasContainer {
  display: grid;
  grid-template-columns: auto auto;
  gap: 15px;
}
.container {
  background-color: #fafafa;
  box-shadow: 3px 2px 7px rgba(0, 0, 0, 0.15);
  border: 1px solid #d2d2d2;
  border-radius: 16px;
  font-size: 22px;
  color: #3b3b3b;
  width: 100%;
  padding: 10px 15px;
  text-transform: capitalize;
  cursor: pointer;
  transition: all ease 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container:hover {
  background-color: #a2691a;
  color: #f2f2f2;
}
img {
  width: 180px;
  height: 180px;
}
</style>
