,
PropTypeimport { Category } from '@/interfaces/ICategory';
,
onUpdated<template>
  <div v-for="(category, catIndex) in categoryData" :key="catIndex">
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
        v-if="categoryData.length !== 0"
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
  defineComponent,
  onMounted,
  onUpdated,
  PropType,
} from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import useCategory from '@/composables/use-todos';
import { Category } from '@/interfaces/ICategory';

export default defineComponent({
  name: 'TodoList',
  props: {
    categoryData: { type: Array as PropType<Array<Category>>, required: true },
  },
  emits: ['category'],
  components: {
    draggable: VueDraggableNext,
  },
  setup(props, { emit }) {
    const {
      categories,
      newTodoList,
      editTodoList,
      doneTodo,
      markAll,
      removeTodo,
      removeAllTodo,
      addTodo,
      editPressed,
      saveTodo,
      removeCategory,
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
      newTodoList,
      editTodoList,
      doneTodo,
      markAll,
      removeTodo,
      removeAllTodo,
      addTodo,
      editPressed,
      saveTodo,
      removeCategory,
    };
  },
});
</script>
