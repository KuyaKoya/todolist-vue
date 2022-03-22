<template>
  <div v-for="(category, catIndex) in propCat" :key="catIndex">
    <div class="todoList">
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
        v-if="propCat.length !== 0"
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
                  v-if="!todo.willEditTodo"
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
                  v-if="!todo.willEditTodo"
                  @click="editPressed(catIndex, todoIndex)">
                  </button>
                  <button
                  title="Delete Todo"
                  class="fa-solid fa-trash"
                  v-if="!todo.willEditTodo"
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

export default defineComponent({
  name: 'TodoList',
  props: {
    propCat: { type: Array as PropType<Array<Category>>, required: true },
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
    const isDrag = ref(VueDraggableNext.activated);

    onUpdated(() => {
      categories.value = props.propCat;
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
      console.log(categories.value);
      categories.value[catIndex].todos.splice(todoIndex, 1);
      saveData();
    }

    function removeAllTodo(index: number) {
      categories.value[index].todos = [];
      saveData();
    }

    function addTodo(index: number) {
      if (newTodoList.value[index]) {
        console.log('inside', categories);
        categories.value[index].todos.push({
          done: false,
          content: newTodoList.value[index],
          willEditTodo: false,
        });
        newTodoList.value[index] = '';
      }
      categories.value[index].willAddTodo = false;
      saveData();
    }

    function editPressed(catIndex: number, todoIndex: number) {
      console.log(catIndex, '', todoIndex);
      const todo = categories.value[catIndex].todos;
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
      saveData();
    }

    function cancelButton(index: number) {
      categories.value[index].willAddTodo = !categories.value[index].willAddTodo;
      saveData();
    }

    function removeCategory(index: number) {
      categories.value.splice(index, 1);
      saveData();
    }

    function removeAllCategories() {
      categories.value = [];
      saveData();
    }

    function handleMove(event:any) {
      console.log('moving', event);
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
      handleMove,
    };
  },
});
</script>
