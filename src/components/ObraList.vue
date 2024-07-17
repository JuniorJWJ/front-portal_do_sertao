<template>
  <div id="mainObra">
    <div id="barraLateralObra">
      <ul>
        <li
          v-for="nomegeneroliterario in GenerosLiterarios.generoLiterario"
          :key="nomegeneroliterario.nome"
          :value="nomegeneroliterario.id"
          @click="toggleFilterOption(nomegeneroliterario.id)"
          :class="[
            activeFilterOption === nomegeneroliterario.id ? 'activeOption' : '',
          ]"
        >
          {{ nomegeneroliterario.nome }}
          <i
            v-show="activeFilterOption === nomegeneroliterario.id"
            class="bi-check"
          ></i>
        </li>
      </ul>
    </div>
    <section id="listaObraMain">
      <div id="pesquisaObra">
        <input
          placeholder="Pesquisar obra"
          class="form-control inputsearch"
          v-model="searchQuery"
        />
      </div>
      <div v-if="resultQuery.length === 0" class="no-results">
        Nenhuma obra encontrada.
      </div>
      <article
        v-else
        class="container"
        v-for="r of resultQuery"
        :key="r.id"
        @click="show_obra(r.id)"
      >
        {{ r.nome }}
        <i class="bi-chevron-right"></i>
      </article>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ObraList',
  data() {
    return {
      obras: { obra: [] }, // Inicializando obras.obra como array vazio
      searchQuery: null,
      activeFilterOption: '',
      GenerosLiterarios: { generoLiterario: [] }, // Inicializando GenerosLiterarios como objeto com array vazio
    }
  },
  methods: {
    getObras() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/lista_obra`)
        .then((res) => {
          this.obras = res.data || { obra: [] } // Garantindo que obras seja um objeto com a propriedade obra
          console.log('opa')
          console.log(this.obras)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getObrasFiltroGenero(id) {
      axios
        .get(`${process.env.VUE_APP_API_URL}/lista_obra/genero/${id}`)
        .then((res) => {
          this.obras = res.data || { obra: [] } // Garantindo que obras seja um objeto com a propriedade obra
          console.log('procurei no banco')
          console.log(this.obras.length)
        })
        .catch((error) => {
          console.log(error)
          this.obras = []
        })
    },
    getGenerosLiterarios() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/lista_generos_literarios`)
        .then((res) => {
          this.GenerosLiterarios = res.data || { generoLiterario: [] } // Garantindo que GenerosLiterarios seja um objeto com array vazio
        })
        .catch((error) => {
          console.log(error)
        })
    },
    show_obra(id) {
      this.$router.push({ name: 'ObraShow', params: { id: id } })
    },
    toggleFilterOption(itemId) {
      if (this.activeFilterOption === itemId) {
        this.activeFilterOption = ''
        this.getObras()
        return
      }

      this.getObrasFiltroGenero(itemId)
      this.activeFilterOption = itemId
    },
  },
  mounted() {
    this.getObras()
    this.getGenerosLiterarios()
  },
  computed: {
    resultQuery() {
      if (this.searchQuery && this.obras.obra) {
        return this.obras.obra.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => item.nome.toLowerCase().includes(v))
        })
      } else {
        return this.obras.obra || [] // Garantindo que seja um array
      }
    },
  },
}
</script>

<style scoped>
#barraLateralObra {
  display: flex;
  text-align: left;
  outline: none;
  font-size: 22px;
}
#barraLateralObra ul li:hover,
.activeOption {
  background-color: #dad8d8;
}
#mainObra {
  display: flex;
}
#listaObraMain {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.container {
  background-color: #a2691a;
  box-shadow: 3px 2px 7px rgba(0, 0, 0, 0.15);
  border: 1px solid #d2d2d2;
  border-radius: 16px;
  font-size: 22px;
  color: #f2f2f2;
  width: 100%;
  padding: 10px 15px;
  text-transform: capitalize;
  cursor: pointer;
  transition: all ease 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container:hover {
  background-color: #c9872c;
}
ul li {
  list-style-type: none;
}
.inputsearch {
  border-radius: 8px;
  width: 740px;
}
img {
  width: 40px;
}
ul li {
  margin-right: 30px;
  width: 300px;
  padding: 10px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
#barraLateralObra ul li:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#barraLateralObra ul li:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: 1px solid #ccc;
}
.no-results {
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 20px;
}
</style>
