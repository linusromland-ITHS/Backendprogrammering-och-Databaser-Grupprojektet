<template>
	<h1 class="text-3xl text-red-400">Admin</h1>
	<nav>
		<button
			v-for="(tab, index) in tabs"
			:key="index"
			:class="{ 'button-active': tab.toLowerCase() == activeTab.toLowerCase() }"
			@click="setActiveTab(tab)"
		>
			{{ tab }}
		</button>
	</nav>
</template>
<script>
	export default {
		name: 'Admin',
		data() {
			return {
				tabs: ['City', 'Continent', 'Country', 'Currency', 'Language', 'Planet', 'Religion', 'Sea'],
			};
		},
		computed: {
			activeTab() {
				return this.$route.params.tab;
			},
		},
		watch: {
			$route() {
				this.getData();
			},
		},
		created() {
			this.getData();
		},
		methods: {
			setActiveTab(tab) {
				this.$router.push(`/admin/${tab.toLowerCase()}`);
			},
			async getData() {
				await this.axios({
					method: 'get',
					url: this.activeTab.toLowerCase(),
				});
			},
		},
	};
</script>
<style scoped>
	nav {
		@apply bg-gray-200;
	}

	button {
		@apply px-5 py-2 bg-gray-200 rounded-t-md hover:bg-gray-300 transition ease-out duration-150;
	}
	.button-active {
		@apply bg-blue-500 text-white hover:bg-blue-600;
	}
</style>
