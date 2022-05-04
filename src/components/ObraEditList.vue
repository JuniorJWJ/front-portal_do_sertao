<template>
    <div>
        <h1>Edit List Obra</h1>
        <!-- {{autores}} -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in obras.obra" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.nome }}</td>
              
              <td>
                <button @click="editObras(item.id)" class="btn btn-info">Editar</button>
                <button @click="deleteObras(item.id)" class="btn btn-danger">Excluir</button>
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
</style>