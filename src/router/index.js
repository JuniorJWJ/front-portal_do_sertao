import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../services/auth'

const navigationAdminRouteGuard = (to) => {
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
		beforeEnter: navigationAdminRouteGuard,
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
		// beforeEnter: navigationAdminRouteGuard
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
	},
	{
		path: '/perfil',
		name: 'AutorPerfilView',
		component: () =>
			import(
				/* webpackChunkName: "AutorView" */ '../views/AutorPerfilView.vue'
			),
		beforeEnter: navigationAdminRouteGuard,
	},
	{
		path: '/edit_autor_list',
		name: 'AutorEditList',
		component: () =>
			import(/* webpackChunkName: "AutorView" */ '../views/AutorEditList.vue'),
		beforeEnter: navigationAdminRouteGuard,
		meta: {
			title: 'Editar Autor',
		},
	},
	{
		path: '/edit_autor/:id',
		name: 'AutorEditView',
		component: () =>
			import(/* webpackChunkName: "AutorEdit" */ '../views/AutorEditView.vue'),
		beforeEnter: navigationAdminRouteGuard,
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
		beforeEnter: navigationAdminRouteGuard,
	},
	{
		path: '/show_user',
		name: 'UserView',
		component: () =>
			import(/* webpackChunkName: "UserView" */ '../views/UserView.vue'),
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
		beforeEnter: navigationAdminRouteGuard,
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
		beforeEnter: navigationAdminRouteGuard,
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
		beforeEnter: navigationAdminRouteGuard,
	},
	{
		path: '/show_obra/:id',
		name: 'ObraShow',
		component: () =>
			import(/* webpackChunkName: "ObraShow" */ '../views/ObraShow.vue'),
	},
	{
		path: '/edit_obra_list',
		name: 'ObraEditList',
		component: () =>
			import(/* webpackChunkName: "AutorView" */ '../views/ObraEditList.vue'),
		beforeEnter: navigationAdminRouteGuard,
		meta: {
			title: 'Editar Obra',
		},
	},
	{
		path: '/edit_obra/:id',
		name: 'ObraEditView',
		component: () =>
			import(/* webpackChunkName: "ObraEdit" */ '../views/ObraEditView.vue'),
		beforeEnter: navigationAdminRouteGuard,
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
		beforeEnter: navigationAdminRouteGuard,
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
		// beforeEnter: navigationAdminRouteGuard,
		meta: {
			title: 'Dados dos Autores',
		},
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to) => {
	document.title = to.meta?.title
		? `${to.meta.title} | Portal do Sertao`
		: 'Portal do Sertao'
})
export default router
