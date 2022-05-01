<template>
	<textarea v-if="type == 'textarea'" v-model="input" />
	<select v-else-if="type == 'select'" class="" v-model="input">
		<option v-for="(option, index) in options" :key="index" :value="option[endpoint + 'ID']">
			{{ option[endpoint + 'Name'] }}
		</option>
	</select>
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

				if (response.status) {
					this.options = response.data;
				}
			},
		},
	};
</script>
