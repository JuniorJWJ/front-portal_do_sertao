<template>
	<section class="page-surface about" aria-labelledby="sobre-title">
		<div class="about-content">
			<p class="eyebrow">Sobre</p>
			<h1 id="sobre-title" class="page-title">
				Portal Literário do Sertão: uma Janela para a Expressão Cultural Local
			</h1>
				<p class="about-description">
					O Portal Literário do Sertão surge como uma iniciativa inovadora para
					democratizar o acesso à cultura e ampliar as vozes literárias da
					região nordestina. Através de uma plataforma online, o portal oferece
					aos autores residentes no
					<a href="https://www.portaldosertao.ba.gov.br" target="_blank">
						Portal do Sertão
					</a>
					um espaço virtual gratuito para divulgar suas obras, conectar-se com
					outros escritores e leitores, além de contribuir para o enriquecimento
					do panorama cultural regional.
				</p>
				<h2 class="about-title">Sobre o Portal Literário do Sertão</h2>
				<p class="about-description">
					O Portal Literário do Sertão é uma plataforma dedicada à promoção da
					cultura literária da área que compreende o Portal do Sertão. Aqui você
					encontrará uma variedade de obras literárias, informações históricas e
					conteúdos de texto, áudio e vídeo relacionados à rica tradição
					sertaneja.
				</p>
				<p class="about-description">
					Esta proposta parte de uma pesquisa situada no campus IFBA, de Feira
					de Santana, com o intuito de criar um sistema de banco de dados
					digital, construído no âmbito do PIBIC, com bolsa FAPESB, para
					gerenciamento (armazenamento e disponibilização ao público) de obras
					literárias de autores da região do Portal do Sertão, possibilitando
					além da catalogação das obras, o acesso dessa produção literária pela
					comunidade através de um Website.
				</p>
				<p class="about-description">
					Com o intuito de valorizar as obras locais, na primeira etapa, foi
					desenvolvido um sistema que pudesse armazenar e disponibilizar obras
					literárias de autores da região. No âmbito do Trabalho de Conclusão do
					Curso, intitulado Portal Literário do Sertão: especificação, análise e
					implementação, do estudante do Bacharelado em Sistemas de Informação
					do IFBA, campus Feira de Santana, José Wilson Passos dos Santos
					Júnior, o sistema tem sido ampliado e testado, sob orientação da
					Profª. Dra. Juliana de Souza Gomes Nogueira e coorientação do Prof.
					Dr. José Dihego da Silva Oliveira.
				</p>
				<p class="about-description">
					Para tornar-se escritor associado e divulgar, a título gratuito, obra
					e imagem, acesse o
					<router-link to="/termos_de_uso">
						termo de uso e cessão de direitos autorais.
					</router-link>
				</p>
		</div>
	</section>
</template>

<script>
export default {
	name: 'SobreComponent',
}
</script>

<style scoped>
.about {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	justify-items: center;
}

.about-content {
	max-width: 800px;
}

.about-title {
	margin: var(--space-6) 0 var(--space-4);
	font-size: clamp(1.3rem, 2.6vw, 1.7rem);
	font-weight: 800;
}

.about-description {
	color: var(--color-muted);
	font-size: 1.05rem;
	line-height: 1.8;
	margin-bottom: var(--space-4);
	text-align: justify;
	text-indent: 20px;
}
</style>
