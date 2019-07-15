<template>
	<div class="add-category">
		<b-form
			@submit="submitNewCategory"
			@reset="onReset"
		>
			<b-card
				class="mb-4"
				bg-variant="light"
			>
				<h5>Добавление категории</h5>
				<b-form-group
					id="title-group"
					label="Название"
					label-for="title-input"
				>
					<b-form-input
						id="title-input"
						v-model="newCategory.title"
						type="text"
						required
						placeholder="Введите название категории"
					/>
				</b-form-group>

				<b-form-group
					id="input-group-3"
					label="Родительская категория:"
					label-for="input-3"
				>
					<b-form-select
						id="input-3"
						v-model="newCategory.parentCategory"
						value-field="_id"
						text-field="title"
						:options="categoriesWithoutNewCat"
						required
					/>
				</b-form-group>

				<b-button
					variant="success"
					class="m-1"
					@click="submitNewCategory"
				>
					Сохранить
				</b-button>
				<b-button
					type="reset"
					variant="danger"
					class="m-1"
				>
					Сбросить
				</b-button>

			</b-card>
		</b-form>
	</div>
</template>

<script>
	export default {
		name: 'AddCategory',
		props: {
			onAddCategory: Function,
			categories: Array
		},
		data() {
			return {
				newCategory: {
					title: '',
					parentCategory: '',
				},
			};
		},
		mounted(){},
		methods: {
			submitNewCategory() {
				this.$store.dispatch('saveCategory', this.newCategory)
					.then()
			},
			onReset() {
				this.newCategory = {
					title: '',
					parentCategory: '',
				};
			},
		},
		computed: {
			categoriesWithoutNewCat() {
				return this.categories.filter(cat => {
					if (cat.title !== 'Новая категория') {
						return true;
					} else return false;
				})
			}
		}
	};
</script>
