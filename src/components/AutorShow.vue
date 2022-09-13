<template>
    {{ id }}
    <div>
        <div  v-for="item in autor.autor" :key="item.id">
            <p>Nome:{{ item.nome }}</p>
            <p>Profissão:{{ item.profissao }}</p>
            <p>Email:{{ item.email }}</p>
            <p>Biografia:{{ item.biografia }}</p>
            <p>Gênero:{{ item.genero }}</p>
            <p>Cidade:{{ item.id_cidade }}</p>
            <img :src="item.endereco_foto"/>
        </div>
        <div>
            <h2>Obras publicadas:</h2>
            <div class="container" v-for="item in obras.obra" :key="item.id" @click="show_obra(item.id)">
                {{ item.id }}
                {{item.nome}}
            </div> 
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
                autor: [],
                cidades: [],
                obras: [],
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
                    console.log(this.autor.autor[0].id_cidade)
                    this.getCidade(this.autor.autor[0].id_cidade)

                })
                .catch((error) => {
                    console.log(error);
                });
            },
            getCidade(id) {
                axios
                .get(`http://localhost:3000/cidade/${id}`)
                .then((res) => {
                    this.cidade = res.data.cidade;
                    console.log(this.cidade[0].nome)
                    this.autor.autor[0].id_cidade = this.cidade[0].nome
                })
                .catch((error) => {
                    console.log(error);
                });
            },getObras() {
                axios
                .get("http://localhost:3000/lista_obra")
                .then((res) => {
                    this.obras = res.data;
                    this.obras.obra = (this.obras.obra.filter( item  => item.id_autor == this.id))
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            show_obra(id){
                this.$router.push({name: "ObraShow", params: {id: id}})
            }
        },
        mounted () {
            this.getAutor(this.$route.params.id),
            this.getObras()
        }
    }
</script>
    
<style scoped>
    .container{
        background-color: beige;
        margin: 10px;
   }
    img{
      width: 60px;
      height: 60px 
   }
</style>