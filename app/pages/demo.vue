<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Strapi Composables Demo</h1>

    <!-- Method Examples -->
    <div class="grid gap-6">
      <!-- 1. find() Example -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">
          1. useStrapi().find() - Get All Entries
        </h2>
        <button
          @click="getAllTodos"
          :disabled="loading.find"
          class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {{ loading.find ? "Loading..." : "Get All Todos" }}
        </button>
        <pre
          v-if="results.find"
          class="bg-gray-100 p-4 rounded text-sm overflow-auto"
          >{{ results.find }}</pre
        >
      </div>

      <!-- 2. findOne() Example -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">
          2. useStrapi().findOne() - Get Single Entry
        </h2>
        <div class="flex gap-2 mb-4">
          <input
            v-model="todoId"
            placeholder="Enter todo document ID"
            class="border px-3 py-2 rounded flex-1"
          />
          <button
            @click="getOneTodo"
            :disabled="loading.findOne"
            class="bg-green-500 text-white px-4 py-2 rounded"
          >
            {{ loading.findOne ? "Loading..." : "Get Todo" }}
          </button>
        </div>
        <pre
          v-if="results.findOne"
          class="bg-gray-100 p-4 rounded text-sm overflow-auto"
          >{{ results.findOne }}</pre
        >
      </div>

      <!-- 3. create() Example -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">
          3. useStrapi().create() - Create New Entry
        </h2>
        <div class="space-y-2 mb-4">
          <input
            v-model="newTodo.title"
            placeholder="Todo title"
            class="border px-3 py-2 rounded w-full"
          />
          <input
            v-model="newTodo.description"
            placeholder="Description"
            class="border px-3 py-2 rounded w-full"
          />
          <button
            @click="createTodo"
            :disabled="loading.create"
            class="bg-purple-500 text-white px-4 py-2 rounded"
          >
            {{ loading.create ? "Creating..." : "Create Todo" }}
          </button>
        </div>
        <pre
          v-if="results.create"
          class="bg-gray-100 p-4 rounded text-sm overflow-auto"
          >{{ results.create }}</pre
        >
      </div>

      <!-- 4. update() Example -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">
          4. useStrapi().update() - Update Entry
        </h2>
        <div class="flex gap-2 mb-4">
          <input
            v-model="updateId"
            placeholder="Document ID to update"
            class="border px-3 py-2 rounded flex-1"
          />
          <input
            v-model="updateTitle"
            placeholder="New title"
            class="border px-3 py-2 rounded flex-1"
          />
          <button
            @click="updateTodo"
            :disabled="loading.update"
            class="bg-orange-500 text-white px-4 py-2 rounded"
          >
            {{ loading.update ? "Updating..." : "Update" }}
          </button>
        </div>
        <pre
          v-if="results.update"
          class="bg-gray-100 p-4 rounded text-sm overflow-auto"
          >{{ results.update }}</pre
        >
      </div>

      <!-- 5. delete() Example -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">
          5. useStrapi().delete() - Delete Entry
        </h2>
        <div class="flex gap-2 mb-4">
          <input
            v-model="deleteId"
            placeholder="Document ID to delete"
            class="border px-3 py-2 rounded flex-1"
          />
          <button
            @click="deleteTodo"
            :disabled="loading.delete"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            {{ loading.delete ? "Deleting..." : "Delete" }}
          </button>
        </div>
        <pre
          v-if="results.delete"
          class="bg-gray-100 p-4 rounded text-sm overflow-auto"
          >{{ results.delete }}</pre
        >
      </div>

      <!-- Other Composables -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Other Strapi Composables</h2>
        <div class="space-y-4">
          <div>
            <button
              @click="testStrapiClient"
              class="bg-indigo-500 text-white px-4 py-2 rounded mr-2"
            >
              Test useStrapiClient()
            </button>
            <span class="text-sm text-gray-600">Custom API calls</span>
          </div>
          <div>
            <button
              @click="getStrapiUrl"
              class="bg-teal-500 text-white px-4 py-2 rounded mr-2"
            >
              Get useStrapiUrl()
            </button>
            <span class="text-sm text-gray-600">Current: {{ strapiUrl }}</span>
          </div>
        </div>
        <pre
          v-if="results.other"
          class="bg-gray-100 p-4 rounded text-sm overflow-auto mt-4"
          >{{ results.other }}</pre
        >
      </div>
    </div>

    <!-- Instructions -->
    <div class="mt-8 bg-yellow-50 p-6 rounded-lg">
      <h3 class="font-semibold mb-2">🛠️ Before Testing:</h3>
      <ol class="list-decimal list-inside space-y-1 text-sm">
        <li>
          Make sure your Strapi backend is running:
          <code>cd NS-Todolist-API && pnpm run dev</code>
        </li>
        <li>Create a "todos" content type in Strapi admin panel</li>
        <li>
          Add fields: title (Text), description (Text), completed (Boolean)
        </li>
        <li>Set public permissions for todos in Users & Permissions plugin</li>
        <li>Test the buttons above to see how each composable works</li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
