import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import PostDetails from '../views/PostDetails.vue';
import AddPost from '../views/AddPost.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/post/:id', component: PostDetails },
  { path: '/add-post', component: AddPost },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
