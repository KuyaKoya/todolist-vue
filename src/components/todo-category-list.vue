<template>
  <div class="category">
    <TodoList @category="updateCategory" :propCat="propCat"/>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  PropType,
  onUpdated,
} from 'vue';
import { Category } from '@/interfaces/ICategory';
import { Todo } from '@/interfaces/ITodo';
import TodoList from '@/components/todo-list.vue';

export default defineComponent({
  name: 'CategoryList',
  props: {
    propCat: { type: Array as PropType<Array<Category>>, required: true },
  },
  components: {
    TodoList,
  },
  setup(props, { emit }) {
    const categoryData = localStorage.getItem('categories');
    const parseCategory = categoryData !== null ? JSON.parse(categoryData) : [];
    const categories = ref(parseCategory);

    onUpdated(() => {
      categories.value = props.propCat;
      emit('category', categories.value);
    });

    function updateCategory(catValue: any) {
      categories.value = catValue;
      emit('category', categories.value);
    }

    return {
      updateCategory,
    };
  },
});
</script>
