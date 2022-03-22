onMounted, , PropTypeimport { Category } from '@/interfaces/ICategory';
<template>
  <AddTodoCategory @category="updateCategory" :categoryData="categories"/>
  <div class="category">
    <TodoList @category="updateCategory" :categoryData="categories"/>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, onUpdated,
} from 'vue';
import TodoList from '@/components/todo-list.vue';
import AddTodoCategory from '@/components/create-todo-category.vue';
import useCategory from '@/composables/use-todos';
import { Category } from '@/interfaces/ICategory';

export default defineComponent({
  name: 'CategoryList',
  emits: ['category'],
  components: {
    TodoList,
    AddTodoCategory,
  },
  setup(props, { emit }) {
    const {
      categories,
      addDummyData,
    } = useCategory();

    onMounted(() => {
      addDummyData();
      emit('category', categories.value);
    });

    onUpdated(() => {
      emit('category', categories.value);
    });

    function updateCategory(categoryValue: Category) {
      categories.value = categoryValue;
      emit('category', categories.value);
    }

    return {
      categories,
      updateCategory,
    };
  },
});
</script>
