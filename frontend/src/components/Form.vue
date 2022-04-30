<template>
	<form @submit.prevent="submit">
		<div v-for="(field, index) in fields" :key="index">
			<div class="flex flex-col">
				<label class="">{{ field.title }}</label>
				<FormInput
					:type="field.type"
					:value="field.value"
					:options="field.options"
					:max="field.max"
					:min="field.min"
					@input="(value) => (field.value = value)"
				/>
			</div>
		</div>
		<button type="submit">tjo</button>
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
		methods: {
			async submit() {
				const toast = useToast();
				const resonse = this.axios(
					this.method,
					this.endpoint,
					this.fields.reduce((data, field) => {
						data[field.key] = field.value;
						return data;
					}, {}),
				);

				if (resonse.success) {
					toast.success('Success');
				} else {
					toast.error('Error');
				}
			},
		},
	};
</script>
