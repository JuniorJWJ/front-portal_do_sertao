<template>
    <div>
      <!-- {{ obras }} -->
        <h1>Chegou aqui</h1>
        <!-- <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Nome" aria-describedby="basic-addon1" v-model="search">
        </div> -->
        <!-- <div class="container" v-for="item in obras.obra" :key="item.id" @click="show_obra(item.id)">
          {{ item.id }}
          {{item.nome}}
        </div> -->
        <!-- <p>*********************</p> -->
        <input v-model="searchQuery">
        <div class="container" v-for="r of resultQuery" :key="r.id" @click="show_obra(r.id)">
          {{r.nome}}
        </div>
    </div>
</template>
<script>
  import axios from "axios"
  export default {
    name: "ObraList",
    data() {
      return {
        obras: [],
        searchQuery: null,
        obra: ""
      }
    },
    methods: {
      getObras() {
        axios
          .get("http://localhost:3000/lista_obra")
          .then((res) => {
            this.obras = res.data;
            console.log(this.obras);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      show_obra(id){
        this.$router.push({name: "ObraShow", params: {id: id}})
      },
    },
    mounted () {
        this.getObras()
    },
    computed: {
      resultQuery() {
        if (this.searchQuery) {
          console.log(this.obras.obra)
          return this.obras.obra.filter(item => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every(v => item.nome.toLowerCase().includes(v));
          });
        } else {
          return this.obras.obra;
        }
      }
  }
  }
</script>

<style scoped>
  .container{
     background-color: beige;
     margin: 10px;
   }
</style>