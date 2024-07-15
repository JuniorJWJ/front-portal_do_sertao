<template>
  <div class="about">
    <!-- <header class="header">
      <h1 class="logo">Portal do Sertão</h1>
      <nav class="nav"></nav>
    </header> -->
    <main class="main">
      <div class="about-content">
        <!-- <img
          class="about-image"
          src="caminho/para/a/sua/foto.jpg"
          alt="Foto do Sertão"
        /> -->
        <h2 class="about-title">
          Portal Literário do Sertão: Uma Janela para a Expressão Cultural Local
        </h2>
        <p class="about-description">
          O Portal Literário do Sertão surge como uma iniciativa inovadora para
          democratizar o acesso à cultura e ampliar as vozes literárias da
          região nordestina. Através de uma plataforma online, o portal oferece
          aos autores residentes no Portal do Sertão um espaço virtual gratuito
          para divulgar suas obras, conectar-se com outros escritores e
          leitores, e contribuir para o enriquecimento do panorama cultural
          regional.
        </p>
        <h2 class="about-title">Sobre o Portal Literário do Sertão</h2>
        <p class="about-description">
          O Portal Literário do Sertão é uma plataforma dedicada à promoção da
          cultura literária da área que compreende o portal do sertão. Aqui você
          encontrará uma variedade de obras literárias, informações históricas,
          e conteúdo relacionado à rica tradição sertaneja.
        </p>
        <p class="about-description">
          Esta proposta parte de uma pesquisa situada no campus IFBA, de Feira
          de Santana, com o intuito de analisar um sistema de banco de dados
          digital, construído no âmbito do PIBIT, com bolsa FAPESB, para
          gerenciamento (armazenamento e disponibilização ao público) de obras
          literárias de autores da região do Portal do Sertão, possibilitando
          além da catalogação das obras, o acesso dessa produção literária pela
          comunidade através de um Website. Com o intuito de valorizar as obras
          locais, na primeira etapa, foi desenvolvido um sistema que pudesse
          armazenar obras literárias que serão disponibilizadas pelos autores da
          região. Este projeto de TCC( trabalho de conclusão do curso), por essa
          razão,é fruto de um trabalho de pesquisa da professora Juliana.
        </p>
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.about-content {
  max-width: 800px;
  padding: 60px 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.about-title {
  font-size: 32px;
  margin: 0 0 20px;
}

.about-subtitle {
  font-size: 24px;
  margin: 20px 0 10px;
}

.about-description {
  color: #666;
  font-size: 18px;
  margin-bottom: 20px;
}

.about-list {
  list-style: none;
  padding: 0;
}

.about-item {
  margin-bottom: 15px;
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
