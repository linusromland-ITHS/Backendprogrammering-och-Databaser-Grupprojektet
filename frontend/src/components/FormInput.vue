<template>
	<textarea v-if="type == 'textarea'" v-model="input" />
	<select v-else-if="type == 'select'" class="border border-gray-400 p-2 w-full" v-model="input">
		<option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
	</select>
	<input
		v-else
		:type="type"
		class="border border-gray-400 p-2 w-full"
		v-model="input"
		:maxlength="maxlength"
		:minlength="minlength"
		:max="maxlength"
		:min="minlength"
	/>
</template>

<script>
	export default {
		name: 'FormInput',
		props: {
			type: {
				type: String,
				required: true,
				validator: (value) => ['text', 'number', 'textarea', 'select'].includes(value),
			},
			value: {
				type: String,
				required: true,
			},
			options: {
				type: Array,
				required: false,
				default: () => [],
			},
			max: {
				type: Number,
				required: false,
				default: Number.MAX_SAFE_INTEGER,
				validator: (value) => !isNaN(value),
			},
			min: {
				type: Number,
				required: false,
				default: Number.MIN_SAFE_INTEGER,
				validator: (value) => !isNaN(value),
			},
		},
		data() {
			return {
				input: this.value,
			};
		},
	};
</script>
