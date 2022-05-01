<template>
	<div class="fixed inset-0 w-full h-full z-50 flex" id="transition">
		<div
			class="m-auto lg:w-2/6 md:w-4/6 w-10/12 h-5/6 overflow-y-scroll bg-white p-5 rounded-md flex flex-col items-center"
		>
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Modal',
	};
</script>

<style scoped>
	#transition {
		animation: fadeIn 0.05s;
		background-color: rgba(0, 0, 0, 0.5);
	}
	@keyframes fadeIn {
		0% {
			background-color: rgba(0, 0, 0, 0);
		}
		100% {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}
</style>
