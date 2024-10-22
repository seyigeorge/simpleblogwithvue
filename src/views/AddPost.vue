<template>
  <div class="add-post-page">
    <h2 class="text-2xl font-bold text-center mb-6">Add New Post</h2>
    <form @submit.prevent="submitPost">
      <!-- Title Input -->
      <div class="mb-4">
        <label for="title" class="block text-lg font-medium">Title</label>
        <input
          type="text"
          v-model="title"
          id="title"
          class="w-full border p-2 rounded"
          :class="{'border-red-500': titleError}"
        />
        <span v-if="titleError" class="text-red-500">{{ titleError }}</span>
      </div>

      <!-- Author Input -->
      <div class="mb-4">
        <label for="author" class="block text-lg font-medium">Author</label>
        <input
          type="text"
          v-model="author"
          id="author"
          class="w-full border p-2 rounded"
          :class="{'border-red-500': authorError}"
        />
        <span v-if="authorError" class="text-red-500">{{ authorError }}</span>
      </div>

      <!-- Content Input -->
      <div class="mb-4">
        <label for="content" class="block text-lg font-medium">Content</label>
        <textarea
          v-model="content"
          id="content"
          class="w-full border p-2 rounded"
          :class="{'border-red-500': contentError}"
        ></textarea>
        <span v-if="contentError" class="text-red-500">{{ contentError }}</span>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-lg">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'; // Import router to navigate
import { usePostStore } from '../store/usePostStore';
import { useToast } from 'vue-toastification';

export default defineComponent({
  name: 'AddPost',
  setup() {
    const title = ref('');
    const author = ref('');
    const content = ref('');

    const titleError = ref('');
    const authorError = ref('');
    const contentError = ref('');

    const postStore = usePostStore();
    const router = useRouter(); // Router instance
    const toast = useToast();

    const submitPost = () => {
      titleError.value = '';
      authorError.value = '';
      contentError.value = '';

      // Simple validation
      if (!title.value) titleError.value = 'Title is required';
      if (!author.value) authorError.value = 'Author is required';
      if (!content.value) contentError.value = 'Content is required';

      // If there are validation errors, prevent submission
      if (titleError.value || authorError.value || contentError.value) return;

      // Create a new post object
      const newPost = {
        id: Date.now(),
        title: title.value,
        author: author.value,
        content: content.value,
        image: '/images/default.jpg',
        excerpt: content.value.substring(0, 100) + '...', // Generate excerpt
      };

      postStore.addPost(newPost); // Add post to the store

      // Save posts to local storage
      localStorage.setItem('posts', JSON.stringify(postStore.posts));


      // Show success notification
      toast.success('Successfully created blog post!');

      // Clear the form after submission
      title.value = '';
      author.value = '';
      content.value = '';

      // Navigate to home page after submission
      router.push('/');
    };

    return {
      title,
      author,
      content,
      submitPost,
      titleError,
      authorError,
      contentError,
    };
  },
});
</script>

<style scoped>
.add-post-page {
  max-width: 600px; /* Limit the width of the form */
  margin: 0 auto; /* Center the form */
  padding: 20px;
  background-color: #fff; /* Background color for the form */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
textarea:focus {
  border-color: #4a90e2; /* Change border color on focus */
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.5); /* Shadow on focus */
}

.border-red-500 {
  border-color: #f44336; /* Error border color */
}

label {
  font-weight: bold; /* Make labels bold */
  margin-bottom: 5px; /* Space between label and input */
}

button {
  background-color: #4a90e2; 
  color: white; /* Text color */
  padding: 10px 20px; /* Button padding */
  border-radius: 4px; /* Rounded corners */
  border: none; 
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s; /* Transition effects */
}

button:hover {
  background-color: #357ab8; 
  transform: scale(1.05); 
}

.text-red-500 {
  color: #f44336; 
  margin-top: 5px; 
  font-size: 0.875rem; 
}
</style>
