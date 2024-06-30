<template>
  <div class="container">
    <article>
      <span>Nome da Obra</span>
      <h5>{{ obra.nome }}</h5>
    </article>
    <article>
      <span>Autor</span>
      <h5>{{ obra.id_autor }}</h5>
    </article>
    <article>
      <span>Gênero literário</span>
      <h5>{{ obra.id_genero_literario }}</h5>
    </article>
    <div class="action">
      <a @click="goBack()">
        <button>
          <i class="bi-chevron-left"></i>
          <span>Voltar</span>
        </button>
      </a>

      <a :href="obra.endereco_pdf" target="_blank">
        <button>
          <span>Acessar Obra</span>
          <i class="bi-chevron-right"></i>
        </button>
      </a>
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
      obra: [],
      id_autor: '',
      nome: '',
      endereco_pdf: '',
      genero_literario: '',
    }
  },
  methods: {
    getObra(id) {
      axios
        .get(`http://localhost:3000/obra/${id}`)
        .then((res) => {
          this.obra = res.data.obra[0]
          // console.log(this.obra);
          this.getAutor(this.obra.id_autor)
          // console.log(this.obra.id_genero_literario);
          this.getGeneroLiterario(this.obra.id_genero_literario)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAutor(id) {
      axios
        .get(`http://localhost:3000/autor/${id}`)
        .then((res) => {
          this.autor = res.data.autor
          // console.log(this.autor[0].nome)
          this.obra.id_autor = this.autor[0].nome
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getGeneroLiterario(id) {
      axios
        .get(`http://localhost:3000/genero_literario/${id}`)
        .then((res) => {
          this.genero_literario = res.data.generoLiterario
          // console.log(this.genero_literario)
          // console.log(this.genero_literario[0].nome)
          this.obra.id_genero_literario = this.genero_literario[0].nome
        })
        .catch((error) => {
          console.log(error)
        })
    },
    goBack() {
      window.history.back()
    },
  },
  created() {
    this.getObra(this.$route.params.id)
  },
}
</script>

<style scoped>
img {
  width: 60px;
  height: 60px;
}
.container {
  background-color: #fafafa;
  box-shadow: 3px 2px 7px rgba(0, 0, 0, 0.15);
  border: 1px solid #d2d2d2;
  border-radius: 16px;
  font-size: 22px;
  color: #3b3b3b;
  text-transform: capitalize;
  padding: 0;
  width: 600px;
}
.container article {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d2d2d2a1;
  padding: 10px 20px;
}
.container article h5 {
  font-weight: 500;
}
.container a {
  text-decoration: none;
}
.action {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.container button {
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
  display: flex;
  align-items: center;
  gap: 5px;
}
.container button:hover {
  background-color: #c9872c;
}
</style>
