<template>
    <div>
      <!-- {{ obrasBegin.obra }} -->
      <!-- {{ obras }} -->
        <!-- <h1>Chegou aqui</h1> -->
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
        <div>
          <ul>
              <li v-for="nomegeneroliterario in GenerosLiterarios.generoLiterario" :key="nomegeneroliterario.nome" :value="nomegeneroliterario.id" @click="getObrasFiltroGenero(nomegeneroliterario.id)">
                  {{nomegeneroliterario.id}}{{nomegeneroliterario.nome}}
              </li>
          </ul>
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
        obrasBegin: [],
        searchQuery: null,
        obra: "",
        //...
        GenerosLiterarios: []
      }
    },
    methods: {
      getObras() {
        axios
          .get("http://localhost:3000/lista_obra")
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
      show_obra(id){
        this.$router.push({name: "ObraShow", params: {id: id}})
      },
      searchQueryGenero(id) {
        this.getObras()
        // console.log(id)
        // console.log(this.obras.obra)
        this.obras.obra = this.obrasBegin.obra
        // console.log(this.obras.obra)
        // console.log(this.obras.obra.filter( item  => item.id_genero_literario == id));
        console.log(this.obras.obra, "this.obras.obra antes")
        console.log(this.obrasBegin.obra, "this.obrasBegin.obra antes")
        this.obras.obra = (this.obras.obra.filter( item  => item.id_genero_literario == id))
        console.log(this.obras.obra, "this.obras.obra depois")
        console.log(this.obrasBegin.obra, "this.obrasBegin.obra depois")
      }
    },
    mounted () {
        this.getObras(),
        this.getGenerosLiterarios()
    },
    computed: {
      resultQuery() {
        if (this.searchQuery) {
          //console.log(this.obras.obra)
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
  /* ... */
  ul{
      margin-top: 4%;
        background:silver;
        font-family:"Comic Sans MS";
        /* width: 10%; */
        height: 900px;
        position: fixed;
        top: 0;
        left: 0;
  }
</style>