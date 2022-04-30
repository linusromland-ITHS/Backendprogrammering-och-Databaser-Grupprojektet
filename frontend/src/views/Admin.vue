<template>
	<h1 class="text-3xl text-red-400">Admin</h1>
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
		<button>Create {{ activeTab.label }}</button>
		<ul>
			<li v-for="(item, index) in data" :key="index">
				<p>{{ item[`${activeTab.value}Name`] }}</p>
				<button :title="`Edit ${activeTab.label}`"><span class="material-icons"> edit </span></button>
				<button @click="deleteItem(item)" :title="`Delete ${activeTab.label}`">
					<span class="material-icons"> delete </span>
				</button>
			</li>
		</ul>
	</div>
</template>
<script>
	import { useToast } from 'vue-toastification';

	export default {
		name: 'Admin',
		data() {
			return {
				tabs: ['City', 'Continent', 'Country', 'Currency', 'Language', 'Planet', 'Religion', 'Sea'],
				activeTab: {
					label: '',
					value: '',
				},
				data: [],
				confirmDelete: '',
				confirmDeleteTimeout: null,
				confirmDeleteToast: null,
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
