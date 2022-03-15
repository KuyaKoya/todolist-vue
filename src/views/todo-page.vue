<template>
<!-- create todo category -->
  <AddTodoCategory @category="updateCategory"/>
<!-- end of create todo category -->

<!-- category list -->
<CategoryList @category="updateCategory" :propCat="categories"/>
<!-- end of category list -->
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import AddTodoCategory from '@/components/create-todo-category.vue';
import CategoryList from '@/components/todo-category-list.vue';

export default defineComponent({
  name: 'TodoComponent',
  props: {
    categoryIndex: Number,
  },
  components: {
    AddTodoCategory,
    CategoryList,
  },
  setup() {
    const categoryData = localStorage.getItem('categories');
    const parseCategory = categoryData !== null ? JSON.parse(categoryData) : [];
    const categories = ref(parseCategory);

    function updateCategory(catValue: any) {
      categories.value = catValue;
    }

    return {
      categories,
      updateCategory,
    };
  },
});
</script>
