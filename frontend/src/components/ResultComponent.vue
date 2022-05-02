<template>
	<li
		class="w-3/5 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition ease-in duration-150 cursor-pointer mb-4 hover:drop-shadow-md"
		@click="onClick"
	>
		<img
			v-if="resultItem.countryFlagURL"
			class="inline w-14 rounded-sm"
			:src="resultItem.countryFlagURL"
			:alt="resultItem.name"
		/>
		<h3 class="inline ml-2 text-lg font-bold align-middle">
			{{ resultItem.name ? resultItem.name : resultItem.countryName }}
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
		methods: {
			onClick() {
				this.$emit('onClick', this.resultItem);
			},
		},
	};
</script>

<style scoped></style>
