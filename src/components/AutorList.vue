<template>
  <div id="mainAutor">
    <div id="barraLateralAutor">
      <ul>
        <li
          v-for="nomecidade in Cidade.cidade"
          :key="nomecidade.nome"
          :value="nomecidade.id"
          @click="getAutorFiltroCidade(nomecidade.id)"> 
          {{ nomecidade.nome }}
          <div class="row"></div>
        </li>
      </ul>
    </div>
    <div id="listaAutorMain">
      <div id="pesquisaAutor">
        <input v-model="searchQuery" class="form-control inputsearch" placeholder="Digite o nome do Autor...">
      </div>
      <div class="container" 
        v-for="r of resultQuery" 
        :key="r.id" 
        @click="show_autor(r.id)">
        <img :src="r.endereco_foto"/>
        {{r.nome}}
      </div>
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
        autor: "",
        Cidade: []
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
      getAutorFiltroCidade(id) {
        axios
          .get(`http://localhost:3000/lista_autor/cidade/${id}`)
          .then((res) => {
            this.autores = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      //...
      getCidades() {
        axios
          .get(`http://localhost:3000/lista_cidade`)
          .then((res) => {
            this.Cidade = res.data;
            // console.log(this.GenerosLiterarios)
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
        this.getAutores(), this.getCidades();
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
#barraLateralAutor {
  display: flex;
  text-align: left;
  outline: none;
  font-size: 22px;
}
#mainAutor {
  display: flex;
}
#listaAutorMain {
  text-align: left;
}
.container {
  background-color: #006919;
  margin-top: 10px;
  height: 50px;
  border-radius: 30px;
  font-size: 22px;
  flex-direction: column;
  color: white;
  width: 740px;
}
.container:hover {
  font-weight: bold;
}
img{
  width: 60px;
  border-radius: 50%;
}
ul li{
  list-style-type: none;
}
.inputsearch{
  width: 740px;
  border-radius: 30px;
}
img{
  width: 40px;
}
ul li{
  margin-right: 30px;
  width: 300px;
	padding: 10px; 
	border-top: 1px solid #CCC;
  border-left: 1px solid #CCC;
  border-right: 1px solid #CCC;
}
#barraLateralAutor ul li:first-child{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#barraLateralAutor ul li:last-child{
  border-bottom-left-radius:10px;
  border-bottom-right-radius: 10px;
	border-bottom: 1px solid #CCC;
}
</style>