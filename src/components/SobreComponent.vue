<template>
    <div class="about">
      <header class="header">
        <h1 class="logo">Portal do Sertão</h1>
        <nav class="nav">
          
        </nav>
      </header>
      <main class="main">
        <div class="about-content">
          <h2 class="about-title">Sobre o Portal do Sertão</h2>
          <p class="about-description">
            O Portal do Sertão é uma plataforma dedicada à promoção da cultura e literatura do sertão brasileiro. Aqui você encontrará uma variedade de obras literárias, informações históricas, e conteúdo relacionado à rica tradição sertaneja.
          </p>
          <img class="about-image" src="caminho/para/a/sua/foto.jpg" alt="Foto do Sertão">
        </div>
      </main>
      <footer class="footer">
        <p class="footer-text">
          © 2023 Portal do Sertão. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SobreComponent',
    data() {
      return {
        activeNavItem: '', // Certifique-se de definir o valor adequado para a rota ativa
      }
    },
  }
  </script>
  
  <style scoped>
  /* Estilos CSS para o componente About */
  .about {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .header {
    background-color: #333;
    padding: 20px;
  }
  
  .logo {
    color: #fff;
    font-size: 24px;
    margin: 0;
  }
  
  .nav {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  
  .nav-link {
    color: #fff;
    text-decoration: none;
    margin-left: 20px;
  }
  
  .nav-link.active {
    font-weight: bold;
  }
  
  .main {
    flex: 1;
  }
  
  .about-content {
    padding: 60px 20px;
    text-align: center;
  }
  
  .about-title {
    font-size: 32px;
    margin: 0 0 20px;
  }
  
  .about-description {
    color: #666;
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .about-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .footer {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  .footer-text {
    margin: 0;
  }
  </style>
  