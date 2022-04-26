<template>
	<Navbar />
	<RouterView class="w-full md:w-2/3 mx-auto" />
</template>
<script>
	import Navbar from './components/Navbar.vue';

	export default {
		name: 'App',
		components: {
			Navbar,
		},
	};
</script>
