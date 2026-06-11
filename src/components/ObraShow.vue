<template>
	<section class="page-surface detail-page" aria-labelledby="obra-title">
		<div v-if="loading" class="status-box">Carregando obra...</div>
		<div v-else-if="errorMessage" class="status-box" role="alert">
			{{ errorMessage }}
		</div>
		<template v-else>
			<header class="detail-header">
				<div>
					<p class="eyebrow">Obra</p>
					<h1 id="obra-title" class="page-title">{{ obra.nome }}</h1>
					<p class="muted">{{ autorNome }} · {{ generoNome }}</p>
				</div>
				<div class="actions">
					<button type="button" class="ui-button secondary" @click="goBack">
						Voltar
					</button>
					<a
						v-if="obra.endereco_pdf"
						class="ui-button"
						:href="obra.endereco_pdf"
						target="_blank"
						rel="noopener noreferrer"
					>
						Acessar obra
					</a>
				</div>
			</header>

			<div class="meta-grid">
				<article>
					<span>Autor</span>
					<strong>{{ autorNome }}</strong>
				</article>
				<article>
					<span>Genero literario</span>
					<strong>{{ generoNome }}</strong>
				</article>
			</div>

			<article v-if="obra.endereco_audio" class="media-section">
				<h2>Audio da obra</h2>
				<audio controls :src="obra.endereco_audio"></audio>
			</article>

			<article v-if="obra.endereco_video" class="media-section">
				<h2>Video da obra</h2>
				<div class="video-container">
					<iframe
						:src="embedYouTubeURL(obra.endereco_video)"
						title="Video da obra"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</article>

			<article v-if="obra.endereco_pdf" class="media-section">
				<h2>Visualizar obra</h2>
				<div class="pdf-container">
					<iframe :src="obra.endereco_pdf" title="PDF da obra"></iframe>
				</div>
			</article>
		</template>
	</section>
</template>

<script>
import { api } from '../services/api'

export default {
	name: 'ObraShow',
	data() {
		return {
			id: this.$route.params.id,
			obra: {},
			autorNome: '',
			generoNome: '',
			loading: true,
			errorMessage: '',
		}
	},
	methods: {
		async getObra(id) {
			this.loading = true
			this.errorMessage = ''

			try {
				const res = await api.get(`/obra/${id}`)
				this.obra = res.data.obra[0]
				await Promise.all([
					this.getAutor(this.obra.id_autor),
					this.getGeneroLiterario(this.obra.id_genero_literario),
				])
			} catch (error) {
				console.log(error)
				this.errorMessage = 'Nao foi possivel carregar esta obra.'
			} finally {
				this.loading = false
			}
		},
		async getAutor(id) {
			const res = await api.get(`/autor/${id}`)
			this.autorNome = res.data.autor[0].nome
		},
		async getGeneroLiterario(id) {
			const res = await api.get(`/genero_literario/${id}`)
			this.generoNome = res.data.generoLiterario[0].nome
		},
		goBack() {
			window.history.back()
		},
		embedYouTubeURL(url) {
			const videoId = url.split('v=')[1]
			const ampersandPosition = videoId ? videoId.indexOf('&') : -1
			if (ampersandPosition !== -1) {
				return `https://www.youtube.com/embed/${videoId.substring(
					0,
					ampersandPosition
				)}`
			}
			return `https://www.youtube.com/embed/${videoId || ''}`
		},
	},
	created() {
		this.getObra(this.$route.params.id)
	},
}
</script>

<style scoped>
.detail-page {
	display: grid;
	gap: var(--space-5);
}

.detail-header {
	display: flex;
	justify-content: space-between;
	gap: var(--space-4);
	align-items: start;
}

.actions {
	display: flex;
	gap: var(--space-2);
	flex-wrap: wrap;
}

.meta-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
	gap: var(--space-3);
}

.meta-grid article,
.media-section {
	padding: var(--space-4);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface);
}

.meta-grid span {
	display: block;
	margin-bottom: var(--space-1);
	color: var(--color-muted);
	font-size: 0.85rem;
	font-weight: 800;
	text-transform: uppercase;
}

.media-section h2 {
	margin: 0 0 var(--space-3);
	font-size: 1rem;
}

audio {
	width: 100%;
}

.video-container {
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	border-radius: var(--radius-md);
	background: var(--color-surface-muted);
}

.video-container iframe,
.pdf-container iframe {
	width: 100%;
	border: 0;
}

.video-container iframe {
	position: absolute;
	inset: 0;
	height: 100%;
}

.pdf-container {
	overflow: hidden;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background: var(--color-surface-muted);
}

.pdf-container iframe {
	display: block;
	height: min(72vh, 720px);
}

@media (max-width: 720px) {
	.detail-header {
		flex-direction: column;
	}

	.actions,
	.actions .ui-button {
		width: 100%;
	}
}
</style>
