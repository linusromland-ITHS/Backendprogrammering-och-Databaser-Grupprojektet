<template>
	<form @submit.prevent="" />
</template>

<script>
	export default {
		name: 'Form',
		props: {
			method: {
				type: String,
				required: true,
				validator: (value) => ['post', 'put', 'delete'].includes(value),
			},
			fields: {
				type: Array,
				required: true,
				validator: (value) => value.every((field) => field.title && field.value && field.type),
				/*
					{
						title: '',
						value: '',
						type: '',
						maxlength: '',
						minlength: '',
					},
				*/
			},
		},
	};
</script>
