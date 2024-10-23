import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  image: string;  
  excerpt: string;
};

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [] as Post[],  // Post type for store state
  }),
  actions: {
    async fetchPosts() {
      try {
        const response = await fetch('/data.json'); // Fetch data from JSON file
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    addPost(newPost: Post) {
      this.posts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(this.posts)); // Save after adding a post
    },
    deletePost(postId: number) {
      this.posts = this.posts.filter(post => post.id !== postId);
      localStorage.setItem('posts', JSON.stringify(this.posts)); // Update local storage
    },
  },
});
