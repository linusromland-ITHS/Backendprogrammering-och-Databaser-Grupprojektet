<template>
	<Navbar />
	<CountryDetail v-if="endpoint == 'country'" :countryOriginal="detail" />
</template>
<script>
	import Navbar from '../components/Navbar.vue';
	import CountryDetail from '../components/CountryDetail.vue';

	export default {
		name: 'Detail',
		components: {
			Navbar,
			CountryDetail,
		},
		data() {
			return {
				type: '',
				endpoint: '',
				id: '',
				detail: {},
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
		created() {
			this.setParameters();
			this.getDetail();
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
		},
	};
</script>
<style></style>
