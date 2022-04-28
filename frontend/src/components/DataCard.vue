<template>
	<div
		:class="`p-3 m-2 bg-gray-200 border-gray-300 border-2 text-black rounded-md transition ease-in-out duration-150 ${includeHoverableClass}`"
	>
		<h3 class="text-2xl font-semibold mb-2">{{ title }}</h3>
		<ul :class="`list-inside ${includeDiscClass}`">
			<li
				v-for="item in data"
				:key="item"
				class="text-lg whitespace-nowrap truncate cursor-help w-fit max-w-full"
				:title="item"
			>
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Navbar',
		props: {
			title: {
				type: String,
				required: true,
			},
			data: {
				type: Array,
				required: true,
			},
			hoverable: {
				type: Boolean,
				default: true,
			},
		},
		computed: {
			includeHoverableClass() {
				return this.hoverable ? 'hover:scale-[1.005] hover:drop-shadow-md' : '';
			},
			includeDiscClass() {
				return this.data.length > 1 ? 'list-disc' : '';
			},
		},
	};
</script>
