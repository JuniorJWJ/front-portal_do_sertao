    <template>
        <div>
            <h2 class="titulo"> Cadastrar Obra</h2>
            <form class="form-group container" @submit="onSubmit" enctype="multipart/form-data">
                <div class="">
                    <label for="nome">Obra</label>
                    <input 
                        type="text"    
                        id="nome" 
                        name="nome" 
                        class="form-control"    
                        v-model="nome" 
                    />
                    
                    <label for="select_autor">Autor</label>
                    <select name="select_autor" id="select_autor" v-model="select_autor" class="form-select">
                        <option v-for="nomeautor in autores.autor" :key="nomeautor.nome" :value="nomeautor.id">
                                {{ nomeautor.id }} {{nomeautor.nome}}
                        </option>
                    </select>

                    <label for="select_genero_literario">Gênero Literário</label>
                    <select name="select_genero_literario" id="select_genero_literario" v-model="select_genero_literario" class="form-select">
                        <option v-for="nomegeneroliterario in GenerosLiterarios.generoLiterario" :key="nomegeneroliterario.nome" :value="nomegeneroliterario.id">
                                {{nomegeneroliterario.nome}}
                        </option>
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
            </form>
        </div>
    </template>

    <script>
        import axios from "axios"
        
        export default {
            name: "FormEditAutor",
            data(){
                return{
                    autores: [],
                    GenerosLiterarios: [],
                    nome: "",
                    select_autor: "",
                    select_genero_literario: "",
                    file:"",
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
                    formData.append('select_autor', this.select_autor)
                    formData.append('select_genero_literario', this.select_genero_literario)
                    console.log(formData)
                    try{
                        await axios.post('http://localhost:3000/create_obra', formData);
                        this.$router.push({name: "ObraView"})
                    }catch(err){
                        console.log(err)
                    }
                },
                getAutores() {
                    axios
                    .get(`http://localhost:3000/lista_autor`)
                    .then((res) => {
                        this.autores = res.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                },
                getGenerosLiterarios() {
                    axios
                    .get(`http://localhost:3000/lista_generos_literarios`)
                    .then((res) => {
                        this.GenerosLiterarios = res.data;
                        console.log(this.GenerosLiterarios)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            },
            mounted () {
                this.getGenerosLiterarios(),
                this.getAutores()
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