// Get all Strapi composables
const { find, findOne, create, update, delete: deleteEntry } = useStrapi();
const client = useStrapiClient();
const strapiUrl = useStrapiUrl();

// Reactive state
const loading = ref({
  find: false,
  findOne: false,
  create: false,
  update: false,
  delete: false,
});

const results = ref({
  find: null as any,
  findOne: null as any,
  create: null as any,
  update: null as any,
  delete: null as any,
  other: null as any,
});

const todoId = ref("");
const newTodo = ref({ title: "", description: "" });
const updateId = ref("");
const updateTitle = ref("");
const deleteId = ref("");

// Methods demonstrating each Strapi composable

// 1. find() - Get all entries
const getAllTodos = async () => {
  loading.value.find = true;
  try {
    const response = await find("todos", {
      sort: ["createdAt:desc"],
      pagination: { page: 1, pageSize: 10 },
    });
    results.value.find = response;
  } catch (error: any) {
    results.value.find = { error: error.message };
  } finally {
    loading.value.find = false;
  }
};

// 2. findOne() - Get single entry
const getOneTodo = async () => {
  if (!todoId.value) {
    results.value.findOne = { error: "Please enter a document ID" };
    return;
  }

  loading.value.findOne = true;
  try {
    const response = await findOne("todos", todoId.value);
    results.value.findOne = response;
  } catch (error: any) {
    results.value.findOne = { error: error.message };
  } finally {
    loading.value.findOne = false;
  }
};

// 3. create() - Create new entry
const createTodo = async () => {
  if (!newTodo.value.title) {
    results.value.create = { error: "Title is required" };
    return;
  }

  loading.value.create = true;
  try {
    const response = await create("todos", {
      data: {
        title: newTodo.value.title,
        description: newTodo.value.description,
        completed: false,
      },
    });
    results.value.create = response;
    newTodo.value = { title: "", description: "" };
  } catch (error: any) {
    results.value.create = { error: error.message };
  } finally {
    loading.value.create = false;
  }
};

// 4. update() - Update existing entry
const updateTodo = async () => {
  if (!updateId.value || !updateTitle.value) {
    results.value.update = { error: "Document ID and new title are required" };
    return;
  }

  loading.value.update = true;
  try {
    const response = await update("todos", updateId.value, {
      data: { title: updateTitle.value },
    });
    results.value.update = response;
    updateId.value = "";
    updateTitle.value = "";
  } catch (error: any) {
    results.value.update = { error: error.message };
  } finally {
    loading.value.update = false;
  }
};

// 5. delete() - Delete entry
const deleteTodo = async () => {
  if (!deleteId.value) {
    results.value.delete = { error: "Document ID is required" };
    return;
  }

  loading.value.delete = true;
  try {
    const response = await deleteEntry("todos", deleteId.value);
    results.value.delete = response || { success: "Todo deleted successfully" };
    deleteId.value = "";
  } catch (error: any) {
    results.value.delete = { error: error.message };
  } finally {
    loading.value.delete = false;
  }
};

// Test other composables
const testStrapiClient = async () => {
  try {
    const response = await client("/todos?pagination[pageSize]=3");
    results.value.other = {
      method: "useStrapiClient()",
      response,
    };
  } catch (error: any) {
    results.value.other = {
      method: "useStrapiClient()",
      error: error.message,
    };
  }
};

const getStrapiUrl = () => {
  results.value.other = {
    method: "useStrapiUrl()",
    url: strapiUrl,
  };
};

// Set page title
useHead({
  title: "Strapi Composables Demo",
});
</script>
