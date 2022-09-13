<template>
    <div>
        <h1>Autores</h1>
        <!-- {{autores}} -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Foto</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in autores.autor" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.nome }}</td>
              <td>
                <!-- <img width="100px" height="100px" src="{{ item.endereco_foto }}" alt=""> -->
                <!-- <v-img :src="{{ item.endereco_foto }}"></v-img> -->
                <img :src="item.endereco_foto"/>
              </td>
              <td>
                <button @click="editAutores(item.id)" class="btn btn-info">Editar</button>
                <button @click="deleteAutores(item.id)" class="btn btn-danger">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>
<script>
  import axios from "axios"
  export default {
    name: "AutorEditList",
    data() {
      return {
        autores: [],
        lista_autores: null,
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
      deleteAutores(id){
        axios
          .delete(`http://localhost:3000/autor/delete/${id}`)
          .then(() => {
            this.getAutores()
          })
          .catch((error) => {
            console.log(error);
          });
      },
      editAutores(id){
        this.$router.push({name: "AutorEditView", params: {id: id}})
      },
    },
    mounted () {
        this.getAutores() 
    }
  }
</script>

<style scoped>
   img{
      width: 60px;
      height: 60px 
   }
</style>