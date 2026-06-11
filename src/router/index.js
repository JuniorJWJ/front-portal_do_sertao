import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../services/auth'

/** Exige usuário autenticado; redireciona para o login caso contrário. */
const requireAuth = (to) => {
	const bearerToken = getToken()
	if (!bearerToken && to.name !== 'LogUserView') {
		return { name: 'LogUserView' }
	}
}

const routes = [
	{
		path: '/log_user',
		name: 'LogUserView',
		component: () =>
			import(/* webpackChunkName: "AuthView" */ '../views/LogUserView.vue'),
		meta: {
			title: 'Login',
		},
	},
	{
		path: '/create_autor',
		name: 'AutorCreate',
		component: () =>
			import(/* webpackChunkName: "AutorCreate" */ '../views/AutorCreate.vue'),
		beforeEnter: requireAuth,
		meta: {
			title: 'Registrar Autor',
		},
	},
	{
		path: '/register_autor',
		name: 'AutorRegisterView',
		component: () =>
			import(
				/* webpackChunkName: "AutorRegister" */ '../views/AutorRegisterView.vue'
			),
		meta: {
			title: 'Registre-se',
		},
	},
	{
		path: '/list_autor',
		name: 'AutorView',
		component: () =>
			import(/* webpackChunkName: "AutorView" */ '../views/AutorView.vue'),
		meta: {
			title: 'Autores',
		},
	},
	{
		path: '/show_autor/:id',
		name: 'AutorShow',
		component: () =>
			import(/* webpackChunkName: "AutorView" */ '../views/AutorShow.vue'),
		meta: {
			title: 'Autor',
		},
	},
	{
		path: '/perfil',
		name: 'AutorPerfilView',
		component: () =>
			import(
				/* webpackChunkName: "AutorView" */ '../views/AutorPerfilView.vue'
			),
		beforeEnter: requireAuth,
		meta: {
			title: 'Meu Perfil',
		},
	},
	{
		path: '/edit_autor_list',
		name: 'AutorEditList',
		component: () =>
			import(/* webpackChunkName: "AutorView" */ '../views/AutorEditList.vue'),
		beforeEnter: requireAuth,
		meta: {
			title: 'Editar Autor',
		},
	},
	{
		path: '/edit_autor/:id',
		name: 'AutorEditView',
		component: () =>
			import(/* webpackChunkName: "AutorEdit" */ '../views/AutorEditView.vue'),
		beforeEnter: requireAuth,
		meta: {
			title: 'Alterar Autor',
		},
	},
	{
		path: '/edit_perfil',
		name: 'AutorEditPerfilView',
		component: () =>
			import(
				/* webpackChunkName: "AutorEditPerfil" */ '../views/AutorEditPerfilView.vue'
			),
		beforeEnter: requireAuth,
		meta: {
			title: 'Editar Perfil',
		},
	},
	{
		path: '/show_user',
		name: 'UserView',
		component: () =>
			import(/* webpackChunkName: "UserView" */ '../views/UserView.vue'),
		beforeEnter: requireAuth,
		meta: {
			title: 'Painel',
		},
	},
	{
		path: '/',
		name: 'HomeView',
		component: () =>
			import(/* webpackChunkName: "HomeView" */ '../views/HomeView.vue'),
		meta: {
			title: 'Home',
		},
	},
	{
		path: '/sobre',
		name: 'SobreView',
		component: () =>
			import(/* webpackChunkName: "SobreView" */ '../views/SobreView.vue'),
		meta: {
			title: 'Sobre',
		},
	},
	{
		path: '/termos_de_uso',
		name: 'TermosDeUso',
		component: () =>
			import(/* webpackChunkName: "TermosDeUso" */ '../views/TermosDeUso.vue'),
		meta: {
			title: 'Termos De Uso',
		},
	},
	{
		path: '/create_obra',
		name: 'ObraCreate',
		component: () =>
			import(/* webpackChunkName: "ObraCreate" */ '../views/ObraCreate.vue'),
		beforeEnter: requireAuth,
		meta: {
			title: 'Registrar Obra',
		},
	},
	{
		path: '/register_obra',
		name: 'ObraRegisterView',
		component: () =>
			import(
				/* webpackChunkName: "ObraRegister" */ '../views/ObraRegisterView.vue'
			),
		beforeEnter: requireAuth,
		meta: {
			title: 'Cadastrar Obra',
		},
	},
	{
		path: '/list_obra',
		name: 'ObraView',
		component: () =>
			import(/* webpackChunkName: "ObraView" */ '../views/ObraView.vue'),
		meta: {
			title: 'Obras',
		},
	},
	{
		path: '/minhas_obras',
		name: 'MinhasObrasView',
		component: () =>
			import(/* webpackChunkName: "MinhasObras" */ '../views/MinhasObrasView.vue'),
		beforeEnter: requireAuth,
		meta: {
			title: 'Minhas Obras',
		},
	},
	{
		path: '/show_obra/:id',
		name: 'ObraShow',
		component: () =>
			import(/* webpackChunkName: "ObraShow" */ '../views/ObraShow.vue'),
		meta: {
			title: 'Obra',
		},
	},
	{
		path: '/edit_obra_list',
		name: 'ObraEditList',
		component: () =>
			import(/* webpackChunkName: "AutorView" */ '../views/ObraEditList.vue'),
		beforeEnter: requireAuth,
		meta: {
			title: 'Editar Obra',
		},
	},
	{
		path: '/edit_obra/:id',
		name: 'ObraEditView',
		component: () =>
			import(/* webpackChunkName: "ObraEdit" */ '../views/ObraEditView.vue'),
		beforeEnter: requireAuth,
		meta: {
			title: 'Alterar Obra',
		},
	},
	{
		path: '/edit_obra_autor/:id',
		name: 'ObraEditByOwnerView',
		component: () =>
			import(
				/* webpackChunkName: "ObraEditByOwner" */ '../views/ObraEditByOwnerView.vue'
			),
		beforeEnter: requireAuth,
		meta: {
			title: 'Alterar Obra',
		},
	},
	{
		path: '/dados_autores',
		name: 'DadosAutores',
		component: () =>
			import(
				/* webpackChunkName: "DadosAutores" */ '../views/DadosAutoresView.vue'
			),
		meta: {
			title: 'Dados dos Autores',
		},
	},
	{
		// Rota não encontrada: volta para a home
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to) => {
	document.title = to.meta?.title
		? `${to.meta.title} | Portal do Sertão`
		: 'Portal do Sertão'
})
export default router
