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
    posts: [] as Post[]
  }),
  actions: {
    async fetchPosts() {
      const response = await fetch('/data.json');
      const data = await response.json();
      this.posts = data;
    },
    addPost(newPost: Post) {
      this.posts.push(newPost);
    }
  }
});
