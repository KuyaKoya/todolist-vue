import {
  ref,
  Ref,
} from 'vue';
import { useToast } from 'primevue/usetoast';
import { Todo } from '@/interfaces/ITodo';

export default function useCategory() {
  const todoCategory = ref('');
  const categoryData = localStorage.getItem('categories');
  const parseCategory = categoryData !== null ? JSON.parse(categoryData) : [];
  const categories = ref(parseCategory);
  const newTodoList:Ref<string[]> = ref([]);
  const editTodoList:Ref<string[]> = ref([]);
  const toast = useToast();

  function saveData() {
    const storageData = JSON.stringify(categories.value);
    localStorage.setItem('categories', storageData);
  }

  function addAPIValue(jsonData: any) {
    categories.value = jsonData;
    saveData();
  }

  function addTodoCategory() {
    if (todoCategory.value) {
      categories.value.push({
        id: categories.value.length,
        name: todoCategory.value,
        willAddTodo: false,
        willAnimate: false,
        todos: [],
      });
    }
    toast.add({
      severity: 'success', summary: `Successfully added ${todoCategory.value}`, detail: `You can now add todo items in "${todoCategory.value}"`, life: 3000,
    });
    todoCategory.value = '';
    saveData();
  }
  /* eslint no-param-reassign: ["error", { "props": false }] */
  function doneTodo(todo: Todo) {
    todo.done = !todo.done;
    saveData();
  }

  function markAll(index: number) {
    categories.value[index].todos.forEach((todo: Todo) => {
      todo.done = true;
    });
  }

  function removeTodo(catIndex: number, todoIndex: number) {
    categories.value[catIndex].todos.splice(todoIndex, 1);
    categories.value[catIndex].willAnimate = true;
    saveData();

    setTimeout(() => {
      categories.value[catIndex].willAnimate = false;
      saveData();
    }, 500);
  }

  function removeAllTodo(index: number) {
    categories.value[index].todos = [];
    categories.value[index].willAnimate = true;
    saveData();

    setTimeout(() => {
      categories.value[index].willAnimate = false;
      saveData();
    }, 500);
  }

  function addTodo(index: number) {
    if (newTodoList.value[index]) {
      categories.value[index].todos.push({
        done: false,
        content: newTodoList.value[index],
        willEdit: false,
      });
      newTodoList.value[index] = '';
    }
    categories.value[index].willAddTodo = false;
    categories.value[index].willAnimate = true;
    saveData();

    setTimeout(() => {
      categories.value[index].willAnimate = false;
      saveData();
    }, 500);
  }

  function editPressed(catIndex: number, todoIndex: number) {
    categories.value[catIndex].todos[todoIndex].willEdit = true;
    editTodoList.value[todoIndex] = categories.value[catIndex].todos[todoIndex].content;
    saveData();
  }

  function saveTodo(catIndex: number, todoIndex: number) {
    if (editTodoList.value[todoIndex]) {
      categories.value[catIndex].todos[todoIndex].content = editTodoList.value[todoIndex];
    }
    categories.value[catIndex].todos[todoIndex].willEdit = false;
    categories.value[catIndex].willAnimate = true;
    saveData();

    setTimeout(() => {
      categories.value[catIndex].willAnimate = false;
      saveData();
    }, 500);
  }

  function removeCategory(index: number) {
    const categoryName = categories.value[index].name;
    categories.value.splice(index, 1);
    saveData();

    toast.add({
      severity: 'success', summary: `Successfully deleted ${categoryName}`, detail: `"${categoryName}" has been removed from the list`, life: 3000,
    });
  }

  return {
    todoCategory,
    categories,
    newTodoList,
    editTodoList,
    addAPIValue,
    addTodoCategory,
    addTodo,
    doneTodo,
    removeTodo,
    removeAllTodo,
    markAll,
    editPressed,
    saveTodo,
    removeCategory,
  };
}
