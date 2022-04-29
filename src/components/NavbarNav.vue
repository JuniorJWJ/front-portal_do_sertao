<template>
<div>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Logo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/list_obra">Obras</router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/list_autor">Autores</router-link> 
          </li>
          <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Sobre</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/edit_autor_list">Edit list</router-link> 
          </li>
        </ul>
      </div>
      <div class="form-inline my-2 my-lg-0">
        <router-link class="nav-link active" to="/log_user">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
        </router-link> 
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: "NavbarNav"
}
</script>
<style scoped>
 
</style>y