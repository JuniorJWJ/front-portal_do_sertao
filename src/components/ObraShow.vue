<template>
    <div >
        <div>
            id:{{ obra.id }}
            <br>
            nome: {{ obra.nome }}
            <br>
            autor: {{ obra.id_autor}}
            <br>
            link: {{ obra.endereco_pdf}}
            <br>
            gênero literário: {{ obra.id_genero_literario}}
            <div @click="go_link()"    >
                Link
            </div>
            <a :href='obra.endereco_pdf'>{{obra.nome}}</a>
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
                email: "",
                select_cidade: "",
                select_genero: "",
            }
        },
        methods: {
            getAutor(id) {
                axios
                .get(`http://localhost:3000/obra/${id}`)
                .then((res) => {
                    this.obra = res.data.obra[0];
                    //console.log(this.autor)
                    //this.autor = res.data.autor[0];
                    //console.log(this.autor)
                    console.log(this.obra)
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
                    //console.log(this.cidades);
                    // this.cidades = JSON.stringify(this.cidades)
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            go_link(){
                 window.location.href = this.obra.endereco_pdf;
            }
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
</style>