<template>
	<!-- Navbar Component -->
	<nav :class="`pt-8 flex justify-center bg-${activeTheme}`">
		<router-link to="/land" :class="`link link-${activeTheme}  ${activeTheme == 'land' ? 'active-link' : ''}`">
			<span class="material-icons mr-1">flag</span>Land
		</router-link>
		<router-link to="/sea" :class="`link link-${activeTheme} ${activeTheme == 'sea' ? 'active-link' : ''}`">
			<span class="material-icons mr-1">sailing</span>Sea
		</router-link>

		<router-link to="/space" :class="`link link-${activeTheme}  ${activeTheme == 'space' ? 'active-link' : ''}`">
			<span class="material-icons mr-1">public</span>Space
		</router-link>
	</nav>
</template>

<script>
	export default {
		name: 'Navbar',
		data() {
			return {
				activeTheme: 'sea',
			};
		},
	};
</script>
<style>
	.link {
		@apply py-5 font-semibold text-white flex flex-row justify-center rounded-t-md transition ease-out duration-150 w-1/3 sm:w-32 hover:ease-in;
	}

	.link-sea {
		@apply bg-sky-500 hover:bg-sky-400;
	}

	.link-land {
		@apply bg-emerald-500 hover:bg-emerald-400;
	}

	.link-space {
		@apply bg-purple-500 hover:bg-purple-400;
	}

	.active-link {
		@apply bg-white text-black hover:bg-white hover:text-black;
	}
</style>
