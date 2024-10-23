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

      <!-- Delete button -->
      <div class="flex justify-between mt-4">
        <button
          @click="deletePost(post.id)"
          class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          Delete Post
        </button>
        
        <!-- Back to home link -->
        <router-link
          to="/"
          class="text-blue-500 hover:underline"
        >
          Back to Home
        </router-link>
      </div>
    </div>

    <!-- Show a loading or error message if post is undefined -->
    <div v-else>
      <p class="text-red-500">Post not found or loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '../store/usePostStore';
import { useToast } from 'vue-toastification';

export default defineComponent({
  name: 'PostDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const postStore = usePostStore();
    const toast = useToast();

    // Get the post ID from the route params
    const postId = parseInt(route.params.id as string, 10);

    // Find the post in the store
    const post = computed(() => postStore.posts.find(p => p.id === postId));

    // Method to delete a post
    const deletePost = (id: number | undefined) => {
      if (id) {
        postStore.deletePost(id);
        toast.success('Post deleted successfully!');
        router.push('/'); // Redirect back to home after deletion
      }
    };

    return {
      post,
      deletePost,
    };
  },
});
</script>

<style scoped>
.max-w-2xl {
  max-width: 768px;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.bg-white {
  background-color: #fff;
}
.p-8 {
  padding: 2rem;
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
  border-radius: 0.5rem;
}
.w-full {
  width: 100%;
}
.h-64 {
  height: 16rem;
}
.object-cover {
  object-fit: cover;
}
.text-2xl {
  font-size: 1.5rem;
}
.font-bold {
  font-weight: 700;
}
.mb-4 {
  margin-bottom: 1rem;
}
.text-gray-700 {
  color: #4a5568;
}
.text-blue-500 {
  color: #4299e1;
}
.hover\:underline:hover {
  text-decoration: underline;
}
.bg-red-500 {
  background-color: #f56565;
}
.hover\:bg-red-600:hover {
  background-color: #e53e3e;
}
</style>
