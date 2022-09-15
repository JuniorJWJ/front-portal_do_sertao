<template>
    <div id="corpo">  
        <div id="main">
            <div id="dados" v-for="item in autor.autor" :key="item.id">
                <span id="nome">{{ item.nome }}</span>
                {{ item.profissao }}
                {{ item.email }}
                Biografia:{{ item.biografia }}
                Cidade:{{ item.id_cidade }}
            </div>
            <div id="foto" v-for="item in autor.autor" :key="item.id">
                    <img :src="item.endereco_foto"/>
            </div>
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
    #corpo{
        text-align: center; 
    }
    #main{
        display: -webkit-inline-box;
    }
    #nome{
        text-align: left;
    }
    #dados{
        border: 1px solid;
        border-radius: 15%;
        width: 60%;
    }
    #foto{
        margin-left: 50px;
    }
    img{
        border-radius: 50%;
    }
    .container{
        background-color: #006919;
        margin-top: 10px;
        height: 40px;
        border-radius: 30px;
        font-size: 22px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        width: 740px;
   }
    img{
      width: 180px;
      height: 180px 
   }
</style>