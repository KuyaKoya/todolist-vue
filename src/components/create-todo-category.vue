<template>
  <form @submit.prevent="addTodoCategory()" class="createGrid">
      <input
        class="todoInput"
        v-model="todoCategory"
        name="todoCategory"
        autocomplete="off"
        placeholder="Add a todo category"
      />
      <div class="add">
        <button
          title="Add todo category"
          class="fa-solid fa-plus"
          :class="{ disabledButton: todoCategory.length <= 0 }"
          :disabled="todoCategory.length <= 0"/>
      </div>
  </form>
</template>

<script lang="ts">
import { Category } from '@/interfaces/ICategory';
import {
  ref,
  defineComponent,
  onUpdated,
  PropType,
} from 'vue';

export default defineComponent({
  name: 'AddTodoCategory',
  props: {
    propCat: { type: Array as PropType<Array<Category>>, required: true },
  },
  setup(props, { emit }) {
    const todoCategory = ref('');
    const categoryData = localStorage.getItem('categories');
    const parseCategory = categoryData !== null ? JSON.parse(categoryData) : [];
    const categories = ref(parseCategory);

    onUpdated(() => {
      categories.value = props.propCat;
    });

    function saveData() {
      const storageData = JSON.stringify(categories.value);
      localStorage.setItem('categories', storageData);
      emit('category', categories.value);
    }

    function addTodoCategory() {
      if (todoCategory.value) {
        categories.value.push({
          name: todoCategory.value,
          willAddTodo: false,
          todos: [],
        });
        todoCategory.value = '';
      }
      saveData();
    }

    function removeAllCategories() {
      categories.value = [];
      saveData();
    }

    return {
      todoCategory,
      categories,
      addTodoCategory,
      removeAllCategories,
    };
  },
});
</script>
