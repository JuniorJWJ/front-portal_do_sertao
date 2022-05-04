<template>
    <div>
        {{ id }}
        {{ autor }}
        <h2 class="titulo"> Alterar autor:</h2>
        <!-- <form class="form-group" @submit="updateAutor" v-for="item in autor.autor" :key="item.id"> -->        
        <form class="form-group" @submit="updateAutor">
            <fieldset class="grupo">
                <div class="campo">
                    <label for="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome"
                        v-model="autor.nome"
                    /><br>
                    
                    <label for="Email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        v-model="autor.email"
                    /><br>
                
                    <label for="Profissão">Profissão:</label>
                    <input 
                        type="text" 
                        id="profissao" 
                        name="profissao"
                        v-model="autor.profissao"
                    /><br>
                    <label for="Email">Biografia:</label>
                    <textarea
                        id="biografia" 
                        name="biografia" 
                        rows="4" 
                        cols="50"
                        v-model="autor.biografia">
                    </textarea><br>
                    <label for="select_cidade">Cidade:</label>
                    <select name="select_cidade" id="select_cidade" v-model="autor.id_cidade">
                        <option v-for="nomecidade in cidades.cidade" :key="nomecidade.nome" :selected= "autor.id_cidade == nomecidade.id" :value="nomecidade.id" >
                                {{nomecidade.nome}}
                        </option>
                    </select>                    
                    
                    <br>
                    
                    <label for="genero">Gênero</label>
                    <select v-model="autor.genero" name="genero" id="genero">
                        <option disabled value="" :selected= "autor.genero"></option>
                        <option>Masculino </option>
                        <option>Feminino</option>
                        <option>Prefiro não dizer</option>
                    </select>
                    <br>

                    <img :src="autor.endereco_foto"/>
                    <input 
                        type="file"
                        ref="file"
                        @change="onSelect"
                    >
                    <br>
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
                select_genero: "",
                ImagePreview: ""
            }
        },
        methods: {
            
            async onSelect(){
                const file = this.$refs.file.files[0]
                this.file = file
                // this.autor.endereco_foto = this.file.nome
                this.autor.endereco_foto = URL.createObjectURL(file)
                console.log(this.file.name)
            },
            async updateAutor(e){
                e.preventDefault();
                const formData = new FormData();
                console.log(formData)
                formData.append('file', this.file)
                formData.append('nome', this.autor.nome)                
                formData.append('profissao', this.autor.profissao)
                formData.append('biografia', this.autor.biografia)
                formData.append('email', this.autor.email)
                formData.append('id_cidade', this.autor.id_cidade)
                formData.append('genero', this.autor.genero)
                console.log(formData)
                for (var pair of formData.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]); 
                }
                try{
                    await axios.put(`http://localhost:3000/autor/update/${this.id}`, formData);
                    this.$router.push({name: "AutorEditList"})
                }catch(err){
                    console.log(err)
                }
            },
            getAutor(id) {
                axios
                .get(`http://localhost:3000/autor/${id}`)
                .then((res) => {
                    this.autor = res.data.autor[0];
                    console.log(this.autor)
                    console.log("oi")
                })
                .catch((error) => {
                    console.log(error);
                });
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
            },
        },
        mounted () {
            this.getAutor(this.$route.params.id),
            this.getCidades()
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