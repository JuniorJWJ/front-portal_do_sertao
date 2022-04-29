<template>
    {{ id }}
    <div  v-for="item in autor.autor" :key="item.id">
        <p>Nome:{{ item.nome }}</p>
        <p>Profissão:{{ item.profissao }}</p>
        <p>Email:{{ item.email }}</p>
        <p>Biografia:{{ item.biografia }}</p>
        <p>Gênero:{{ item.genero }}</p>
        <p>Cidade:{{ item.id_cidade }}</p>
        <img :src="item.endereco_foto"/>
    </div>
</template>

<script>
    import axios from "axios"
    
    export default {
        name: "AutorShow",
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
            }
        },
        methods: {
            getAutor(id) {
                axios
                .get(`http://localhost:3000/autor/${id}`)
                .then((res) => {
                    this.autor = res.data;
                    console.log(this.autor)
                    //this.autor = JSON.parse(this.autor)
                    //console.log(this.autor)
                    //this.autor = JSON.stringify(this.autor)
                    //console.log(this.autor)
                    //this.autor = JSON.parse(this.autor)
                    //console.log(this.autor)
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