<template>
	<Navbar />
	<div
		class="w-full lg:w-2/3 site-height mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start"
	>
		<SeaFilterComponent v-if="type === 'sea'" @search-sea="fetchSea" />
		<SpaceFilterComponent v-if="type === 'space'" @search-space="fetchSpace" />
		<LandFilterComponent v-if="type === 'land'" @search-land="fetchLand" />
		<div class="w-full lg:w-9/12 h-full p-3 flex flex-col">
			<h2 class="text-2xl font-semibold">Results:</h2>

			<ul class="grow lg:overflow-y-scroll my-3">
				<template v-if="results.length > 0">
					<ResultComponent
						v-for="result in results"
						:key="result.id ? result.id : result._id"
						:result-item="result"
						@on-click="goToResult"
					/>
				</template>
				<li
					v-else
					class="w-full lg:w-3/5 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition ease-in duration-150 cursor-pointer mb-4 hover:drop-shadow-md"
					@click="onClick"
				>
					<p class="inline text-lg font-bold align-middle">
						Your search ended with no results. Try searching for something else!
					</p>
				</li>
			</ul>
			<p>Showing {{ results.length }} out of {{ totalCount }} results</p>
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/Navbar.vue';
	import ResultComponent from '../components/ResultComponent.vue';
	import SeaFilterComponent from '../components/SeaFilterComponent.vue';
	import SpaceFilterComponent from '../components/SpaceFilterComponent.vue';
	import LandFilterComponent from '../components/LandFilterComponent.vue';
	export default {
		components: { Navbar, ResultComponent, SeaFilterComponent, SpaceFilterComponent, LandFilterComponent },
		data() {
			return {
				type: '',
				results: [],
				totalCount: null,
			};
		},
		created() {
			this.type = this.$route.params.type;
			const query = { name: this.$route.params.query };
			if (this.type === 'land') {
				this.fetchLand(query);
			} else if (this.type === 'sea') {
				this.fetchSea(query);
			} else if (this.type === 'space') {
				this.fetchSpace(query);
			}
		},
		methods: {
			goToResult(resultItem) {
				this.$router.push(
					`/${this.type}/detail/${resultItem.countryID ? resultItem.countryID : resultItem._id}`,
				);
			},
			async fetchSea(query) {
				const response = await this.axios.get('sea', {
					params: { ...query },
				});
				this.results = response.data.data.result;
				this.totalCount = response.data.data.count;
			},
			async fetchSpace(query) {
				const response = await this.axios.get('planet', {
					params: { ...query },
				});
				this.results = response.data.data.result;
				this.totalCount = response.data.data.count;
			},
			async fetchLand(query) {
				const response = await this.axios.get('country', {
					params: { ...query },
				});
				this.results = response.data.data.result;
				this.totalCount = response.data.data.count;
			},
		},
	};
</script>

<style scoped>
	.site-height {
		height: calc(100vh - 96px);
	}
</style>
