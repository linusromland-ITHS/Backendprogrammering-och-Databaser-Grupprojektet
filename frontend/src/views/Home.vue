<template>
	<div class="relative">
		<ul class="flex h-screen">
			<li class="bg-emerald-500" id="land">
				<section class="bg-black/50">
					<h2>Land Search</h2>
					<p>Search for all the countries of the world!</p>
					<router-link to="/land" class="bg-emerald-500 hover:bg-emerald-400">Search Countries!</router-link>
				</section>
			</li>
			<li class="bg-sky-500" id="sea">
				<section class="bg-black/50">
					<h2>Sea Search</h2>
					<p>Search for all the seas of the world!</p>
					<router-link to="/sea" class="bg-sky-500 hover:bg-sky-400">Search the seas!</router-link>
				</section>
			</li>
			<li class="bg-purple-500" id="space">
				<section class="bg-white/50">
					<h2>Space Search</h2>
					<p>Search for all the planets of the universe!</p>
					<router-link to="/space" class="bg-purple-500 hover:bg-purple-400">Search planets!</router-link>
				</section>
			</li>
		</ul>
		<router-link to="/admin" class="absolute bottom-0 right-0 p-6">
			<span class="material-icons text-3xl hover:text-gray-500 transition duration-150 ease">settings</span>
		</router-link>
	</div>
</template>
<script>
	export default {
		name: 'Home',
	};
</script>
<style scoped>
	li {
		@apply flex flex-1 p-5 h-screen;
		transition: flex 500ms ease-out;
	}

	section {
		@apply flex flex-col items-center m-auto p-4 rounded-md;
	}

	h2 {
		@apply text-4xl font-semibold text-white;
	}

	#space h2,
	#space p {
		@apply text-black;
	}

	p {
		@apply text-lg p-2 text-white;
	}

	a {
		@apply text-white font-bold py-2 px-4 rounded;
	}

	li:hover {
		flex: 2;
	}

	#land {
		background-image: url('../assets/images/land.jpg');
		background-size: cover;
		background-position: center;
	}

	#sea {
		background-image: url('../assets/images/sea.jpg');
		background-size: cover;
		background-position: center;
	}

	#space {
		background-image: url('../assets/images/space.jpg');
		background-size: cover;
		background-position: center;
	}

	@media (max-width: 960px) {
		ul {
			@apply flex-col;
		}
	}
</style>
