<template>
	<div class="field">
		<label :for="id">{{ label }}</label>
		<span class="input-icon-wrap">
			<AppIcon class="leading-icon" name="lock" :size="18" />
			<input
				:id="id"
				:type="visible ? 'text' : 'password'"
				class="form-control has-leading-icon has-trailing-action"
				:value="modelValue"
				:name="name"
				:autocomplete="autocomplete"
				:aria-invalid="Boolean(error)"
				:aria-describedby="error ? errorId : undefined"
				@input="$emit('update:modelValue', $event.target.value)"
			/>
			<button
				type="button"
				class="trailing-action"
				:aria-label="visible ? 'Ocultar senha' : 'Mostrar senha'"
				:aria-pressed="visible"
				@click="visible = !visible"
			>
				<AppIcon :name="visible ? 'eye-off' : 'eye'" :size="18" />
			</button>
		</span>
		<p v-if="error" :id="errorId" class="field-error">{{ error }}</p>
	</div>
</template>

<script>
import AppIcon from '../atoms/AppIcon.vue'

/**
 * Molécula: campo de senha com botão de mostrar/ocultar.
 * Uso: <PasswordField v-model="senha" id="password" />
 */
export default {
	name: 'PasswordField',
	components: { AppIcon },
	props: {
		modelValue: {
			type: String,
			default: '',
		},
		id: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: 'Senha',
		},
		name: {
			type: String,
			default: 'password',
		},
		autocomplete: {
			type: String,
			default: 'current-password',
		},
		error: {
			type: String,
			default: '',
		},
	},
	emits: ['update:modelValue'],
	data() {
		return {
			visible: false,
		}
	},
	computed: {
		errorId() {
			return `${this.id}-error`
		},
	},
}
</script>
