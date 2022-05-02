<template>
	<Navbar />
	<div class="w-2/3 site-height mx-auto flex justify-between">
		<SeaFilterComponent v-if="type === 'sea'" @search-sea="fetchSea" />
		<SpaceFilterComponent v-if="type === 'space'" @search-space="fetchSpace" />
		<LandFilterComponent v-if="type === 'land'" @search-land="fetchLand" />
		<div class="w-9/12 h-full p-3 flex flex-col">
			<h2 class="text-2xl font-semibold">Results:</h2>

			<ul class="grow overflow-y-scroll my-3">
				<ResultComponent
					v-for="result in results"
					:key="result.id ? result.id : result._id"
					:result-item="result"
					@on-click="goToResult"
				/>
			</ul>
			<p class="">Showing 15 out of 196 results</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

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
				this.$router.push(`/${this.type}/${resultItem.id ? resultItem.id : resultItem._id}`);
			},
			async fetchSea(query) {
				const response = await axios.get('/api/sea', {
					params: { ...query },
				});
				this.results = response.data.data;
			},
			async fetchSpace(query) {
				const response = await axios.get('/api/planet', {
					params: { ...query },
				});
				this.results = response.data.data;
			},
			async fetchLand(query) {
				const response = await axios.get('/api/country', {
					params: { ...query },
				});
				this.results = response.data.data;
			},
		},
	};
</script>

<style scoped>
	.site-height {
		height: calc(100vh - 96px);
	}
</style>
