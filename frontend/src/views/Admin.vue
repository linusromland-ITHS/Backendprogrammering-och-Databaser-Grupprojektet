<template>
	<h2 class="text-3xl text-black m-5 font-semibold">Admin</h2>
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
		<button @click="createItem()">Create {{ activeTab.label }}</button>
		<ul>
			<li v-for="(item, index) in data" :key="index">
				<p>{{ item[`${activeTab.value}Name`] }}</p>
				<button @click="editItem(item)" :title="`Edit ${activeTab.label}`">
					<span class="material-icons"> edit </span>
				</button>
				<button @click="deleteItem(item)" :title="`Delete ${activeTab.label}`">
					<span class="material-icons"> delete </span>
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
				this.getData();
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

				this.updateFields();

				const request = await this.axios({
					method: 'get',
					url: this.activeTab.value,
				});

				this.data = (await request.data).data;
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
				const id = item[item._id ? '_id' : `${this.activeTab.value}ID`];
				this.fields[0].value = id;
				this.updateFields();
				this.fields.forEach((field) => {
					if (typeof item[field.dbKey] == 'object') {
						item[field.dbKey].forEach((value) => {
							field.value.push(value[field.endpoint + 'ID']);
						});
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
						this.fields = cityFields;
						break;
					case 'continent':
						this.fields = continentFields;
						break;
					case 'country':
						this.fields = countryFields;
						break;
					case 'currency':
						this.fields = currencyFields;
						break;
					case 'language':
						this.fields = languageFields;
						break;
					case 'planet':
						this.fields = planetFields;
						break;
					case 'religion':
						this.fields = religionFields;
						break;
					case 'sea':
						this.fields = seaFields;
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
				this.updateFields();
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
