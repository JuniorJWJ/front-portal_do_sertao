<template>
  <div>
    <h2 class="titulo">Registrar autor</h2>
    <form
      class="form-group container"
      @submit="onSubmit"
      enctype="multipart/form-data"
    >
      <fieldset class="grupo">
        <div class="campo">
          <label for="Email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            class="form-control"
          />

          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            class="form-control"
          />

          <label for="confirmpassword">Confirmar senha</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            v-model="confirmpassword"
            class="form-control"
          />

          <label for="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            class="form-control"
          />

          <label for="Profissão">Profissão</label>
          <input
            type="text"
            id="profissao"
            name="profissao"
            v-model="profissao"
            class="form-control"
          />

          <label for="Email">Biografia</label>
          <textarea
            id="biografia"
            name="biografia"
            rows="4"
            cols="50"
            class="form-control"
            v-model="biografia"
          >
          </textarea>

          <label for="select_cidade">Cidade</label>
          <select
            name="select_cidade"
            id="select_cidade"
            v-model="select_cidade"
            class="form-select"
          >
            <option
              v-for="nomecidade in cidades.cidade"
              :key="nomecidade.nome"
              :value="nomecidade.id"
            >
              {{ nomecidade.nome }}
            </option>
          </select>

          <label for="genero">Gênero</label>
          <select
            v-model="genero"
            name="genero"
            id="genero"
            class="form-select"
          >
            <option disabled value=""></option>
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Prefiro não informar</option>
          </select>

          <input
            type="file"
            ref="file"
            @change="onSelect"
            class="form-control"
            id="customFile"
          />
          <button type="submit" class="btn btn-success">Salvar</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormEditAutor',
  data() {
    return {
      id: this.$route.params.id,
      autor: [],
      cidades: [],
      nome: '',
      profissao: '',
      biografia: '',
      email: '',
      select_cidade: '',
      genero: '',
      file: '',
      message: '',
    }
  },
  methods: {
    async onSelect() {
      const file = this.$refs.file.files[0]
      this.file = file
      console.log(this.file.name)
    },
    async onSubmit(e) {
      console.log('oi')
      e.preventDefault()
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('nome', this.nome)
      formData.append('profissao', this.profissao)
      formData.append('biografia', this.biografia)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('id_cidade', this.select_cidade)
      formData.append('genero', this.genero)
      console.log(formData)
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/create_autor`, formData)
        this.$router.push({ name: 'HomeView' })
      } catch (err) {
        console.log(err)
      }
    },
    async createAutor(e) {
      e.preventDefault()
      console.log('enviou o form')
      console.log(this.file)
      //teste a seguir
      const data = {
        nome: this.nome,
        profissao: this.profissao,
        biografia: this.biografia,
        email: this.email,
        id_cidade: this.select_cidade,
        genero: this.genero,
        endereco_foto: this.file
          ? `${process.env.VUE_APP_API_URL}/images/${this.file.name}`
          : '',
      }
      console.log(data)
      const dataJson = JSON.stringify(data)
      // const res =
      await fetch(`${process.env.VUE_APP_API_URL}/create_autor`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        //credentials: "include",
        // mode: 'no-cors',
        body: dataJson,
      })
      // const tokenjwt = (await res.json()).token

      // localStorage.setItem('token', tokenjwt);

      this.$router.push({ name: 'AutorView' })
      // console.log(tokenjwt)
    },
    getCidades() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/lista_cidade`)
        .then((res) => {
          this.cidades = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getCidades()
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
img {
  width: 60px;
  height: 60px;
}
label {
  text-align: left;
  display: flex;
  margin-top: 12px;
}
button {
  margin-top: 12px;
  width: 100%;
  text-transform: uppercase;
}
#customFile {
  margin-top: 12px;
}
</style>
