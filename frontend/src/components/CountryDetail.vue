<template>
	<article v-if="country" class="bg-gray-200 p-3">
		<img
			:src="countryOriginal.countryFlagURL"
			:alt="countryOriginal.countryName + '\'s flag'"
			class="max-h-40 m-auto mb-2"
		/>
		<ul>
			<li
				v-for="property in country"
				:key="property.label"
				class="flex flex-wrap py-1 border-b-2 border-gray-300"
			>
				<h3
					class="font-semibold mr-4"
					:class="{
						'w-full text-center bg-gray-300 p-2 mr-0 rounded-md': typeof property.value === 'object',
					}"
				>
					{{ property.label }}
				</h3>
				<p v-if="typeof property.value !== 'object'">{{ property.value }}</p>
				<ul v-else class="w-full">
					<li
						v-for="(subProperty, index) in property.value"
						:key="subProperty.label"
						class="flex flex-wrap py-1"
					>
						<h4 class="font-semibold mr-4">{{ subProperty.label }}</h4>
						<p v-if="!property.multi">{{ subProperty.value }}</p>
						<ul
							v-else
							class="w-full"
							:class="{ 'mb-2': property.multi && index != property.value.length - 1 }"
						>
							<li
								v-for="(subSubProperty, subIndex) in subProperty"
								:key="subSubProperty.label"
								class="flex py-1"
								:class="{ 'border-b-2 border-gray-300': subIndex != subProperty.length - 1 }"
							>
								<h5 class="font-semibold mr-4" v-if="subProperty.label !== 'Religions'">
									{{ subSubProperty.label }}
								</h5>
								<p v-if="typeof subSubProperty.value !== 'object'">{{ subSubProperty.value }}</p>
							</li>
						</ul>
					</li>
				</ul>
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
				return this.prepareCountry();
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
								value: element.continentSize + ' km²',
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
			prepareCountry() {
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
						value: this.countryOriginal.countrySize + ' km²',
					},
					{
						label: 'Internet TLD',
						value: '.' + this.countryOriginal.countryDomain,
					},
					{
						label: 'Capital',
						value: [
							{
								label: 'Name',
								value: this.countryOriginal.city.cityName,
							},
							{
								label: 'Population',
								value: this.countryOriginal.city.cityPopulation,
							},
						],
					},
					{
						label: 'Currency',
						value: [
							{
								label: 'Name',
								value: this.countryOriginal.currency.currencyName,
							},
							{
								label: 'ISO 4217',
								value: this.countryOriginal.currency.currencySymbol,
							},
						],
					},
					{
						label: 'Continents',
						multi: true,
						value: this.prepareArrays(this.countryOriginal.continents, 'continents'),
					},
					{
						label: 'Languages',
						multi: true,

						value: this.prepareArrays(this.countryOriginal.languages, 'languages'),
					},
					{
						label: 'Religions',
						multi: true,
						value: this.prepareArrays(this.countryOriginal.religions, 'religions'),
					},
				];

				return country;
			},
		},
	};
</script>
