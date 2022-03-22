<template>
  <div v-for="(category, catIndex) in propCategory" :key="catIndex">
    <div
    class="todoList"
    :class="{ animTodoAdded: category.willAnimate }"
    >
      <div class="categoryButtons">
        <button
        title="Mark all Todos Done"
        class="fa-solid fa-clipboard-check"
        @click="markAll(catIndex)"
        v-if="category.todos.length !== 0"/>
        <button
        title="Delete All Todos Item"
        class="fa-solid fa-trash"
        @click="removeAllTodo(catIndex)"
        v-if="category.todos.length !== 0"/>
        <button
        title="Delete Todo Category"
        class="fa-solid fa-xmark"
        v-if="propCategory.length !== 0"
        @click="removeCategory(catIndex)"/>
      </div>
      <!-- todo add -->
      <h2>{{ category.name }}</h2>
      <form @submit.prevent="addTodo(catIndex)" class="contentGrid">
        <input
          class="addInput"
          v-model="newTodoList[catIndex]"
          :name="'newTodo_' + catIndex"
          autocomplete="off"
          placeholder="Add a todo item"
        />
        <div class="add">
          <button
            title="Add todo item"
            class="fa-solid fa-plus"
            :class="{ disabledButton: !newTodoList[catIndex] }"
            :disabled="!newTodoList[catIndex]"/>
        </div>
      </form>
      <!-- end of todo add -->
      <!-- todo list -->
      <h4 v-if="category.todos.length === 0">
        You have nothing to do.
        <br />Try adding an item.
      </h4>
      <div v-else class="flex-container scrollable">
        <ul v-if="category.todos.length > 0">
          <draggable>
            <li class="box"
            v-for="(todo, todoIndex) in category.todos" :key="todoIndex">
              <div class="contentGrid">
                <div class="content">
                  <span
                  class="todo"
                  :class="{ done: todo.done }"
                  @keydown="doneTodo(todo)"
                  @click="doneTodo(todo)"
                  v-if="!todo.willEdit"
                  >{{ todo.content }}</span
                >
                <input
                  class="contentInput"
                  v-else
                  v-model="editTodoList[todoIndex]"
                  name="editTodo"
                  autocomplete="off"
                  placeholder="Add a todo item"
                />
                </div>
                <div class="options">
                  <button
                  title="Edit Todo"
                  class="fa-solid fa-pencil"
                  v-if="!todo.willEdit"
                  @click="editPressed(catIndex, todoIndex)">
                  </button>
                  <button
                  title="Delete Todo"
                  class="fa-solid fa-trash"
                  v-if="!todo.willEdit"
                  @click="removeTodo(catIndex, todoIndex)"/>
                  <button
                  title="Save Todo"
                  class="fa-solid fa-floppy-disk"
                  v-else @click="saveTodo(catIndex, todoIndex)"/>
                </div>
              </div>
            </li>
          </draggable>
        </ul>
      </div>
    </div>
    <!-- end of todo list -->
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, PropType, onUpdated, Ref,
} from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Category } from '@/interfaces/ICategory';
import { Todo } from '@/interfaces/ITodo';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  name: 'TodoList',
  props: {
    propCategory: { type: Array as PropType<Array<Category>>, required: true },
  },
  components: {
    draggable: VueDraggableNext,
  },
  setup(props, { emit }) {
    const todoCategory = ref('');
    const categoryData = localStorage.getItem('categories');
    const parseCategory = categoryData !== null ? JSON.parse(categoryData) : [];
    const categories = ref(parseCategory);
    const newTodoList:Ref<string[]> = ref([]);
    const editTodoList:Ref<string[]> = ref([]);
    const toast = useToast();

    onUpdated(() => {
      categories.value = props.propCategory;
      emit('category', categories.value);
    });

    function saveData() {
      const storageData = JSON.stringify(categories.value);
      localStorage.setItem('categories', storageData);
      emit('category', categories.value);
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
          willEditTodo: false,
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
      console.log(catIndex, '', todoIndex);
      console.log(categories.value[catIndex].todos[todoIndex].content);
      categories.value[catIndex].todos[todoIndex].willEditTodo = true;
      editTodoList.value[todoIndex] = categories.value[catIndex].todos[todoIndex].content;
      saveData();
    }

    function saveTodo(catIndex: number, todoIndex: number) {
      if (editTodoList.value[todoIndex]) {
        categories.value[catIndex].todos[todoIndex].content = editTodoList.value[todoIndex];
      }
      categories.value[catIndex].todos[todoIndex].willEditTodo = false;
      categories.value[catIndex].willAnimate = true;
      saveData();

      setTimeout(() => {
        categories.value[catIndex].willAnimate = false;
        saveData();
      }, 500);
    }

    function cancelButton(index: number) {
      categories.value[index].willAddTodo = !categories.value[index].willAddTodo;
      saveData();
    }

    function removeCategory(index: number) {
      const categoryName = categories.value[index].name;
      console.log(categoryName);
      categories.value.splice(index, 1);
      saveData();

      toast.add({
        severity: 'success', summary: `Successfully deleted ${categoryName}`, detail: `"${categoryName}" has been removed from the list`, life: 3000,
      });
    }

    function removeAllCategories() {
      categories.value = [];
      saveData();
    }

    return {
      todoCategory,
      categories,
      newTodoList,
      editTodoList,
      addTodo,
      doneTodo,
      removeTodo,
      removeAllTodo,
      markAll,
      editPressed,
      saveTodo,
      cancelButton,
      removeCategory,
      removeAllCategories,
    };
  },
});
</script>
