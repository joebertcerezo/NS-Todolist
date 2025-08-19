<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Todo List - Strapi</h1>

    <!-- Add New Todo Form -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Add New Todo</h2>
      <form @submit.prevent="createTodo" class="space-y-4">
        <div>
          <input
            v-model="newTodo.title"
            type="text"
            placeholder="Todo title"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            v-model="newTodo.description"
            placeholder="Description (optional)"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          :disabled="creating"
          class="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md transition-colors"
        >
          {{ creating ? "Creating..." : "Add Todo" }}
        </button>
      </form>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-8">
      <p class="text-gray-600">Loading todos...</p>
    </div>

    <!-- Error State -->
    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <strong>Error:</strong> {{ error }}
    </div>

    <!-- Todo List -->
    <div v-if="!pending && todos" class="space-y-4">
      <div
        v-for="(todo, index) in todosList?.data"
        :key="index"
        class="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-300"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-800">
              {{ todo.title || "Untitled Todo" }}
            </h3>
            <p v-if="todo.description" class="text-gray-600 mt-2">
              {{ todo.description }}
            </p>
            <p class="text-sm text-gray-400 mt-2">
              Created: {{ formatDate(todo.createdAt) }}
            </p>
          </div>

          <div class="flex space-x-2 ml-4">
            <input
              type="checkbox"
              v-model="todo.completed"
              class=""
              @click="toggleTodo(todo, index)"
            />
            <!-- <button
              
              :disabled="updating === index"
              class="px-3 py-1 rounded text-sm transition-colors bg-green-500 hover:bg-green-600 text-white"
            >
              {{ updating === index ? "..." : "Toggle" }}
            </button> -->

            <button
              @click="removeTodo(todo, index)"
              :disabled="deleting === index"
              class="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-1 rounded text-sm transition-colors"
            >
              {{ deleting === index ? "..." : "x" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="todos.data && todos.data.length === 0"
        class="text-center py-8"
      >
        <p class="text-gray-600">No todos yet. Create your first one above!</p>
      </div>
    </div>
    <AddButton class="absolute right-10 bottom-10" />
  </div>
</template>

<script lang="ts" setup>
import type { CreateTodoData, Todo, TodosResponse } from "~/types/todo";

// Strapi composables
const { find, create, update, delete: deleteStrapi } = useStrapi();

// Reactive state
const newTodo = ref<CreateTodoData>({
  title: "",
  description: "",
});

const creating = ref(false);
const todosList = ref<TodosResponse>();
const updating = ref<number | null>(null);
const deleting = ref<number | null>(null);

// Fetch todos with useAsyncData for SSR support
const {
  data: todos,
  pending,
  error,
  refresh,
} = (await useAsyncData("todos", () =>
  find("todos", {
    sort: ["createdAt:desc"],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  })
)) as {
  data: Ref<TodosResponse>;
  pending: Ref<boolean>;
  error: Ref<any>;
  refresh: () => Promise<void>;
};

const getAllTodos = async () => {
  try {
    const response = await find<Todo>("todos");
    todosList.value = response;
    console.log(todosList.value);
  } catch (error) {
    console.log(error);
  }
};

// Methods
const createTodo = async () => {
  if (!newTodo.value.title.trim()) return;

  creating.value = true;
  try {
    const response = await create<Todo>("todos", {
      title: newTodo.value.title,
      description: newTodo.value.description || "",
      completed: false,
    });

    newTodo.value = { title: "", description: "" };
    todosList.value?.data.push(response.data);

    console.log("✅ Todo created successfully using useStrapi().create()");
  } catch (err) {
    console.error("❌ Error creating todo:", err);
  } finally {
    creating.value = false;
  }
};

const toggleTodo = async (todo: Todo, index: number) => {
  updating.value = index;
  try {
    await update("todos", todo.documentId, {
      completed: !todo.completed,
    });
    if (todosList.value?.data[index]) {
      todosList.value.data[index].completed = todo.completed;
    }

    console.log("✅ Todo updated successfully using useStrapi().update()");
  } catch (err) {
    console.error("❌ Error updating todo:", err);
  } finally {
    updating.value = null;
  }
};

const removeTodo = async (todo: Todo, index: number) => {
  if (!confirm("Are you sure you want to delete this todo?")) return;

  deleting.value = index;
  try {
    await deleteStrapi("todos", todo.documentId);
    todosList.value?.data.splice(index, 1);
    console.log("✅ Todo deleted successfully using useStrapi().delete()");
  } catch (err) {
    console.error("❌ Error deleting todo:", err);
  } finally {
    deleting.value = null;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

useHead({
  title: "Todo List - Nuxt Strapi Demo",
});

onMounted(async () => {
  await getAllTodos();
});
</script>
