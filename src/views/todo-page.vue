<template>
<!-- category list -->
  <CategoryList/>
<!-- end of category list -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryList from '@/components/todo-category-list.vue';
import useCategory from '@/composables/use-todos';

export default defineComponent({
  name: 'TodoComponent',
  components: {
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

    const { categories } = useCategory();
    return {
      categories,
    };
  },
});
</script>
