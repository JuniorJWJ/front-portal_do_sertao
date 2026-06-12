<template>
	<div class="field">
		<label :for="id">{{ label }}</label>

		<button
			v-if="!modelValue"
			:id="id"
			type="button"
			class="dropzone"
			:class="{ dragging, invalid: Boolean(displayError) }"
			:aria-describedby="describedBy"
			@click="openPicker"
			@dragover.prevent="dragging = true"
			@dragleave.prevent="dragging = false"
			@drop.prevent="onDrop"
		>
			<AppIcon name="upload" :size="26" />
			<strong>Arraste o arquivo ou clique para selecionar</strong>
			<small v-if="hint" :id="hintId">{{ hint }}</small>
		</button>

		<div v-else class="file-card">
			<img
				v-if="previewUrl"
				class="thumb"
				:src="previewUrl"
				alt="Pré-visualização do arquivo selecionado"
			/>
			<span v-else class="file-icon">
				<AppIcon :name="fileIcon" :size="22" />
			</span>
			<span class="file-meta">
				<strong>{{ modelValue.name }}</strong>
				<small>{{ formattedSize }}</small>
			</span>
			<button
				type="button"
				class="remove-file"
				aria-label="Remover arquivo selecionado"
				@click="clear"
			>
				<AppIcon name="x" :size="18" />
			</button>
		</div>

		<input
			ref="input"
			type="file"
			class="sr-only"
			tabindex="-1"
			:accept="accept"
			@change="onSelect"
		/>

		<p v-if="displayError" :id="errorId" class="field-error">
			{{ displayError }}
		</p>
	</div>
</template>

<script>
import AppIcon from '../atoms/AppIcon.vue'

/**
 * Molécula: área de upload com arraste-e-solte, validação de tipo e
 * preview do arquivo selecionado (thumbnail para imagens, nome + tamanho).
 * Uso: <FileDropzone v-model="arquivo" id="pdf" label="Arquivo PDF" accept="application/pdf" />
 */
export default {
	name: 'FileDropzone',
	components: { AppIcon },
	props: {
		modelValue: {
			type: [File, Object],
			default: null,
		},
		id: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		accept: {
			type: String,
			default: '',
		},
		hint: {
			type: String,
			default: '',
		},
		error: {
			type: String,
			default: '',
		},
	},
	emits: ['update:modelValue'],
	data() {
		return {
			dragging: false,
			typeError: '',
			previewUrl: '',
		}
	},
	computed: {
		displayError() {
			return this.error || this.typeError
		},
		errorId() {
			return `${this.id}-error`
		},
		hintId() {
			return `${this.id}-hint`
		},
		describedBy() {
			const ids = []
			if (this.hint) ids.push(this.hintId)
			if (this.displayError) ids.push(this.errorId)
			return ids.join(' ') || undefined
		},
		fileIcon() {
			const type = this.modelValue?.type || ''
			if (type.startsWith('image/')) return 'image'
			if (type.startsWith('audio/')) return 'music'
			return 'file-text'
		},
		formattedSize() {
			const bytes = this.modelValue?.size ?? 0
			if (bytes >= 1024 * 1024) {
				return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
			}
			if (bytes >= 1024) {
				return `${Math.round(bytes / 1024)} KB`
			}
			return `${bytes} B`
		},
	},
	watch: {
		modelValue(file) {
			this.updatePreview(file)
		},
	},
	methods: {
		openPicker() {
			this.$refs.input.click()
		},
		onSelect(event) {
			this.setFile(event.target.files[0] || null)
			// Permite selecionar o mesmo arquivo novamente depois de remover
			event.target.value = ''
		},
		onDrop(event) {
			this.dragging = false
			this.setFile(event.dataTransfer.files[0] || null)
		},
		setFile(file) {
			if (!file) return

			if (!this.matchesAccept(file)) {
				this.typeError = 'Tipo de arquivo não permitido.'
				return
			}

			this.typeError = ''
			this.$emit('update:modelValue', file)
		},
		clear() {
			this.typeError = ''
			this.$emit('update:modelValue', null)
		},
		matchesAccept(file) {
			if (!this.accept) return true

			return this.accept
				.split(',')
				.map((entry) => entry.trim().toLowerCase())
				.some((entry) => {
					if (entry.endsWith('/*')) {
						return file.type.toLowerCase().startsWith(entry.slice(0, -1))
					}
					if (entry.startsWith('.')) {
						return file.name.toLowerCase().endsWith(entry)
					}
					return file.type.toLowerCase() === entry
				})
		},
		updatePreview(file) {
			if (this.previewUrl) {
				URL.revokeObjectURL(this.previewUrl)
				this.previewUrl = ''
			}
			if (file && file.type?.startsWith('image/')) {
				this.previewUrl = URL.createObjectURL(file)
			}
		},
	},
	beforeUnmount() {
		if (this.previewUrl) {
			URL.revokeObjectURL(this.previewUrl)
		}
	},
}
</script>
