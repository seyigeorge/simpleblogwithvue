<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <h1 class="text-2xl font-bold">Simple Blog</h1>

        <!-- Hamburger Menu for mobile -->
        <button class="block lg:hidden" @click="isMenuOpen = !isMenuOpen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <!-- Desktop Menu -->
        <nav class="hidden lg:flex space-x-4">
          <router-link to="/" class="hover:text-yellow-300">Home</router-link>
          <router-link to="/add-post" class="hover:text-yellow-300">Add Post</router-link>
          <a href="#" class="hover:text-yellow-300">Contact</a>
          <a href="#" class="hover:text-yellow-300">Entertainment</a>
          <a href="#" class="hover:text-yellow-300">Sport</a>
          <a href="#" class="hover:text-yellow-300">Politics</a>
        </nav>
      </div>

      <!-- Mobile Menu (shown when isMenuOpen is true) -->
      <nav
        v-if="isMenuOpen"
        class="lg:hidden bg-blue-500 flex flex-col space-y-2 p-4"
      >
        <router-link to="/" class="hover:text-yellow-300">Home</router-link>
        <router-link to="/add-post" class="hover:text-yellow-300">Add Post</router-link>
        <a href="#" class="hover:text-yellow-300">Contact</a>
        <a href="#" class="hover:text-yellow-300">Entertainment</a>
        <a href="#" class="hover:text-yellow-300">Sport</a>
        <a href="#" class="hover:text-yellow-300">Politics</a>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto py-8">
      <!-- This is where the routed component will be injected -->
      <router-view />
    </main>

    <footer class="bg-gray-800 text-white text-center p-4">
      <p>© 2024 Simple Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const isMenuOpen = ref(false);

    return { isMenuOpen };
  },
});
</script>


