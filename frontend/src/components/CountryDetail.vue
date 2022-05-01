<template>
	<article>Country: {{ country.countryName }}</article>
</template>

<script>
	export default {
		name: 'CountryDetail',
		props: {
			country: {
				type: Object,
				required: true,
			},
		},
	};
</script>
