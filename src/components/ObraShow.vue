<template>
    <div >
        <div>
            id:{{ obra.id }}
            <br>
            Nome da Obra: {{ obra.nome }}
            <br>
            Autor: {{ obra.id_autor}}
            <br>
            Gênero literário: {{ obra.id_genero_literario}}
            <div @click="go_link()">
                Link  <a :href='obra.endereco_pdf'>{{obra.nome}}</a>
            </div>
           
        </div>
        <div>
            
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    
    export default {
        name: "AutorShow",
        data(){
            return{
                id: this.$route.params.id,
                obra: [],
                id_autor: "",
                nome: "",
                endereco_pdf: "",
                genero_literario: "",
            }
        },
        methods: {
            getObra(id) {
                axios
                .get(`http://localhost:3000/obra/${id}`)
                .then((res) => {
                    this.obra = res.data.obra[0];
                    // console.log(this.obra);
                    this.getAutor(this.obra.id_autor);
                    // console.log(this.obra.id_genero_literario);
                    this.getGeneroLiterario(this.obra.id_genero_literario)

                })
                .catch((error) => {
                    console.log(error);
                });
            },
            getAutor(id) {
                axios
                .get(`http://localhost:3000/autor/${id}`)
                .then((res) => {
                    this.autor = res.data.autor;
                    // console.log(this.autor[0].nome)
                    this.obra.id_autor = this.autor[0].nome;
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            getGeneroLiterario(id) {
                axios
                .get(`http://localhost:3000/genero_literario/${id}`)
                .then((res) => {
                    this.genero_literario = res.data.generoLiterario;
                    // console.log(this.genero_literario)
                    // console.log(this.genero_literario[0].nome)
                    this.obra.id_genero_literario = this.genero_literario[0].nome;
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            go_link(){
                 window.location.href = this.obra.endereco_pdf;
            }
        },
        created() {
            this.getObra(this.$route.params.id)
        },
    }
</script>
    
<style scoped>
    img{
      width: 60px;
      height: 60px 
   }
</style>