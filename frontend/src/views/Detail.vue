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
		},
		methods: {
			setParameters() {
				this.type = this.$route.params.type;
				this.id = this.$route.params.id;
			},
		},
	};
</script>
<style></style>
