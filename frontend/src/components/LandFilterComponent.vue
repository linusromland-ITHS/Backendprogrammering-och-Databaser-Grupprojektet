<template>
	<form class="w-1/6" @submit.prevent="search">
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
					Population:
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="populationMin" type="number" min="0" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="populationMax" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</formset>
			<formset class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					<p>Size <span class="help-text">(km)</span></p>
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="sizeMin" type="number" min="0" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="sizeMax" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</formset>
		</div>
	</form>
</template>

<script>
	export default {
		emits: ['searchLand'],
		data() {
			return {
				nameInput: null,
				populationMin: 0,
				populationMax: 0,
				sizeMin: 0,
				sizeMax: 0,
				timeOut: null,
			};
		},
		watch: {
			nameInput() {
				this.timerHandler();
			},
			populationMin() {
				this.timerHandler();
			},
			populationMax() {
				this.timerHandler();
			},
			sizeMin() {
				this.timerHandler();
			},
			sizeMax() {
				this.timerHandler();
			},
		},
		methods: {
			search() {
				let query = {};
				if (this.nameInput) query.name = this.nameInput;
				if (this.populationMin) query.populationMin = this.populationMin;
				if (this.populationMax) query.populationMax = this.populationMax;
				if (this.sizeMin) query.sizeMin = this.sizeMin;
				if (this.sizeMax) query.sizeMax = this.sizeMax;

				// Only emit if object is not empty
				if (query && Object.keys(query).length > 0 && Object.getPrototypeOf(query) === Object.prototype) {
					this.$emit('searchLand', query);
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
