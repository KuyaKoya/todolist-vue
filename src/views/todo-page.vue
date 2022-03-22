<template>
<!-- category list -->
  <CategoryList/>
<!-- end of category list -->
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import CategoryList from '@/components/todo-category-list.vue';
import useCategory from '@/composables/use-todos';

export default defineComponent({
  name: 'TodoComponent',
  components: {
    CategoryList,
  },
  setup() {
    const { categories } = useCategory();

    return {
      categories,
    };
  },
});
</script>
