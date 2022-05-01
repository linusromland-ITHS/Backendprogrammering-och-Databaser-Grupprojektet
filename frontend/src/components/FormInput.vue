<template>
	<textarea v-if="type == 'textarea'" v-model="input" />
	<!-- <VSelect v-else-if="type == 'select'" :options="options" :label="option[endpoint + 'Name']" /> -->
	<VSelect
		v-else-if="type == 'select'"
		:options="options"
		:reduce="(option) => option[`${this.endpoint}ID`]"
		:label="endpoint + 'Name'"
		v-model="input"
	/>
	<input
		v-else
		:type="type"
		class=""
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
			endpoint: {
				type: String,
				required: false,
				default: '',
			},
		},
		emits: ['input'],
		data() {
			return {
				input: this.value,
				options: [],
			};
		},
		watch: {
			input(value) {
				console.log(value[`${this.endpoint}ID`]);
				this.$emit('input', value);
			},
		},
		created() {
			if (this.type === 'select') {
				this.getOptions();
			}
		},
		methods: {
			async getOptions() {
				const request = await this.axios({
					method: 'get',
					url: this.endpoint,
				});

				const response = await request.data;

				if (response.success) {
					this.options = response.data;
					console.log(this.options);
				}
			},
		},
	};
</script>
