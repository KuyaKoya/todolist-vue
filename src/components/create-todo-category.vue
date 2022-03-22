onMounted,
  onUpdated, import { Category } from '@/interfaces/ICategory';
, PropType<template>
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
import useCategory from '@/composables/use-todos';
import { Category } from '@/interfaces/ICategory';
import {
  defineComponent,
  onMounted,
  onUpdated,
  PropType,
} from 'vue';

export default defineComponent({
  name: 'AddTodoCategory',
  props: {
    categoryData: { type: Array as PropType<Array<Category>>, required: true },
  },
  emits: ['category'],
  setup(props, { emit }) {
    const {
      categories,
      todoCategory,
      addTodoCategory,
    } = useCategory();

    onMounted(() => {
      categories.value = props.categoryData;
      emit('category', categories.value);
    });

    onUpdated(() => {
      categories.value = props.categoryData;
      emit('category', categories.value);
    });

    return {
      categories,
      todoCategory,
      addTodoCategory,
    };
  },
});
</script>
