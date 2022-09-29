<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light nav1">
      <div class="container-fluid dentronav">
        <a class="navbar-brand logo" href="#">Logo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link navlink" to="/">Home</router-link> 
            </li>
            <li class="nav-item">
              <router-link class="nav-link navlink" to="/list_obra">Obras</router-link> 
            </li>
            <li class="nav-item">
              <router-link class="nav-link navlink" to="/list_autor">Autores</router-link> 
            </li>
            <li class="nav-item">
                <a class="nav-link navlink" aria-current="page" href="#">Sobre</a>
            </li>
            <template v-if="token">
              <li class="nav-item">
                <router-link class="nav-link navlink" to="/edit_autor_list">Editar Autor</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link navlink" to="/create_obra">Criar Obra</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link navlink" to="/create_autor">Criar Autor</router-link>  
              </li>
              <li class="nav-item">
                <router-link class="nav-link navlink" to="/edit_obra_list">Editar Obra</router-link> 
              </li>
              <div class="form-inline my-2 my-lg-0">
                <router-link class="nav-link active" to="/log_user" @click="deslogUser">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-excel-fill" viewBox="0 0 16 16">
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.884 4.68 8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 1 1 .768-.64z"/>
                  </svg>
                </router-link> 
              </div>
            </template>
          </ul>
        </div>
        <div class="form-inline my-2 my-lg-0" v-if="!token">
          <router-link class="nav-link active" to="/log_user">
            <img src="../assets/login.png" alt="Italian Trulli">
          </router-link> 
        </div>
      </div>
    </nav>
  </div>

</template>

<script>
export default {
  name: "NavbarNav",
  data(){
      return{
          token: localStorage.getItem("token")
      }
  },
  methods: {
    async deslogUser(){
      localStorage.clear();
    }
  }
}
</script>
<style scoped>
  .nav1{
    background-image: url("../assets/nav.jpg");
    color: white;
    height: 130px;
    font-size: 25px;
  }
  .dentronav{
    max-width: 1123px;
    align-items: center;
  }
  .navlink{
    color: white; 
  }
  img{
    width: 50px;
  }
</style>