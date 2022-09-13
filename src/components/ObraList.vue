<template>
  <div id="mainObra">
    <div id="barraLateralObra">
      <ul>
        <li
          v-for="nomegeneroliterario in GenerosLiterarios.generoLiterario"
          :key="nomegeneroliterario.nome"
          :value="nomegeneroliterario.id"
          @click="getObrasFiltroGenero(nomegeneroliterario.id)"
        >
          {{ nomegeneroliterario.nome }}
          <div class="row"></div>
        </li>
      </ul>
    </div>
    <div id="listaObraMain">
      <div id="pesquisaObra">
        <input placeholder="Pesquisar obra" class="form-control inputsearch"  v-model="searchQuery" />
      </div>
      <div
        class="container"
        v-for="r of resultQuery"
        :key="r.id"
        @click="show_obra(r.id)"
      >
        {{ r.nome }}
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'ObraList',
    data() {
      return {
        obras: [],
        obrasBegin: [],
        searchQuery: null,
        obra: '',
        //...
        GenerosLiterarios: [],
      };
    },
    methods: {
      getObras() {
        axios
          .get('http://localhost:3000/lista_obra')
          .then((res) => {
            this.obras = res.data;
            // this.obrasBegin = res.data;
            // console.log(this.obras);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getObrasFiltroGenero(id) {
        axios
          .get(`http://localhost:3000/lista_obra/genero/${id}`)
          .then((res) => {
            this.obras = res.data;
            // this.obrasBegin = res.data;
            // console.log(this.obras);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      //...
      getGenerosLiterarios() {
        axios
          .get(`http://localhost:3000/lista_generos_literarios`)
          .then((res) => {
            this.GenerosLiterarios = res.data;
            // console.log(this.GenerosLiterarios)
          })
          .catch((error) => {
            console.log(error);
          });
      },
      show_obra(id) {
        this.$router.push({ name: 'ObraShow', params: { id: id } });
      },
    },
    mounted() {
      this.getObras(), this.getGenerosLiterarios();
    },
    computed: {
      resultQuery() {
        if (this.searchQuery) {
          //console.log(this.obras.obra)
          return this.obras.obra.filter((item) => {
            return this.searchQuery
              .toLowerCase()
              .split(' ')
              .every((v) => item.nome.toLowerCase().includes(v));
          });
        } else {
          return this.obras.obra;
        }
      },
    },
  };
</script>

<style scoped>
#barraLateralObra {
  display: flex;
  text-align: left;
  outline: none;
  font-size: 22px;
}
#mainObra {
  display: flex;
}
#listaObraMain {
  text-align: left;
}
.container {
  background-color: beige;
  margin-top: 10px;
  height: 40px;
  border-radius: 30px;
  font-size: 22px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  color: #000;
  width: 740px;
}
.container:hover {
  font-weight: bold;
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
#barraLateralObra ul li:first-child{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#barraLateralObra ul li:last-child{
  border-bottom-left-radius:10px;
  border-bottom-right-radius: 10px;
	border-bottom: 1px solid #CCC;
}
</style>