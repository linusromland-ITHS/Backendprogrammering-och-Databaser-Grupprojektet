<template>
	<Navbar />
	<main class="m-5 flex flex-wrap">
		<CountryDetail v-if="endpoint == 'country'" :countryOriginal="detail" class="w-full md:w-1/4" />
		<p v-if="endpoint == 'country'" class="w-full md:w-2/4 my-5 mx-0 md:my-0 md:mx-5">
			{{ detail.countryDescription }}
		</p>
		<h2 v-if="endpoint != 'country'" class="text-5xl my-5 w-full">{{ detail[`${endpoint}Name`] }}</h2>
		<section class="flex flex-wrap w-full">
			<DataCard
				v-for="item in data"
				:key="item.label"
				:title="item.label"
				:data="item.value"
				class="w-full md:w-5/12 xl:w-3/12"
			/>
		</section>
	</main>
</template>
<script>
	import Navbar from '../components/Navbar.vue';
	import CountryDetail from '../components/CountryDetail.vue';
	import DataCard from '../components/DataCard.vue';

	export default {
		name: 'Detail',
		components: {
			Navbar,
			CountryDetail,
			DataCard,
		},
		data() {
			return {
				type: '',
				endpoint: '',
				id: '',
				detail: {},
				data: [],
			};
		},
		watch: {
			$route() {
				this.setParameters();
			},
			type() {
				switch (this.type) {
					case 'land':
						this.endpoint = 'country';
						break;
					case 'sea':
						this.endpoint = 'sea';
						break;
					case 'space':
						this.endpoint = 'planet';
						break;
					default:
						this.$router.push('/');
						break;
				}
			},
		},
		async created() {
			await this.setParameters();
			await this.getDetail();
			this.prepareDetail();
		},
		methods: {
			setParameters() {
				this.type = this.$route.params.type;
				this.id = this.$route.params.id;
			},
			async getDetail() {
				const request = await this.axios.get(`${this.endpoint}`, {
					params: {
						ids: this.id,
					},
				});

				const response = request.data;

				if (!response.success) {
					this.$router.go(-1);
				} else {
					this.detail = response.data[0];
				}
			},
			prepareDetail() {
				if (this.endpoint == 'sea') {
					this.data = [
						{
							label: 'Size',
							value: [this.detail.seaSizeInSquareKm + ' km²'],
						},
						{
							label: 'Depth',
							value: [this.detail.seaAverageDepthInMeters + ' m'],
						},
						{
							label: 'Species',
							value: this.detail.seaSpecies,
						},
					];
				} else if (this.endpoint == 'planet') {
					this.data = [
						{
							label: 'Surface area',
							value: [this.detail.planetSurfaceAreaInSquareKm + ' km²'],
						},
						{
							label: 'Distance from sun',
							value: [this.detail.planetDistanceFromSunInKm + ' km'],
						},
						{
							label: 'Moons',
							value: this.detail.planetMoons,
						},
						{
							label: 'Average temperature',
							value: [this.detail.planetAverageTemperatureInCelsius + ' °C'],
						},
						{
							label: 'Radius',
							value: [this.detail.planetRadiusInKm + ' km'],
						},
						{
							label: 'Mass',
							value: [this.detail.planetMassInKg + ' kg'],
						},
						{
							label: 'Orbital period',
							value: [this.detail.planetOrbitalPeriodInDays + ' days'],
						},
					];
				}
			},
		},
	};
</script>
<style></style>
