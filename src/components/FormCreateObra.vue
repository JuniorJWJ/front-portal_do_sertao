<template>
    <div>
        <h2 class="titulo"> Cadastrar Obra:</h2>
        <form class="form-group" @submit="onSubmit" enctype="multipart/form-data">
            <fieldset class="grupo">
                <div class="campo">
                    <label for="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome"
                        v-model="nome"
                    /><br>
                    
                    <label for="select_cidade">Autor:</label>
                    <select name="select_cidade" id="select_cidade" v-model="select_cidade">
                        <option v-for="nomecidade in cidades.cidade" :key="nomecidade.nome" :value="nomecidade.id">
                                {{nomecidade.nome}}
                        </option>
                    </select>

                
                    <label for="select_cidade">Gênero Literário:</label>
                    <select name="select_cidade" id="select_cidade" v-model="select_cidade">
                        <option v-for="nomecidade in cidades.cidade" :key="nomecidade.nome" :value="nomecidade.id">
                                {{nomecidade.nome}}
                        </option>
                    </select>
                    
                    <input 
                        type="file"
                        ref="file"
                        @change="onSelect"
                    >
                </div>
            </fieldset>
            <button type="submit">Salvar alterações</button>
        </form>
    </div>
</template>

<script>
    import axios from "axios"
    
    export default {
        name: "FormEditAutor",
        data(){
            return{
                id: this.$route.params.id,
                autor: [],
                cidades: [],
                nome: "",
                profissao: "",
                biografia: "",
                email: "",
                select_cidade: "",
                genero: "",
                file:"",
                message: "",
            }
        },
        methods: {
            async onSelect(){
                const file = this.$refs.file.files[0]
                this.file = file
                console.log(this.file.name)
            },
            async onSubmit(e){
                e.preventDefault();
                const formData = new FormData();
                formData.append('file', this.file)
                formData.append('nome', this.nome)                
                formData.append('profissao', this.profissao)
                formData.append('biografia', this.biografia)
                formData.append('email', this.email)
                formData.append('id_cidade', this.select_cidade )
                formData.append('genero', this.genero)
                console.log(formData)
                try{
                    await axios.post('http://localhost:3000/create_autor', formData);
                    this.$router.push({name: "AutorView"})
                }catch(err){
                    console.log(err)
                }
            },
            async createAutor(e){
                e.preventDefault();
                console.log("enviou o form")
                console.log(this.file)
                //teste a seguir 
                const data = {
                    nome: this.nome,
                    profissao: this.profissao,
                    biografia: this.biografia,        
                    email: this.email,
                    id_cidade: this.select_cidade,
                    genero: this.genero,  
                    endereco_foto: this.file ? `http://localhost:3000/images/${this.file.name}` : ''
                }
                console.log(data)
                const dataJson = JSON.stringify(data)
                // const res = 
                await fetch(`http://localhost:3000/create_autor`, {
                    method : "POST",
                    headers: { "content-type": "application/json"},
                    //credentials: "include",
                    // mode: 'no-cors',
                    body: dataJson
                })
                // const tokenjwt = (await res.json()).token
                
                // localStorage.setItem('token', tokenjwt);

                this.$router.push({name: "AutorView"})
                // console.log(tokenjwt)
            },
            getCidades() {
                axios
                .get(`http://localhost:3000/lista_cidade`)
                .then((res) => {
                    this.cidades = res.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
        mounted () {
            this.getCidades()
        }
    }
</script>
    
<style scoped>
    img{
      width: 60px;
      height: 60px 
   }
</style>