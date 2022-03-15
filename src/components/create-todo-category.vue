<template>
  <div class="formBorder">
    <form @submit.prevent="addTodoCategory()">
        <input
          class="todoInput"
          v-model="todoCategory"
          name="todoCategory"
          autocomplete="off"
          placeholder="Add a todo category"
        />
        <div class="buttonOptions">
          <button
            :class="{ disabledButton: todoCategory.length <= 0 }"
            :disabled="todoCategory.length <= 0"
          >Add Category</button>
          <button
            v-if="categories.length !== 0"
            @click="removeAllCategories()">Delete All</button>
        </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'AddTodoCategory',
  setup(_, { emit }) {
    const todoCategory = ref('');
    const categoryData = localStorage.getItem('categories');
    const parseCategory = categoryData !== null ? JSON.parse(categoryData) : [];
    const categories = ref(parseCategory);

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
