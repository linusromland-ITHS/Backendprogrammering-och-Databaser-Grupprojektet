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
			path: '/result/:type',
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
