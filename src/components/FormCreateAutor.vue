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
          <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>

          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            class="form-control"
          />
          <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>

          <label for="confirmpassword">Confirmar senha</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            v-model="confirmpassword"
            class="form-control"
          />
          <span v-if="errors.confirmpassword" class="text-danger">{{ errors.confirmpassword }}</span>

          <label for="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            class="form-control"
          />
          <span v-if="errors.nome" class="text-danger">{{ errors.nome }}</span>

          <label for="Profissão">Profissão</label>
          <input
            type="text"
            id="profissao"
            name="profissao"
            v-model="profissao"
            class="form-control"
          />
          <span v-if="errors.profissao" class="text-danger">{{ errors.profissao }}</span>

          <label for="Biografia">Biografia</label>
          <textarea
            id="biografia"
            name="biografia"
            rows="4"
            cols="50"
            class="form-control"
            v-model="biografia"
          >
          </textarea>
          <span v-if="errors.biografia" class="text-danger">{{ errors.biografia }}</span>

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
          <span v-if="errors.select_cidade" class="text-danger">{{ errors.select_cidade }}</span>

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
          <span v-if="errors.genero" class="text-danger">{{ errors.genero }}</span>

          <input
            type="file"
            ref="file"
            @change="onSelect"
            class="form-control"
            id="customFile"
            accept="image/jpeg, image/pjpeg, image/png"
          />
          <span v-if="errors.file" class="text-danger">{{ errors.file }}</span>

          <button type="submit" class="btn btn-success">Salvar</button>
        </div>
      </fieldset>
    </form>
    <div v-if="showMessage" class="notification">
      {{ notificationMessage }}
    </div>
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
      password: '',
      confirmpassword: '',
      select_cidade: '',
      genero: '',
      file: '',
      message: '',
      errors: {},
      showMessage: false,
      notificationMessage: '',
    }
  },
  methods: {
    async onSelect() {
      const file = this.$refs.file.files[0]
      const acceptedTypes = ['image/jpeg', 'image/pjpeg', 'image/png']
      
      if (file && !acceptedTypes.includes(file.type)) {
        this.errors.file = 'Somente arquivos JPEG e PNG são permitidos.'
        this.file = ''
      } else {
        this.errors.file = ''
        this.file = file
      }
    },
    validateForm() {
      this.errors = {}

      if (!this.email) {
        this.errors.email = 'Email é obrigatório.'
      }
      if (!this.password) {
        this.errors.password = 'Senha é obrigatória.'
      }
      if (!this.confirmpassword) {
        this.errors.confirmpassword = 'Confirmação de senha é obrigatória.'
      } else if (this.password !== this.confirmpassword) {
        this.errors.confirmpassword = 'As senhas não coincidem.'
      }
      if (!this.nome) {
        this.errors.nome = 'Nome é obrigatório.'
      }
      if (!this.profissao) {
        this.errors.profissao = 'Profissão é obrigatória.'
      }
      if (!this.biografia) {
        this.errors.biografia = 'Biografia é obrigatória.'
      }
      if (!this.select_cidade) {
        this.errors.select_cidade = 'Cidade é obrigatória.'
      }
      if (!this.genero) {
        this.errors.genero = 'Gênero é obrigatório.'
      }
      if (!this.file) {
        this.errors.file = 'Foto é obrigatória.'
      }

      return Object.keys(this.errors).length === 0
    },
    async onSubmit(e) {
      e.preventDefault()

      if (!this.validateForm()) {
        return
      }

      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('nome', this.nome)
      formData.append('profissao', this.profissao)
      formData.append('biografia', this.biografia)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('id_cidade', this.select_cidade)
      formData.append('genero', this.genero)

      try {
        await axios.post(
          `${process.env.VUE_APP_API_URL}/create_autor`,
          formData
        )
        this.notificationMessage = 'Seus dados foram recebidos, aguarde a aprovação de seu registro no sistema'
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
          this.$router.push({ name: 'HomeView' })
        }, 5000) // Oculta a notificação após 5 segundos
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
.text-danger {
  color: red;
}
.notification {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #28a745;
  background-color: #d4edda;
  color: #155724;
  border-radius: 5px;
}
</style>
