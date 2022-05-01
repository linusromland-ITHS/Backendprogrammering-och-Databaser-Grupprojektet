<template>
	<Navbar />
	<h1 class="text-3xl text-red-400">Detail</h1>
</template>
<script>
	import Navbar from '../components/Navbar.vue';

	export default {
		name: 'Detail',
		components: {
			Navbar,
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
					this.detail = response.data;
				}
			},
		},
	};
</script>
<style></style>
