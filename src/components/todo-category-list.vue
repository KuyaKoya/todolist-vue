<template>
  <div class="category">
    <div v-for="(category, catIndex) in propCat" :key="catIndex">
        <div class="todoList">
          <!-- todo add -->
          <h2>{{ category.name }}</h2>
          <div class="addTodo">
            <div class="buttonOptions">
              <button
              v-show="!category.willAddTodo"
              @click="addCancelButton(catIndex)">Add Todo</button>
            </div>
            <div class="formBorder">
              <form @submit.prevent="addTodo(catIndex)" v-if="category.willAddTodo">
                <input
                  class="todoInput"
                  v-model="newTodo"
                  name="newTodo"
                  autocomplete="off"
                  placeholder="Add a todo item"
                />
                <div class="buttonOptions">
                  <button
                    :class="{ disabledButton: newTodo.length <= 0 }"
                    :disabled="newTodo.length <= 0"
                  >Add</button>
                  <button @click="addCancelButton(catIndex)">Cancel</button>
                </div>
              </form>
            </div>
          </div>
          <!-- end of todo add -->
          <!-- todo list -->
          <h4 v-if="category.todos.length === 0">
            You have nothing to do.
            <br />Try adding an item.
          </h4>
          <div v-else class="flex-container scrollable" id="container">
            <ul v-if="category.todos.length > 0">
              <draggable>
                <li class="box" v-for="(todo, todoIndex) in category.todos" :key="todoIndex">
                  <span
                    class="todo"
                    :class="{ done: todo.done }"
                    @keydown="doneTodo(todo)"
                    @click="doneTodo(todo)"
                    v-if="!todo.willEditTodo"
                  >{{ todo.content }}</span>
                  <input
                  class="todoInput"
                  v-else
                  v-model="editTodo"
                  name="editTodo"
                  autocomplete="off"
                  placeholder="Add a todo item"/>
                  <div class="buttonOptions">
                    <button
                    v-if="!todo.willEditTodo"
                    @click="editPressed(catIndex, todoIndex)">Edit</button>
                    <button
                    v-if="!todo.willEditTodo"
                    @click="removeTodo(catIndex, todoIndex)">Remove</button>
                    <button v-else @click="saveTodo(catIndex, todoIndex)">Save</button>
                  </div>
                </li>
              </draggable>
            </ul>
          </div>
          <div class="buttonOptions">
            <button
            @click="markAll(catIndex)"
            v-if="category.todos.length !== 0">Mark All Done</button>
            <button
            @click="removeAllTodo(catIndex)"
            v-if="category.todos.length !== 0">Remove All Tasks</button>
            <button
            v-if="propCat.length !== 0"
            @click="removeCategory(catIndex)">Delete Todo</button>
          </div>
        </div>
        <!-- end of todo list -->
      </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';
import TodoComponent from '@/components/todo-item-list.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Category } from '@/interfaces/ICategory';
import { Todo } from '@/interfaces/ITodo';

export default defineComponent({
  name: 'CategoryList',
  props: {
    propCat: { type: Array as PropType<Array<Category>>, required: true },
  },
  components: {
    draggable: VueDraggableNext,
  },
  setup(props, { emit }) {
    const newTodo = ref('');
    const editTodo = ref('');
    const todoCategory = ref('');
    const categoryData = localStorage.getItem('categories');
    const parseCategory = categoryData !== null ? JSON.parse(categoryData) : [];
    const categories = ref(parseCategory);

    function updateCategory() {
      categories.value = props.propCat;
    }

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
      updateCategory();
      categories.value[index].todos.forEach((todo: Todo) => {
        todo.done = true;
      });
    }

    function removeTodo(catIndex: number, todoIndex: number) {
      updateCategory();
      categories.value[catIndex].todos.splice(todoIndex, 1);
      saveData();
    }

    function removeAllTodo(index: number) {
      updateCategory();
      categories.value[index].todos = [];
      saveData();
    }

    function addTodo(index: number) {
      updateCategory();
      if (newTodo.value) {
        console.log('inside', categories);
        categories.value[index].todos.push({
          done: false,
          content: newTodo.value,
          willEditTodo: false,
        });
        newTodo.value = '';
      }
      saveData();
      categories.value[index].willAddTodo = false;
    }

    function editPressed(catIndex: number, todoIndex: number) {
      updateCategory();
      console.log(catIndex, '', todoIndex);
      const todo = categories.value[catIndex].todos;
      console.log(categories.value[catIndex].todos[todoIndex].content);
      categories.value[catIndex].todos[todoIndex].willEditTodo = true;
      editTodo.value = categories.value[catIndex].todos[todoIndex].content;
      saveData();
    }

    function saveTodo(catIndex: number, todoIndex: number) {
      updateCategory();
      console.log('pressed');
      console.log(editTodo.value);
      if (editTodo.value) {
        categories.value[catIndex].todos[todoIndex].content = editTodo.value;
      }
      categories.value[catIndex].todos[todoIndex].willEditTodo = false;
      saveData();
    }

    function addCancelButton(index: number) {
      updateCategory();
      for (let i = 0; i < categories.value.length;) {
        if (i === index) {
          categories.value[index].willAddTodo = !categories.value[index].willAddTodo;
        } else {
          categories.value[i].willAddTodo = false;
        }
        i += 1;
      }
      saveData();
      newTodo.value = '';
    }

    function removeCategory(index: number) {
      updateCategory();
      categories.value.splice(index, 1);
      saveData();
    }

    function removeAllCategories() {
      updateCategory();
      categories.value = [];
      saveData();
    }

    return {
      newTodo,
      editTodo,
      todoCategory,
      categories,
      addTodo,
      doneTodo,
      removeTodo,
      removeAllTodo,
      markAll,
      editPressed,
      saveTodo,
      addCancelButton,
      removeCategory,
      removeAllCategories,
    };
  },

});
</script>
