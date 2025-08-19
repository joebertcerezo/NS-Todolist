# How to Use Strapi Module in Your Nuxt 3 Application

## Overview

Your project is configured with `@nuxtjs/strapi` module and connects to a Strapi v5 backend. Here's a comprehensive guide on how to use all the Strapi composables.

## Setup Verification

### 1. Nuxt Configuration (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi"],
  runtimeConfig: {
    strapi: {
      url: "http://localhost:1337",
    },
    public: {
      strapi: {
        url: "http://localhost:1337",
      },
    },
  },
});
```

## Core Composables

### 1. `useStrapi()` - Main API Methods

#### Basic Usage

```vue
<script setup>
// Get all Strapi methods
const { find, findOne, create, update, delete: deleteEntry } = useStrapi();
</script>
```

#### With TypeScript Types

```vue
<script setup lang="ts">
interface Todo {
  id: number;
  documentId: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const { find, create, update, delete: deleteEntry } = useStrapi<Todo>();
</script>
```

### 2. `find()` - Get Multiple Entries

#### Basic Find

```javascript
// Get all todos
const todos = await find("todos");

// With parameters
const todos = await find("todos", {
  sort: ["createdAt:desc"],
  pagination: {
    page: 1,
    pageSize: 10,
  },
  filters: {
    completed: {
      $eq: false,
    },
  },
});
```

#### SSR-Friendly with useAsyncData

```javascript
const {
  data: todos,
  pending,
  error,
  refresh,
} = await useAsyncData("todos", () =>
  find("todos", {
    sort: ["createdAt:desc"],
    pagination: { page: 1, pageSize: 100 },
  })
);
```

### 3. `findOne()` - Get Single Entry

```javascript
// By document ID
const todo = await findOne("todos", "document-id-here");

// With route parameter
const route = useRoute();
const todo = await findOne("todos", route.params.id);

// Single type (no ID needed)
const settings = await findOne("global-settings");
```

### 4. `create()` - Create New Entry

```javascript
const newTodo = await create("todos", {
  data: {
    title: "My new todo",
    description: "Todo description",
    completed: false,
  },
});
```

### 5. `update()` - Update Existing Entry

```javascript
// Update by document ID
const updatedTodo = await update("todos", "document-id", {
  data: {
    completed: true,
    title: "Updated title",
  },
});

// For single types
const updatedSettings = await update("global-settings", {
  data: {
    siteName: "New Site Name",
  },
});
```

### 6. `delete()` - Delete Entry

```javascript
// Note: 'delete' is renamed because it's a reserved keyword
const { delete: deleteEntry } = useStrapi();

// Delete by document ID
await deleteEntry("todos", "document-id");
```

## Advanced Usage Examples

### 1. Complete Todo Component Example

```vue
<template>
  <div>
    <!-- Create Form -->
    <form @submit.prevent="createTodo">
      <input v-model="newTodo.title" placeholder="Todo title" required />
      <button type="submit" :disabled="creating">
        {{ creating ? "Creating..." : "Add Todo" }}
      </button>
    </form>

    <!-- Todo List -->
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <div v-for="todo in todos?.data" :key="todo.documentId">
        <h3>{{ todo.title }}</h3>
        <button @click="toggleComplete(todo)">
          {{ todo.completed ? "Mark Incomplete" : "Mark Complete" }}
        </button>
        <button @click="deleteTodo(todo.documentId)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { find, create, update, delete: deleteEntry } = useStrapi();

// State
const newTodo = ref({ title: "", description: "" });
const creating = ref(false);

// Fetch data with SSR support
const {
  data: todos,
  pending,
  error,
  refresh,
} = await useAsyncData("todos", () =>
  find("todos", { sort: ["createdAt:desc"] })
);

// Methods
const createTodo = async () => {
  creating.value = true;
  try {
    await create("todos", {
      data: { ...newTodo.value, completed: false },
    });
    newTodo.value = { title: "", description: "" };
    await refresh();
  } finally {
    creating.value = false;
  }
};

const toggleComplete = async (todo) => {
  await update("todos", todo.documentId, {
    data: { completed: !todo.completed },
  });
  await refresh();
};

const deleteTodo = async (documentId) => {
  await deleteEntry("todos", documentId);
  await refresh();
};
</script>
```

### 2. Other Composables

#### `useStrapiClient()` - Custom Endpoints

```javascript
const client = useStrapiClient();

// Custom API call
const response = await client("/custom-endpoint", {
  method: "POST",
  body: { customData: "value" },
});
```

#### `useStrapiUrl()` - Get API URL

```javascript
const strapiUrl = useStrapiUrl();
console.log(strapiUrl); // http://localhost:1337/api
```

#### `useStrapiMedia()` - Handle Media URLs

```javascript
const media = useStrapiMedia()

// In template
<img :src="media(image.url)" alt="Description" />
```

#### `useStrapiGraphQL()` - GraphQL Queries

```javascript
const graphql = useStrapiGraphQL();

const result = await graphql(`
  query {
    todos {
      data {
        id
        attributes {
          title
          completed
        }
      }
    }
  }
`);
```

## Request Parameters (Strapi v5)

### Pagination

```javascript
{
  pagination: {
    page: 1,
    pageSize: 25
  }
}
```

### Sorting

```javascript
{
  sort: ["createdAt:desc", "title:asc"];
}
```

### Filtering

```javascript
{
  filters: {
    title: { $contains: 'important' },
    completed: { $eq: false },
    createdAt: { $gte: '2024-01-01' }
  }
}
```

### Population (Relations)

```javascript
{
  populate: "*";
  // or specific fields
  populate: ["author", "categories"];
}
```

## Error Handling

### Global Error Handling

```javascript
// In nuxt.config.ts
export default defineNuxtConfig({
  hooks: {
    "strapi:error": (error) => {
      console.error("Strapi error:", error);
    },
  },
});
```

### Component Level

```javascript
try {
  const todo = await create("todos", { data: todoData });
} catch (error) {
  if (error.status === 400) {
    // Handle validation errors
  } else if (error.status === 401) {
    // Handle authentication errors
  }
}
```

## Best Practices

1. **Use `useAsyncData` for SSR**: Always wrap Strapi calls in `useAsyncData` for server-side rendering
2. **Handle Loading States**: Use `pending` from `useAsyncData`
3. **Refresh Data**: Call `refresh()` after mutations
4. **Type Safety**: Define TypeScript interfaces for your content types
5. **Error Boundaries**: Implement proper error handling

## Starting Your Strapi Backend

Before using these examples, make sure your Strapi backend is running:

```bash
cd /Users/jlcerezo/Downloads/NS-Todolist-API
pnpm run dev
```

Your Strapi admin will be available at `http://localhost:1337/admin`

## Next Steps

1. Create a "Todo" content type in your Strapi admin panel
2. Add fields: title (Text), description (Text), completed (Boolean)
3. Set appropriate permissions in Settings > Users & Permissions plugin > Roles > Public
4. Test the API endpoints at `http://localhost:1337/api/todos`
