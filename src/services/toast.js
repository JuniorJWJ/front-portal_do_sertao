import { reactive } from 'vue'

const state = reactive({ items: [] })
let _id = 0

function add(message, type, duration = 4200) {
	const id = ++_id
	state.items.push({ id, message, type })
	setTimeout(() => remove(id), duration)
}

function remove(id) {
	const i = state.items.findIndex((t) => t.id === id)
	if (i !== -1) state.items.splice(i, 1)
}

export const toastState = state

export const toastPlugin = {
	install(app) {
		app.config.globalProperties.$toast = {
			success: (msg, dur) => add(msg, 'success', dur),
			error: (msg, dur) => add(msg, 'error', dur),
			info: (msg, dur) => add(msg, 'info', dur),
		}
	},
}
