<template>
	<form class="w-5/6 lg:w-1/6" @submit.prevent="search">
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
					v-model="nameInput"
				/>
			</div>
		</formset>
		<div class="my-5">
			<formset class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					Size (km²):
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="minSizeInSquareKm" type="number" min="0" max="100" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="maxSizeInSquareKm" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</formset>
			<formset class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					<p>Average Depth <span class="help-text">(m)</span></p>
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="minAverageDepthInMeters" type="number" min="0" max="100" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="maxAverageDepthInMeters" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</formset>
		</div>
	</form>
</template>

<script>
	export default {
		emits: ['searchSea'],
		data() {
			return {
				nameInput: null,
				minSizeInSquareKm: 0,
				maxSizeInSquareKm: 0,
				minAverageDepthInMeters: 0,
				maxAverageDepthInMeters: 0,
				timeOut: null,
			};
		},
		watch: {
			nameInput() {
				this.timerHandler();
			},
			minSizeInSquareKm() {
				this.timerHandler();
			},
			maxSizeInSquareKm() {
				this.timerHandler();
			},
			minAverageDepthInMeters() {
				this.timerHandler();
			},
			maxAverageDepthInMeters() {
				this.timerHandler();
			},
		},
		methods: {
			search() {
				let query = {};
				if (this.nameInput) query.name = this.nameInput;
				if (this.minSizeInSquareKm) query.minSizeInSquareKm = this.minSizeInSquareKm;
				if (this.maxSizeInSquareKm) query.maxSizeInSquareKm = this.maxSizeInSquareKm;
				if (this.minAverageDepthInMeters) query.minAverageDepthInMeters = this.minAverageDepthInMeters;
				if (this.maxAverageDepthInMeters) query.maxAverageDepthInMeters = this.maxAverageDepthInMeters;

				// Only emit if object is not empty
				if (query && Object.keys(query).length > 0 && Object.getPrototypeOf(query) === Object.prototype) {
					this.$emit('searchSea', query);
				}
			},
			// Send request 500 ms after input in any field
			timerHandler() {
				if (this.timeOut) clearTimeout(this.timeOut);
				this.timeOut = setTimeout(() => {
					this.search();
				}, 500);
			},
		},
	};
</script>

<style scoped></style>
