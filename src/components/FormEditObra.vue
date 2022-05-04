<template>
    <div>
        {{ id }} <br>
        {{ obra }} <br>
        {{ obra.id_autor}} <br>
        <h2 class="titulo"> Alterar Obra:</h2>
        <form class="form-group" @submit="updateObra" enctype="multipart/form-data">
            <fieldset class="grupo">
                <div class="campo">
                    <label for="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome"
                        v-model="obra.nome"
                    />
                    <br>
                    
                    <label for="select_autor">Autor:</label>
                    <select name="select_autor" id="select_autor" v-model="obra.id_autor">
                        <option v-for="autorselecionado in autores.autor" :key="autorselecionado.nome" :value="autorselecionado.id" :selected= "autorselecionado.id == obra.id_autor">
                                 {{ autorselecionado.id }} {{autorselecionado.nome}}
                        </option>
                    </select> 
                    <br>
                    <label for="select_genero_literario">Gênero Literário:</label>
                    <select name="select_genero_literario" id="select_genero_literario" v-model="obra.id_genero_literario">
                        <option v-for="nomegeneroliterario in GenerosLiterarios.generoLiterario" :key="nomegeneroliterario.nome" :value="nomegeneroliterario.id" :selected= "obra.id_genero_literario == nomegeneroliterario.id">
                                {{nomegeneroliterario.nome}}
                        </option>
                    </select> 
                    <br>
                    
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
                obra: [], 
                autores: [],
                GenerosLiterarios: [],
                nome: "",
                // id_autor: "",
                select_autor: "",
                select_genero_literario: "",
                file: ""
            }
        },
        methods: {
            async onSelect(){
                const file = this.$refs.file.files[0]
                this.file = file
                // this.autor.endereco_foto = this.file.nome
                // this.autor.endereco_foto = URL.createObjectURL(file)
                // console.log(this.file.name)
            },
            async updateObra(e){
                e.preventDefault();
                const formData = new FormData();
                console.log(formData)
                formData.append('file', this.obra.file)
                formData.append('nome', this.obra.nome)                
                // formData.append('select_autor', this.obra.select_autor)
                formData.append('select_autor', this.obra.id_autor)
                formData.append('select_genero_literario', this.obra.id_genero_literario)
                console.log(formData)
                for (var pair of formData.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]); 
                }
                try{
                    await axios.put(`http://localhost:3000/obra/update/${this.id}`, formData);
                    this.$router.push({name: "ObraEditList"})
                }catch(err){
                    console.log(err)
                }
            },
            getObra(id) {
                axios
                .get(`http://localhost:3000/obra/${id}`)
                .then((res) => {
                    this.obra = res.data.obra[0];
                    console.log(this.obra)
                })
                .catch((error) => {
                    console.log(error);
                });
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
            },
        },
        mounted () {
            this.getObra(this.$route.params.id),
            this.getAutores(),
            this.getGenerosLiterarios()
        }
    }
</script>
    
<style scoped>
    img{
      width: 60px;
      height: 60px 
   }
   .preview-image{
       width: 327px;
       height: 184px
    }
</style>