<template>
	<form @submit.prevent="">
		<div v-for="(field, index) in fields" :key="index">
			<div class="flex flex-col">
				<label class="text-gray-700 text-sm font-bold mb-2">{{ field.title }}</label>
				<FormInput
					:type="field.type"
					:value="field.value"
					:options="field.options"
					:max="field.max"
					:min="field.min"
				/>
			</div>
		</div>
	</form>
</template>

<script>
	import FormInput from './FormInput.vue';

	export default {
		name: 'Form',
		components: {
			FormInput,
		},
		props: {
			method: {
				type: String,
				required: true,
				validator: (value) => ['post', 'put'].includes(value),
			},
			fields: {
				type: Array,
				required: true,
				validator: (value) => value.every((field) => field.title && field.type),
				/*
					{
						type: '',
						title: '',
						value: '',
						options: [],
						max: '',
						min: '',
					},
				*/
			},
		},
	};
</script>
