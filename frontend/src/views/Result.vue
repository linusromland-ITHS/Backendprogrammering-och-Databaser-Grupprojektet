<template>
	<Navbar />
	<div class="w-2/3 site-height mx-auto flex justify-between">
		<!-- Remove when SearchComponent is ready -->
		<form class="w-1/6">
			<formset class="block my-5">
				<div class="relative text-gray-600 focus-within:text-gray-400 w-full">
					<span class="absolute inset-y-0 left-0 flex items-center pl-2">
						<button type="submit" class="p-1 grid place-content-center">
							<span class="material-icons text-black">search</span>
						</button>
					</span>
					<input
						type="search"
						class="py-2 text-sm text-black bg-gray-200 rounded-md pl-10 w-full transition focus:outline-none hover:bg-gray-100 focus:bg-gray-300 ease-in duration-150 border-2 border-gray-300"
						placeholder="Search..."
						autocomplete="off"
					/>
				</div>
			</formset>
			<div class="my-5">
				<formset class="w-full inline-block mb-4">
					<label class="font-bold flex flex-col">
						Amount of moons:
						<label class="font-semibold flex justify-between my-1"
							><p>Min:</p>
							<input type="number" min="0" max="100" value="0" class="w-3/4"
						/></label>
						<label class="font-semibold flex justify-between my-1"
							><p>Max:</p>
							<input type="number" min="0" max="100" value="100" class="w-3/4"
						/></label>
					</label>
				</formset>
				<formset class="w-full inline-block mb-4">
					<label class="font-bold flex flex-col">
						<p>Radius <span class="help-text">(km)</span></p>
						<label class="font-semibold flex justify-between my-1"
							><p>Min:</p>
							<input type="number" min="0" max="100" value="0" class="w-3/4"
						/></label>
						<label class="font-semibold flex justify-between my-1"
							><p>Max:</p>
							<input type="number" min="0" max="100" value="100" class="w-3/4"
						/></label>
					</label>
				</formset>
				<formset class="w-full inline-block mb-4">
					<label class="font-bold flex flex-col">
						<p>Orbital period <span class="help-text">(days)</span></p>
						<label class="font-semibold flex justify-between my-1"
							><p>Min:</p>
							<input type="number" min="0" max="100" value="0" class="w-3/4"
						/></label>
						<label class="font-semibold flex justify-between my-1"
							><p>Max:</p>
							<input type="number" min="0" max="100" value="100" class="w-3/4"
						/></label>
					</label>
				</formset>
				<formset class="w-full inline-block">
					<label class="font-bold flex flex-col">
						<p>Distance from Sun <span class="help-text">(km)</span></p>
						<label class="font-semibold flex justify-between my-1"
							><p>Min:</p>
							<input type="number" min="0" max="100" value="0" class="w-3/4"
						/></label>
						<label class="font-semibold flex justify-between my-1"
							><p>Max:</p>
							<input type="number" min="0" max="100" value="100" class="w-3/4"
						/></label>
					</label>
				</formset>
			</div>
		</form>
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
	import Navbar from '../components/Navbar.vue';
	import ResultComponent from '../components/ResultComponent.vue';
	export default {
		components: { Navbar, ResultComponent },
		data() {
			return {
				type: '',
				// Mock data
				results: [{ name: 'Sweden', countryFlagURL: 'https://countryflagsapi.com/svg/se' }],
			};
		},
		created() {
			this.type = this.$route.params.type;
			// Fetch and place in this.results
		},
		methods: {
			goToResult(resultItem) {
				this.$router.push(`/${this.type}/${resultItem.id}`);
			},
		},
	};
</script>

<style scoped>
	.site-height {
		height: calc(100vh - 96px);
	}
</style>
