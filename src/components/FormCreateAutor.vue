<template>
    <div>
        <h2 class="titulo"> Criar autor</h2>
        <form class="form-group container" @submit="onSubmit" enctype="multipart/form-data">
            <fieldset class="grupo">
                <div class="campo">

                    <label for="nome">Autor</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome"
                        v-model="nome"
                        class="form-control"
                    />
                    
                    <label for="Email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        v-model="email"
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
                        v-model="biografia">
                    </textarea>

                    <label for="select_cidade">Cidade</label>
                    <select name="select_cidade" id="select_cidade" v-model="select_cidade" class="form-select">
                        <option v-for="nomecidade in cidades.cidade" :key="nomecidade.nome" :value="nomecidade.id">
                                {{nomecidade.nome}}
                        </option>
                    </select>

                    <label for="genero">Gênero</label>
                    <select v-model="genero" name="genero" id="genero" class="form-select">
                        <option disabled value=""></option>
                        <option>Masculino </option>
                        <option>Feminino</option>
                        <option>Prefiro não dizer</option>
                    </select>
                    
                    
                    <input 
                        type="file"
                        ref="file"
                        @change="onSelect"
                        class="form-control" 
                        id="customFile"
                    >
                    <button type="submit" class="btn btn-success">Salvar</button>
                </div>
            </fieldset>
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
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    img{
      width: 60px;
      height: 60px 
    }
    label{
        text-align: left;
        display: flex;
        margin-top: 12px;
    }
    button{
        margin-top: 12px;
        width: 100%;
        text-transform: uppercase;
    }
    #customFile{
        margin-top: 12px;
    }
</style>