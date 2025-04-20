import { createRouter, createWebHistory} from 'vue-router'

//import components
import Home from '@/views/Home.vue'
import BlogPosts from '@/views/BlogPosts.vue'
import About from '@/views/About.vue'
import BlogPost from '@/views/BlogPost.vue'
import BlogPostsGreeting from '@/views/BlogPostsGreeting.vue'
import NotFound from '@/views/NotFound.vue'

//create a router instance
const router = createRouter({
    // provide the history implementation to use 
    history: createWebHistory(),
    //define some routes, each route record should map to a component
    routes: [{path: '/', name: 'home', component: Home },
        {path:'/blogPosts', name: 'blogPosts', component: BlogPosts, 
            redirect: {name: 'blogPostsGreeting'},
            children: [
            {path: '', name: 'blogPostsGreeting',component: BlogPostsGreeting },
            {path: '/blogPosts/:id(\\d+)', name:'blogPost', component: BlogPost}
        ]},
        {path: '/about', name: 'about', component: About},
        {path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound}, //match any path that hasn't been matched
    ],
})

//export the router instance
export default router