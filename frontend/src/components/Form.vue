<template>
	<form @submit.prevent="submit">
		<div v-for="(field, index) in fields" :key="index">
			<div class="flex flex-col" v-show="field.key != 'id'">
				<label class="">{{ field.title }}</label>
				<FormInput
					:type="field.type"
					:value="field.value"
					:options="field.options"
					:max="field.max"
					:min="field.min"
					@input="(value) => (field.value = value)"
					class="w-full p-2 border border-gray-300 rounded-md mb-2"
				/>
			</div>
		</div>

		<button
			type="submit"
			class="p-2 text-white bg-blue-500 hover:bg-blue-400 transition ease duration-150 rounded-md"
		>
			{{ submitText }}
		</button>
	</form>
</template>

<script>
	import { useToast } from 'vue-toastification';
	import FormInput from './FormInput.vue';

	export default {
		name: 'Form',
		components: {
			FormInput,
		},
		props: {
			endpoint: {
				type: String,
				required: true,
			},
			method: {
				type: String,
				required: true,
				validator: (value) => ['post', 'put'].includes(value),
			},
			fields: {
				type: Array,
				required: true,
				validator: (value) => value.every((field) => field.type && field.title && field.key),
				/*
						{
							type: '',
							title: '',
							key: '',
							value: '',
							options: [],
							max: '',
							min: '',
						},
					*/
			},
		},
		computed: {
			submitText() {
				if (this.method === 'post') {
					return 'Create';
				}
				return 'Update';
			},
		},
		methods: {
			async submit() {
				const toast = useToast();
				const request = await this.axios({
					method: this.method,
					url: this.endpoint,
					data: this.fields.reduce((data, field) => {
						data[field.key] = field.value;
						return data;
					}, {}),
				});

				const response = await request.data;

				if (response.success) {
					toast.success(`Successfully updated ${response.data[this.endpoint + 'Name']}`);
				} else {
					toast.error(`Error: ${response.error}`);
				}
			},
		},
	};
</script>
