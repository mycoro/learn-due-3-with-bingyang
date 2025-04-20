import { createRouter, createWebHistory} from 'vue-router'

//import components
import Home from '@/views/Home.vue'
import BlogPosts from '@/views/BlogPosts.vue'
import About from '@/views/About.vue'
import BlogPost from '@/views/BlogPost.vue'
import BlogPostsGreeting from '@/views/BlogPostsGreeting.vue'
import NotFound from '@/views/NotFound.vue'
import Ads from '@/views/Ads.vue'
import Login from '@/views/Login.vue'
import MainLayout from '@/views/MainLayout.vue'
import { isAuthenticated } from '@/apis/auth'

//create a router instance
const router = createRouter({
    // provide the history implementation to use 
    history: createWebHistory(),
    //define some routes, each route record should map to a component
    routes: [
        {path: '/', name: 'mainLayout', component: MainLayout, children: [
            {path: '/home', name: 'home', component: Home, meta: {requiresAuth: false} },
            {path:'/blogPosts', name: 'blogPosts', component: BlogPosts, 
            meta: { enterAnimation: 'animate__animated animate__bounceIn', leaveAnimation: 'animate__animated animate__bounceOut'},
            redirect: {name: 'blogPostsGreeting'},
            children: [
            {path: '', name: 'blogPostsGreeting',component: BlogPostsGreeting, meta: {requiresAuth: false} },
            {path: '/blogPosts/:id(\\d+)', name:'blogPost', components: { default: BlogPost, sidebar: Ads}, meta: {requiresAuth: true}}
        ]},
        {path: '/about', name: 'about', component: About, meta: {requiresAuth: false}},
        ]},
        { path: '/login', name: 'login', component: Login, meta: {requiresAuth: false}},
        {path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: {requiresAuth: false}}, //match any path that hasn't been matched
    ],
})


router.beforeEach((to, from) => {
    console.log(from.name, '->', to.name)
    if(to.meta.requiresAuth && !isAuthenticated.value) {
        //redirect to the login page with the orginally requested route
        return {name: 'login', query: { redirect: to.fullPath  }}
    }
})

//global after each navigation guard, good for cleanup or login
router.afterEach((to, from) => {
    console.log(`Successfully navigated to: ${to.fullPath}`)
})

//export the router instance
export default router