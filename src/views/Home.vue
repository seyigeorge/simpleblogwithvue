<template>
  <div class="home-page">
    <div class="container mx-auto">
      <!-- Search Input -->
      <div class="flex justify-center mb-6">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search posts by title or author..."
          class="border p-2 rounded-lg w-1/2"
        />
      </div>

      <!-- Slider Section -->
      <section class="my-8">
        <h2 class="text-2xl font-bold text-center mb-6">Featured Posts</h2>
        <swiper
          class="my-swiper"
          :slides-per-view="1"
          :space-between="10"
          :loop="true"
          pagination
          :navigation="false"
        >
          <swiper-slide v-for="(post, index) in featuredPosts" :key="index">
            <div class="p-4 bg-white shadow-md rounded-lg">
              <img :src="post.image" alt="Post image" class="w-full h-48 object-cover rounded-t-lg">
              <h3 class="text-xl font-semibold mt-4">{{ post.title }}</h3>
              <p class="text-gray-700 mt-2">{{ post.excerpt }}</p>
              <router-link
                :to="`/post/${post.id}`"
                class="text-blue-500 hover:underline mt-4 block"
              >
                Read More
              </router-link>
            </div>
          </swiper-slide>
        </swiper>
      </section>

      <!-- Blog Post List -->
      <section class="my-8">
        <h2 class="text-2xl font-bold text-center mb-6">Latest Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(post, index) in filteredPosts" :key="index" class="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <img
              :src="post.image"
              alt="Post image"
              class="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 class="text-xl font-semibold">{{ post.title }}</h3>
            <p class="text-gray-700">{{ post.author }}</p>
            <p class="mt-2">{{ post.excerpt }}</p>
            <router-link
              :to="`/post/${post.id}`"
              class="text-blue-500 hover:underline mt-4 block"
            >
              Read More
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { usePostStore } from '../store/usePostStore';

export default defineComponent({
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const postStore = usePostStore();
    const searchQuery = ref(''); // Search query

    onMounted(async () => {
      await postStore.fetchPosts();
    });

    // Filter posts by title or author
    const filteredPosts = computed(() => {
      return postStore.posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Featured posts from the store (for the slider)
    const featuredPosts = computed(() =>
      postStore.posts.slice(0, 3) 
    );

    return {
      searchQuery,
      filteredPosts,
      featuredPosts,
    };
  },
});
</script>

<style scoped>
.my-swiper {
  width: 100%;
  height: 350px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5));
  border-radius: 8px;
  overflow: hidden;
}

.swiper-slide .p-4 {
  transition: transform 0.3s, box-shadow 0.3s;
}

.swiper-slide:hover .p-4 {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

input[type="text"] {
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
}

.swiper-pagination-bullet {
  background: rgba(0, 0, 0, 0.5);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 4px;
}

.swiper-pagination-bullet-active {
  background: rgba(0, 0, 0, 0.9);
}

.grid div:hover {
  transform: translateY(-3px);
  transition: transform 0.2s ease;
}
</style>
