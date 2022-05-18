<template>
    <div>
        <h1>Chegou aqui</h1>
        <!-- <div class="container" v-for="item in autores.autor" :key="item.id" @click="show_autor(item.id)">
          {{ item.id }}
          {{item.nome}}
          <img :src="item.endereco_foto"/>
        </div> -->
        <input v-model="searchQuery">
        <div class="container" v-for="r of resultQuery" :key="r.id" @click="show_autor(r.id)">
          {{r.nome}}
          <img :src="r.endereco_foto"/>
        </div>
    </div>
</template>
<script>
  import axios from "axios"
  export default {
    name: "AutorList",
    data() {
      return {
        autores: [],
        searchQuery: null,
        autor: ""
      }
    },
    methods: {
      getAutores() {
        axios
          .get("http://localhost:3000/lista_autor")
          .then((res) => {
            this.autores = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      show_autor(id){
        this.$router.push({name: "AutorShow", params: {id: id}})
      },
    },
    mounted () {
        this.getAutores() 
    },
    computed: {
      resultQuery() {
        if (this.searchQuery) {
          console.log(this.autores.autor)
          return this.autores.autor.filter(item => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every(v => item.nome.toLowerCase().includes(v));
          });
        } else {
          return this.autores.autor;
        }
      }
    }
  }
</script>

<style scoped>
   img{
      width: 60px;
      height: 60px 
   }
   .container{
     background-color: beige;
     margin: 10px;
   }
</style>