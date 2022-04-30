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
		},
	};
</script>
