<template>
    <div class="termos-de-uso">
      <h1>TERMO DE USO DO SITE PORTAL DA LITERATURA DO SERTÃO</h1>
  
      <h2>1. Condições Gerais</h2>
      <p>
        1.1 O site foi desenvolvido no âmbito de pesquisa científica realizada no INSTITUTO FEDERAL DA BAHIA (IFBA) e seus desenvolvedores são os titulares da propriedade intelectual deste website;
      </p>
      <p>
        1.2 Ademais, para o desenvolvimento deste site, os pesquisadores buscaram seguir as diretrizes da Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018; a qual dispõe sobre o tratamento de dados pessoais, inclusive nos meios digitais, por pessoa natural ou por pessoa jurídica de direito público ou privado, com o objetivo de proteger os direitos fundamentais de liberdade e de privacidade e o livre desenvolvimento da personalidade da pessoa natural (Brasil, 2018);
      </p>
      <p>
        1.3 Esta plataforma não visa a obtenção de nenhuma espécie de lucro.
      </p>
  
      <h2>2. Do Objeto</h2> 
      <p> A plataforma proposta não realiza correções de texto ou de conteúdo, pois o seu principal objetivo é oferecer um espaço digital onde autores possam publicar e compartilhar suas obras literárias livremente. O foco está na promoção da literatura local e na democratização do acesso a essas produções, sem interferir no estilo ou nas intenções criativas dos escritores. O ambiente é voltado à expressão literária, servindo como um canal para divulgação e apreciação por parte da comunidade leitora. </p> 
      <p> A plataforma caracteriza-se pela simplicidade de uso e pela valorização da literatura regional, em especial das produções oriundas do 'Portal do Sertão'. Além disso, busca incentivar o engajamento entre autores e leitores, possibilitando a interação através de comentários, avaliações e sugestões, fortalecendo, assim, a troca de experiências literárias e culturais. </p>
      <h2>3. Da responsabilidade pelo material disponibilizado pelos atores</h2>
      <p>
        3.1 Declaro que o conteúdo por mim disponibilizado é inédito e que sou o/a autor/a legítimo/a da obra literária disponibilizada para a publicação e divulgação no site Portal Literário do Sertão;
      </p>
      <p>
        3.1.1 Estou ciente de que sou o/a único/a responsável em caso de plágio ou qualquer outro tipo de violação das normas legais e constitucionais do Brasil;
      </p>
      <p>
        3.1.2 Estou ciente de que a reprodução de material não autorizado é crime de “Violação de direito autoral”, conforme Art. 184, do Código Penal:
      </p>
      <blockquote>
        Violar direitos de autor e os que lhe são conexos. Pena – detenção, de 3 (três) meses a 1 (um) ano, ou multa. (Redação dada pela Lei nº 10.695, de 1º.7.2003)
        <br />
        § 1o Se a violação consistir em reprodução total ou parcial, com intuito de lucro direto ou indireto, por qualquer meio ou processo, de obra intelectual, interpretação, execução ou fonograma, sem autorização expressa do autor, do artista intérprete ou executante, do produtor, conforme o caso, ou de quem os represente: (Redação dada pela Lei nº 10.695, de 1º.7.2003) Pena – reclusão, de 2 (dois) a 4 (quatro) anos, e multa. (Redação dada pela Lei nº 10.695, de 1º.7.2003)
      </blockquote>
      <p>
        3.2 Estou ciente ainda de que, caso minha obra contenha plágio de parte ou da totalidade de qualquer outra obra literária ou ainda de qualquer outro tipo de produção, serei o/a único/a responsável pelo dano material ou moral causado a outrem;
      </p>
      <p>
        3.3 Declaro que, caso eu venha a ser processado pelo conteúdo da obra por mim disponibilizada para publicação e divulgação no site Portal Literário do Sertão, estarei ciente de que o website e seus desenvolvedores não possuem nenhuma responsabilidade;
      </p>
      <p>
        3.3.1 Estou ciente de que só deverei encaminhar para o site textos com conteúdos inéditos, que respeitem os direitos humanos, os valores democráticos, a dignidade da pessoa humana e todas as normas legais e constitucionais do Brasil;
      </p>
      <p>
        3.4 Declaro, ademais, que o conteúdo veiculado não possui qualquer teor desrespeitoso que infrinja os direitos humanos, a dignidade da pessoa humana ou quaisquer outras normas legais e constitucionais.
      </p>
  
      <h2>4. Da autorização de publicação e compartilhamento de conteúdo e imagens</h2>
      <p>
        4.1 Autorizo a divulgação do material encaminhado para a publicação pelo site Portal Literário do Sertão;
      </p>
      <p>
        4.2 Autorizo o uso de minha imagem em todo e qualquer material entre imagens de vídeo, fotos e documentos, para ser utilizada no referido projeto e também nas peças de comunicação que serão veiculadas através dos canais de mídia do IFBA e outras plataformas vinculadas ao IFBA, Feira de Santana;
      </p>
      <p>
        4.3 A presente autorização dos itens 4.1 e 4.2 é concedida a título gratuito. Fica ainda autorizada, de livre e espontânea vontade, para os mesmos fins, a cessão de direitos da veiculação das imagens, não recebendo, para tanto, qualquer tipo de remuneração.
      </p>
  
      <h2>5. Da aceitação dos termos de uso</h2>
      <p>
        Ao utilizar o site Portal Literário do Sertão, declaro que li, entendi e estou de acordo com todas as cláusulas presentes nestes Termos de Uso.
      </p>
  
      <div class="termo-confirmacao">
        <input type="checkbox" id="aceito-termos" v-model="aceitoTermos" />
        <label for="aceito-termos">Declaro que li e aceito os termos de uso</label>
        <button :disabled="!aceitoTermos" @click="confirmarAceitacao">Confirmar Aceitação</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
	name: 'TermosDeUsoComponent',
	data() {
		return {
			activeNavItem: '', // Certifique-se de definir o valor adequado para a rota ativa
		}
	},
    methods: {
      confirmarAceitacao() {
        if (this.aceitoTermos) {
          alert('Você aceitou os termos de uso!');
        } else {
          alert('Por favor, leia e aceite os termos de uso.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .termos-de-uso {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  .termo-confirmacao {
    margin-top: 20px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  
  h1, h2 {
    color: #333;
  }
  
  p {
    text-align: justify;
  }
  
  blockquote {
    margin-left: 20px;
    font-style: italic;
    color: #555;
  }
  </style>
  