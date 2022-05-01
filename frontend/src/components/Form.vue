<template>
	<form class="w-10/12">
		<h2 class="mb-2 text-2xl font-semibold">{{ `${submitText} ${endpoint}` }}</h2>
		<div v-for="field in fields" :key="field">
			<div class="flex flex-col" v-show="field.key != 'id'">
				<label class="">
					{{ field.title
					}}<span v-if="field.type == 'textMany'" class="help-text px-1">Separate entries by ","</span>
				</label>
				<FormInput
					:type="field.type"
					:value="field.value"
					:max="field.max"
					:min="field.min"
					:endpoint="field.endpoint"
					@input="(value) => (field.value = value)"
					class="w-full p-2 border border-gray-300 rounded-md mb-2"
				/>
			</div>
		</div>
		<div class="flex justify-between">
			<button
				class="p-2 text-white bg-red-500 hover:bg-red-400 transition ease duration-150 rounded-md"
				@click="$emit('cancel')"
			>
				Cancel
			</button>
			<button
				@click="submit"
				class="p-2 text-white bg-blue-500 hover:bg-blue-400 transition ease duration-150 rounded-md"
			>
				{{ submitText }}
			</button>
		</div>
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
			},
		},
		emits: ['cancel', 'success'],
		computed: {
			submitText() {
				if (this.method === 'post') {
					return 'Create';
				}
				return 'Update';
			},
		},
		methods: {
			async submit(event) {
				event.preventDefault();

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
					if (this.method == 'put')
						toast.success(`Successfully updated ${response.data[this.endpoint + 'Name']}`);
					else toast.success(`Successfully created ${response.data[this.endpoint + 'Name']}`);
					this.$emit('success', response.success);
				} else {
					toast.error(`Error: ${response.error}`);
				}
			},
		},
	};
</script>
