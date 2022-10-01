<template>
  <header>
    <div>
      <a class="logo" href="#"><img src="../assets/logo-4.png" alt=""></a>
    </div>

    <nav @click="setActiveNav()">
      <router-link to="/" :class="[activeNavItem == '/' ? 'activeItem' : '']">Home</router-link> 
      <router-link to="/list_obra" :class="[activeNavItem === '/list_obra' ? 'activeItem' : '']">Obras</router-link> 
      <router-link to="/list_autor" :class="[activeNavItem === '/list_autor' ? 'activeItem' : '']">Autores</router-link> 
      <a aria-current="page" href="#" :class="[activeNavItem === '#' ? 'activeItem' : '']">Sobre</a>

      <router-link v-show="token" to="/edit_autor_list" :class="[activeNavItem === '/edit_autor_list' ? 'activeItem' : '']">Editar Autor</router-link> 
      <router-link v-show="token" to="/create_obra" :class="[activeNavItem === '/create_obra' ? 'activeItem' : '']">Criar Obra</router-link> 
      <router-link v-show="token" to="/create_autor" :class="[activeNavItem === '/create_autor' ? 'activeItem' : '']">Criar Autor</router-link>  
      <router-link v-show="token" to="/edit_obra_list" :class="[activeNavItem === '/edit_obra_list' ? 'activeItem' : '']">Editar Obra</router-link> 

      <!-- <router-link class="nav-link active" to="/log_user" @click="deslogUser">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-excel-fill" viewBox="0 0 16 16">
          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.884 4.68 8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 1 1 .768-.64z"/>
        </svg>
      </router-link>  -->
    </nav>

    <div v-if="!token">
      <router-link class="login" to="/log_user">
        <i class="bi-person-circle"></i>
        <span>Login</span>
      </router-link> 
    </div>
  </header>
</template>

<script>
export default {
  name: "NavbarNav",
  data(){
      return{
          token: localStorage.getItem("token"),
          activeNavItem: "/"
      }
  },
  methods: {
    async deslogUser(){
      localStorage.clear();
    },
    setActiveNav(){
      this.activeNavItem = this.$route.path;
    }
  }
}
</script>
<style scoped>
  header{
    background-image: #F2F2F2;
    color: #3B3B3B;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 50px;
    border-bottom: 1px solid #d2d2d28e;
    box-shadow: 1px 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
  }
  nav a {
    color: #a2691a;
    font-size: 25px;
    font-weight: 500;
    text-decoration: none;
    margin-left: 20px;
  }
  .activeItem,
  nav a:hover {
    border-bottom: 2px solid #a2691a;
    padding-bottom: 5px;
  }
  .logo img {
    width: 100px;
  }
  .login {
    background-color: #a2691a;
    border-radius: 10px;
    border: none;
    font-size: 22px;
    color: #F2F2F2;
    text-transform: capitalize;
    padding: 5px 10px;
    margin: 10px 0;
    cursor: pointer;
    transition: all ease .5s;
    text-decoration: none;
  }

  .login:hover {
    background-color: #c9872c;
  }
  .login i {
    color: #f2f2f2;
    margin-right: 5px;
  }
</style>