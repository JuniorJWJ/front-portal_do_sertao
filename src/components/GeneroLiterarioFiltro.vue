<template>
  <div>
    <ul>
      <li
        v-for="nomegeneroliterario in GenerosLiterarios.generoLiterario"
        :key="nomegeneroliterario.nome"
        :value="nomegeneroliterario.id"
      >
        {{ nomegeneroliterario.nome }}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'GeneroLiterarioFiltro',
  data() {
    return {
      GenerosLiterarios: [],
    }
  },
  methods: {
    getGenerosLiterarios() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/lista_generos_literarios`)
        .then((res) => {
          this.GenerosLiterarios = res.data
          console.log(this.GenerosLiterarios)
          console.log('cheguei')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getGenerosLiterarios()
  },
}
</script>

<style scoped>
/* .container{
    background-color: beige;
    margin: 10px;
   }
   ul{
        background:silver;
        font-family:"Comic Sans MS";
        float: left;
        width: 10%;
        height: 900px;
   } */
</style>
