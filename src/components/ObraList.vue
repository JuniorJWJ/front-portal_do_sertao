<template>
    <div>
      <!-- {{ obras }} -->
        <h1>Chegou aqui</h1>
        <div class="container" v-for="item in obras.obra" :key="item.id" @click="show_obra(item.id)">
          {{ item.id }}
          {{item.nome}}
        </div>
    </div>
</template>
<script>
  import axios from "axios"
  export default {
    name: "ObraList",
    data() {
      return {
        obras: []
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
    }
  }
</script>

<style scoped>
  .container{
     background-color: beige;
     margin: 10px;
   }
</style>