<template>
<!-- create todo category -->
  <AddTodoCategory @category="updateCategory" :propCategory="categories"/>
<!-- end of create todo category -->

<!-- category list -->
  <CategoryList @category="updateCategory" :propCategory="categories"/>
<!-- end of category list -->
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import AddTodoCategory from '@/components/create-todo-category.vue';
import CategoryList from '@/components/todo-category-list.vue';

export default defineComponent({
  name: 'TodoComponent',
  components: {
    AddTodoCategory,
    CategoryList,
  },
  setup() {
    // const categoryData = [{
    //   name: 'Do not delete',
    //   todos: [
    //     {
    //       content: 'transfer logic to composables',
    //       done: false,
    //       willEdit: false,
    //     },
    //     {
    //       content: 'finish flicker',
    //       done: false,
    //       willEdit: false,
    //     },
    //     {
    //       content: 'make local storage stacic object',
    //       done: true,
    //       willEdit: false,
    //     },
    //     {
    //       content: 'rename willAddTodo in Todo',
    //       done: true,
    //       willEdit: false,
    //     },
    //     {
    //       content: 'create enums for routes',
    //       done: true,
    //       willEdit: false,
    //     },
    //   ],
    //   willAddTodo: false,
    //   willAnimate: false,
    // }];
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
