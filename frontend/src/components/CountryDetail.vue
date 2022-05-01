<template>
	<article>
		<ul>
			<li v-for="(item, index) in country" :key="index">
				{{ item }}
			</li>
		</ul>
	</article>
</template>

<script>
	export default {
		name: 'CountryDetail',
		props: {
			countryOriginal: {
				type: Object,
				required: true,
			},
		},
		computed: {
			country() {
				if (Object.keys(this.countryOriginal).length < 1) return [];

				const country = [
					{
						label: 'Name',
						value: this.countryOriginal.countryName,
					},
					{
						label: 'Population',
						value: this.countryOriginal.countryPopulation,
					},
					{
						label: 'Size',
						value: this.countryOriginal.countrySize,
					},
					{
						label: 'Domain',
						value: this.countryOriginal.countryDomain,
					},
					{
						label: 'Capital',
						value: [
							{
								label: 'Name',
								value: this.countryOriginal.capitalName,
							},
							{
								label: 'Population',
								value: this.countryOriginal.capitalPopulation,
							},
						],
					},
					{
						label: 'Currency',
						value: [
							{
								label: 'Name',
								value: this.countryOriginal.currencyName,
							},
							{
								label: 'Symbol',
								value: this.countryOriginal.currencySymbol,
							},
						],
					},
					{
						label: 'Continents',
						value: this.prepareArrays(this.countryOriginal.continents, 'continents'),
					},
					{
						label: 'Languages',
						value: this.prepareArrays(this.countryOriginal.languages, 'languages'),
					},
					{
						label: 'Religions',
						value: this.prepareArrays(this.countryOriginal.religions, 'religions'),
					},
				];

				return country;
			},
		},
		methods: {
			prepareArrays(oldArrray, name) {
				const newArray = [];

				for (let i = 0; i < oldArrray.length; i++) {
					const element = oldArrray[i];

					if (name === 'continents') {
						newArray.push([
							{
								label: 'Name',
								value: element.continentName,
							},
							{
								label: 'Population',
								value: element.continentPopulation,
							},
							{
								label: 'Size',
								value: element.continentSize,
							},
						]);
					} else if (name === 'languages') {
						newArray.push([
							{
								label: 'Name',
								value: element.languageName,
							},
							{
								label: 'Native speakers',
								value: element.languageNativeSpeakers,
							},
							{
								label: 'Total speakers',
								value: element.languageTotalSpeakers,
							},
						]);
					} else if (name === 'religions') {
						newArray.push([
							{
								label: 'Name',
								value: element.religionName,
							},
						]);
					}
				}

				return newArray;
			},
		},
	};
</script>
