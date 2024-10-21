<template>
  <div class="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg">
    <!-- Check if post is defined -->
    <div v-if="post">
      <img
        :src="post.image"
        alt="Post image"
        class="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h2 class="text-2xl font-bold mb-2">{{ post.title }}</h2>
      <p class="text-gray-700 mb-4">by {{ post.author }}</p>
      <p class="mb-4">{{ post.content }}</p>

      <router-link
        to="/"
        class="text-blue-500 hover:underline"
      >
        Back to Home
      </router-link>
    </div>

    <!-- Show a loading or error message if post is undefined -->
    <div v-else>
      <p class="text-red-500">Post not found or loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/usePostStore';

export default defineComponent({
  name: 'PostDetails',
  setup() {
    const route = useRoute();
    const postStore = usePostStore();

    // Get the post ID from the route params
    const postId = parseInt(route.params.id as string, 10);

    // Find the post in the store
    const post = computed(() => postStore.posts.find(p => p.id === postId));

    return {
      post,
    };
  },
});
</script>

