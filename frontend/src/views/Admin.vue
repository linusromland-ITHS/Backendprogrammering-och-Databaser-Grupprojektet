<template>
	<header class="flex items-center">
		<router-link
			to="/"
			class="max-w-fit m-5 flex items-center hover:bg-gray-400 transition duration-150 ease rounded-md p-2"
		>
			<span class="material-icons text-2xl">arrow_back</span>
		</router-link>
		<h2 class="text-3xl text-black m-5 ml-0 font-semibold max-w-fit">Admin</h2>
	</header>

	<nav>
		<button
			v-for="(tab, index) in tabs"
			:key="index"
			:class="{ 'button-active': tab == activeTab.label }"
			@click="updateActiveTab(tab)"
		>
			{{ tab }}
		</button>
	</nav>
	<div>
		<button
			@click="createItem()"
			class="m-2 p-2 text-white bg-blue-500 hover:bg-blue-400 transition ease duration-150 rounded-md"
		>
			Create {{ activeTab.label }}
		</button>
		<ul class="m-2">
			<li
				v-for="(item, index) in data"
				:key="index"
				class="w-4/5 md:w-3/5 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition ease-in duration-150 cursor-pointer mb-4 hover:drop-shadow-md flex items-center"
			>
				<h3 class="mr-auto text-lg font-semibold">{{ item[`${activeTab.value}Name`] }}</h3>
				<button
					@click="editItem(item)"
					:title="`Edit ${activeTab.label}`"
					class="flex hover:bg-gray-400 transition duration-150 ease rounded-md"
				>
					<span class="material-icons text-2xl p-2"> edit </span>
				</button>
				<button
					@click="deleteItem(item)"
					:title="`Delete ${activeTab.label}`"
					class="flex hover:bg-gray-400 transition duration-150 ease rounded-md"
				>
					<span class="material-icons text-2xl p-2"> delete </span>
				</button>
			</li>
		</ul>
	</div>

	<Modal v-if="showModal">
		<Form
			:endpoint="activeTab.value"
			:method="formMethod"
			:fields="fields"
			@cancel="closeModal"
			@success="success"
		/>
	</Modal>
</template>
<script>
	import { useToast } from 'vue-toastification';
	import Form from '../components/Form.vue';
	import Modal from '../components/Modal.vue';

	import cityFields from '../assets/City.json';
	import continentFields from '../assets/Continent.json';
	import countryFields from '../assets/Country.json';
	import currencyFields from '../assets/Currency.json';
	import languageFields from '../assets/Language.json';
	import planetFields from '../assets/Planet.json';
	import religionFields from '../assets/Religion.json';
	import seaFields from '../assets/Sea.json';

	export default {
		name: 'Admin',
		components: {
			Form,
			Modal,
		},
		data() {
			return {
				tabs: ['City', 'Continent', 'Country', 'Currency', 'Language', 'Planet', 'Religion', 'Sea'],
				activeTab: {
					label: '',
					value: '',
				},
				fields: [],
				data: [],
				confirmDelete: '',
				confirmDeleteTimeout: null,
				confirmDeleteToast: null,
				showModal: false,
				formMethod: '',
			};
		},
		watch: {
			$route() {
				if (this.$route.params.tab) this.getData();
			},
		},
		created() {
			this.getData();
		},
		methods: {
			updateActiveTab(tab) {
				this.$router.push(`/admin/${tab.toLowerCase()}`);
			},
			async getData() {
				const tab = this.$route.params.tab.toLowerCase();
				this.activeTab.label = tab.charAt(0).toUpperCase() + tab.slice(1);
				this.activeTab.value = tab;

				const request = await this.axios({
					method: 'get',
					url: this.activeTab.value,
				});

				const response = await request.data;

				this.data = response.data.result ? response.data.result : response.data;
			},
			async deleteItem(item) {
				const toast = useToast();

				const id = item[item._id ? '_id' : `${this.activeTab.value}ID`];

				if (this.confirmDelete != id) {
					this.confirmDelete = id;
					toast.dismiss(this.confirmDeleteToast);

					this.confirmDeleteToast = toast.info(
						`To confirm, click the delete button again within 10 seconds.`,
						{
							timeout: 10000,
							hideProgressBar: false,
							pauseOnHover: false,
							closeButton: false,
						},
					);

					clearTimeout(this.confirmDeleteTimeout);
					this.confirmDeleteTimeout = setTimeout(() => {
						this.confirmDelete = '';
					}, 10000);
				} else {
					toast.dismiss(this.confirmDeleteToast);
					clearTimeout(this.confirmDeleteTimeout);

					const request = await this.axios({
						method: 'delete',
						url: this.activeTab.value,
						data: {
							id: id,
						},
					});

					const response = await request.data;

					if (response.success) {
						this.getData();
						toast.success(`${this.activeTab.label} deleted.`);
					} else {
						toast.error(`Error: ${response.error}.`);
					}
				}
			},
			editItem(item) {
				this.updateFields();

				const id = item[item._id ? '_id' : `${this.activeTab.value}ID`];
				this.fields[0].value = id;
				this.fields.forEach((field) => {
					if (typeof item[field.dbKey] == 'object') {
						if (field.type == 'textMany') {
							field.value = item[field.dbKey].toString();
						} else {
							item[field.dbKey].forEach((value) => {
								field.value.push(value[field.endpoint + 'ID']);
							});
						}
					} else {
						field.value = item[field.dbKey];
					}
				});

				this.formMethod = 'put';
				this.showModal = true;
			},

			createItem() {
				this.updateFields();
				this.formMethod = 'post';
				this.showModal = true;
			},
			updateFields() {
				this.fields = [];
				switch (this.activeTab.value) {
					case 'city':
						this.fields = JSON.parse(JSON.stringify(cityFields));
						break;
					case 'continent':
						this.fields = JSON.parse(JSON.stringify(continentFields));
						break;
					case 'country':
						this.fields = JSON.parse(JSON.stringify(countryFields));
						break;
					case 'currency':
						this.fields = JSON.parse(JSON.stringify(currencyFields));
						break;
					case 'language':
						this.fields = JSON.parse(JSON.stringify(languageFields));
						break;
					case 'planet':
						this.fields = JSON.parse(JSON.stringify(planetFields));
						break;
					case 'religion':
						this.fields = JSON.parse(JSON.stringify(religionFields));
						break;
					case 'sea':
						this.fields = JSON.parse(JSON.stringify(seaFields));
						break;
					default:
						this.fields = [];
						break;
				}
			},
			success(success) {
				if (success) this.getData();
				this.showModal = false;
			},
			closeModal() {
				this.showModal = false;
			},
		},
	};
</script>
<style scoped>
	nav {
		@apply bg-gray-200;
	}

	nav > button {
		@apply px-5 py-2 bg-gray-200 rounded-t-md hover:bg-gray-300 transition ease-out duration-150;
	}
	.button-active {
		@apply bg-blue-500 text-white hover:bg-blue-600;
	}
</style>
