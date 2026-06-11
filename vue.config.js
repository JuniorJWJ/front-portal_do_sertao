const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	transpileDependencies: true,
	chainWebpack: (config) => {
		// Título inicial da página antes de o router assumir (document.title)
		config.plugin('html').tap((args) => {
			args[0].title = 'Portal do Sertão'
			return args
		})
	},
})
