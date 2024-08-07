import { createRouter, createWebHistory } from 'vue-router'
import LogUserView from '../views/LogUserView.vue'
const navigationAdminRouteGuard = (to) => {
	const bearerToken = localStorage.getItem('token')
	if (!bearerToken && to.name !== 'LogUserView') {
		return { name: 'LogUserView' }
	}
}

const routes = [
	{
		path: '/log_user',
		name: 'LogUserView',
		component: LogUserView,
		meta: {
			title: 'Login',
		},
	},
	{
		path: '/create_autor',
		name: 'AutorCreate',
		component: () =>
			import(/* webpackChunkName: "UserView" */ '../views/AutorCreate.vue'),
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
				/* webpackChunkName: "UserView" */ '../views/AutorRegisterView.vue'
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
			import(/* webpackChunkName: "UserView" */ '../views/AutorEditView.vue'),
		beforeEnter: navigationAdminRouteGuard,
		meta: {
			title: 'Auterar Autor',
		},
	},
	{
		path: '/edit_perfil',
		name: 'AutorEditPerfilView',
		component: () =>
			import(
				/* webpackChunkName: "UserView" */ '../views/AutorEditPerfilView.vue'
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
			import(/* webpackChunkName: "UserView" */ '../views/HomeView.vue'),
		meta: {
			title: 'Home',
		},
	},
	{
		path: '/sobre',
		name: 'SobreView',
		component: () =>
			import(/* webpackChunkName: "UserView" */ '../views/SobreView.vue'),
		meta: {
			title: 'Sobre',
		},
	},
	{
		path: '/create_obra',
		name: 'ObraCreate',
		component: () =>
			import(/* webpackChunkName: "UserView" */ '../views/ObraCreate.vue'),
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
				/* webpackChunkName: "UserView" */ '../views/ObraRegisterView.vue'
			),
		beforeEnter: navigationAdminRouteGuard,
	},
	{
		path: '/list_obra',
		name: 'ObraView',
		component: () =>
			import(/* webpackChunkName: "UserView" */ '../views/ObraView.vue'),
		meta: {
			title: 'Obras',
		},
	},
	{
		path: '/minhas_obras',
		name: 'MinhasObrasView',
		component: () =>
			import(/* webpackChunkName: "UserView" */ '../views/MinhasObrasView.vue'),
		beforeEnter: navigationAdminRouteGuard,
	},
	{
		path: '/show_obra/:id',
		name: 'ObraShow',
		component: () =>
			import(/* webpackChunkName: "UserView" */ '../views/ObraShow.vue'),
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
			import(/* webpackChunkName: "UserView" */ '../views/ObraEditView.vue'),
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
				/* webpackChunkName: "UserView" */ '../views/DadosAutoresView.vue'
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
	document.title = to.meta?.title ?? 'Default Title'
})
export default router
