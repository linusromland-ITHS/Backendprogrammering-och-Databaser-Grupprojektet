<template>
	<form class="w-5/6 lg:w-1/6" @submit.prevent="search">
		<div class="block my-5">
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
		</div>
		<div class="my-5">
			<div class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					Surface Area (km²):
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="surfaceAreaMin" type="number" min="0" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="surfaceAreaMax" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</div>
			<div class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					<p>Distance from sun <span class="help-text">(km)</span></p>
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="distanceFromSunMin" type="number" min="0" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="distanceFromSunMax" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</div>
			<div class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					<p>Average temperature <span class="help-text">(°C)</span></p>
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="averageTemperatureMin" type="number" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="averageTemperatureMax" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</div>
			<div class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					<p>Radius <span class="help-text">(km)</span></p>
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="radiusMin" type="number" min="0" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="radiusMax" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</div>
			<div class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					<p>Mass <span class="help-text">(kg)</span></p>
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="massMin" type="number" min="0" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="massMax" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</div>
			<div class="w-full inline-block mb-4">
				<label class="font-bold flex flex-col">
					<p>Orbital Period <span class="help-text">(days)</span></p>
					<label class="font-semibold flex justify-between my-1"
						><p>Min:</p>
						<input v-model="orbitalPeriodMin" type="number" min="0" class="w-3/4"
					/></label>
					<label class="font-semibold flex justify-between my-1"
						><p>Max:</p>
						<input v-model="orbitalPeriodMax" type="number" min="0" class="w-3/4"
					/></label>
				</label>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		emits: ['searchSpace'],
		data() {
			return {
				nameInput: null,
				surfaceAreaMin: 0,
				surfaceAreaMax: 0,
				distanceFromSunMin: 0,
				distanceFromSunMax: 0,
				averageTemperatureMin: 0,
				averageTemperatureMax: 0,
				radiusMin: 0,
				radiusMax: 0,
				massMin: 0,
				massMax: 0,
				orbitalPeriodMin: 0,
				orbitalPeriodMax: 0,
				timeOut: null,
			};
		},
		watch: {
			nameInput() {
				this.timerHandler();
			},
			surfaceAreaMin() {
				this.timerHandler();
			},
			surfaceAreaMax() {
				this.timerHandler();
			},
			distanceFromSunMin() {
				this.timerHandler();
			},
			distanceFromSunMax() {
				this.timerHandler();
			},
			averageTemperatureMin() {
				this.timerHandler();
			},
			averageTemperatureMax() {
				this.timerHandler();
			},
			radiusMin() {
				this.timerHandler();
			},
			radiusMax() {
				this.timerHandler();
			},
			massMin() {
				this.timerHandler();
			},
			massMax() {
				this.timerHandler();
			},
			orbitalPeriodMin() {
				this.timerHandler();
			},
			orbitalPeriodMax() {
				this.timerHandler();
			},
		},
		methods: {
			search() {
				let query = {};
				if (this.nameInput) query.name = this.nameInput;
				if (this.surfaceAreaMin) query.surfaceAreaMin = this.surfaceAreaMin;
				if (this.surfaceAreaMax) query.surfaceAreaMax = this.surfaceAreaMax;
				if (this.distanceFromSunMin) query.distanceFromSunMin = this.distanceFromSunMin;
				if (this.distanceFromSunMax) query.distanceFromSunMax = this.distanceFromSunMax;
				if (this.averageTemperatureMin) query.averageTemperatureMin = this.averageTemperatureMin;
				if (this.averageTemperatureMax) query.averageTemperatureMax = this.averageTemperatureMax;
				if (this.radiusMin) query.radiusMin = this.radiusMin;
				if (this.radiusMax) query.radiusMax = this.radiusMax;
				if (this.massMin) query.massMin = this.massMin;
				if (this.massMax) query.massMax = this.massMax;
				if (this.orbitalPeriodMin) query.orbitalPeriodMin = this.orbitalPeriodMin;
				if (this.orbitalPeriodMax) query.orbitalPeriodMax = this.orbitalPeriodMax;

				// Only emit if object is not empty
				if (query && Object.keys(query).length > 0 && Object.getPrototypeOf(query) === Object.prototype) {
					this.$emit('searchSpace', query);
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
