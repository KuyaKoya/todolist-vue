import useCategory from '@/composables/use-todos';
import { ref } from 'vue';

export default function useAPI() {
  const { categories, addAPIValue } = useCategory();

  function fetchJSON() {
    if (categories.value.length === 0) {
      fetch('http://localhost:8082/categories')
        .then((res) => res.json())
        // eslint-disable-next-line no-return-assign
        .then((json) => {
          console.log(json);
          addAPIValue(json);
        })
        .catch((err) => console.log(err));
    }
  }

  return {
    fetchJSON,
  };
}
