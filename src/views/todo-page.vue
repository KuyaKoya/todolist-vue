<template>
<!-- category list -->
  <CategoryList/>
<!-- end of category list -->
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import CategoryList from '@/components/todo-category-list.vue';
import useCategory from '@/composables/use-todos';
import useAPI from '@/composables/use-api';

export default defineComponent({
  name: 'TodoComponent',
  components: {
    CategoryList,
  },
  setup() {
    const { categories, addAPIValue } = useCategory();
    const { fetchJSON } = useAPI();

    onMounted(() => {
      fetchJSON();
    });

    return {
      categories,
    };
  },
});
</script>
