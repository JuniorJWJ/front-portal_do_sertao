<template>
    <div class="corpo">
        <h1 class="title">Obras</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th  class="nomeobratabela" scope="col">Nome</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in obras.obra" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td class="nomeobratabela">{{ item.nome }}</td>
              
              <td>
                <button @click="editObras(item.id)" class="btn btn buttonedit">Editar</button>
                <button @click="deleteObras(item.id)" class="btn btn buttondelet">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>
<script>
  import axios from "axios"
  export default {
    name: "ObraEditList",
    data() {
      return {
        obras: [],
      }
    },
    methods: {
      getObras() {
        axios
          .get("http://localhost:3000/lista_obra")
          .then((res) => {
            this.obras = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      deleteObras(id){
        axios
          .delete(`http://localhost:3000/obra/delete/${id}`)
          .then(() => {
            this.getObras()
          })
          .catch((error) => {
            console.log(error);
          });
      },
      editObras(id){
        this.$router.push({name: "ObraEditView", params: {id: id}})
      },
    },
    mounted () {
        this.getObras() 
    }
  }
</script>

<style scoped>
  img{
    width: 60px;
    height: 60px 
  }
  button{
    margin-left: 10px;
    color: white;
  }
  .buttonedit{
    background: #029bbf;
  }
  .buttondelet{
    background: #e85850;
  }
  .nomeobratabela{
    text-align: left;
  }
  #title{
    padding: 0.5em;
  }
  .corpo{
    height: 100%;
    padding-bottom: 40px;
  }
</style>