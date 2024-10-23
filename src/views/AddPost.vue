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

      <!-- Image Upload Input -->
      <div class="mb-4">
        <label for="image" class="block text-lg font-medium">Upload Image</label>
        <input
          type="file"
          @change="onFileChange"
          class="w-full border p-2 rounded"
        />
      </div>

      <!-- Image Preview -->
      <div v-if="image" class="mb-4">
        <label class="block text-lg font-medium">Image Preview</label>
        <img :src="image" alt="Image Preview" class="w-64 h-40 object-cover rounded-lg" />
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
import { useRouter } from 'vue-router';
import { usePostStore } from '../store/usePostStore';
import { useToast } from 'vue-toastification';

export default defineComponent({
  name: 'AddPost',
  setup() {
    const title = ref('');
    const author = ref('');
    const content = ref('');
    const image = ref<string | null>(null); // Store image as a URL or base64 string

    const titleError = ref('');
    const authorError = ref('');
    const contentError = ref('');

    const postStore = usePostStore();
    const router = useRouter();
    const toast = useToast();

    const onFileChange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          image.value = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const submitPost = () => {
      titleError.value = '';
      authorError.value = '';
      contentError.value = '';

      // Simple validation
      if (!title.value) titleError.value = 'Title is required';
      if (!author.value) authorError.value = 'Author is required';
      if (!content.value) contentError.value = 'Content is required';

      if (titleError.value || authorError.value || contentError.value) return;

      const newPost = {
        id: Date.now(),
        title: title.value,
        author: author.value,
        content: content.value,
        image: image.value || '/images/default.jpg', // Use default if no image
        excerpt: content.value.substring(0, 100) + '...',
      };

      postStore.addPost(newPost);

      // Create a minimal post object for local storage (without large base64 image data)
      const minimalPosts = postStore.posts.map(post => ({
        id: post.id,
        title: post.title,
        author: post.author,
        content: post.content,
        image: post.image,
        excerpt: post.excerpt,
      }));

      try {
        // Save minimal post data to local storage
        localStorage.setItem('posts', JSON.stringify(minimalPosts));
      } catch (e) {
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          toast.error('Local storage quota exceeded. Could not save post.');
        } else {
          toast.error('An error occurred while saving the post.');
        }
      }

      // Show success notification
      toast.success('Successfully created blog post!');

      // Clear the form after submission
      title.value = '';
      author.value = '';
      content.value = '';
      image.value = null;

      // Navigate to home page after submission
      router.push('/');
    };

    return {
      title,
      author,
      content,
      image,
      submitPost,
      onFileChange,
      titleError,
      authorError,
      contentError,
    };
  },
});
</script>

<style scoped>
.add-post-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
}

.border-red-500 {
  border-color: #f44336;
}

button {
  background-color: #4a90e2;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
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

img {
  border-radius: 8px;
  object-fit: cover;
}
</style>
