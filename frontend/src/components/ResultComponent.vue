<template>
	<li
		class="w-full lg:w-3/5 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition ease-in duration-150 cursor-pointer mb-4 hover:drop-shadow-md"
		@click="onClick"
	>
		<img
			v-if="resultItem.countryFlagURL"
			class="inline w-14 rounded-sm"
			:src="resultItem.countryFlagURL"
			:alt="resultItem[`${endpoint}Name`]"
		/>
		<h3 class="inline ml-2 text-lg font-bold align-middle">
			{{ resultItem[`${endpoint}Name`] }}
		</h3>
	</li>
</template>

<script>
	export default {
		props: {
			resultItem: {
				type: Object,
				required: true,
			},
		},
		emits: ['onClick'],
		computed: {
			endpoint() {
				switch (this.$route.params.type) {
					case 'land':
						return 'country';
					case 'sea':
						return 'sea';
					case 'space':
						return 'planet';
					default:
						return 'country';
				}
			},
		},
		methods: {
			onClick() {
				this.$emit('onClick', this.resultItem);
			},
		},
	};
</script>

<style scoped></style>
