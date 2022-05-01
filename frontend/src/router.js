import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			// Home Route
			name: 'Home',
			component: () => import('./views/Home.vue'),
			path: '/',
		},
		{
			// Search Route
			name: 'Search',
			component: () => import('./views/Search.vue'),
			path: '/:type',
		},
		{
			// Result Route
			name: 'Result',
			component: () => import('./views/Result.vue'),
			path: '/:type/result/:query',
		},
		{
			// Detail Redirect Route
			path: '/:type/detail',
			redirect: '/',
		},
		{
			// Detail Route
			name: 'Detail',
			component: () => import('./views/Detail.vue'),
			path: '/:type/detail/:id',
		},
	],
});

router.beforeEach((to, from, next) => {
	//Before each route, updates the title of page to match name attribute of route
	document.title = `${String(to.name)}`;

	next();
});

//Exports vue-router
export default router;
