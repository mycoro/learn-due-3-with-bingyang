import { createRouter, createWebHistory} from 'vue-router'

//no need to import the components here, they will be lazy-loaded

import { isAuthenticated } from '@/apis/auth'

//create a router instance
const router = createRouter({
    // provide the history implementation to use 
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {

        const scrollBehaviorOptions = {
            top: 0,
            behavior: 'smooth',
        }

        if(to.meta.scrollToElement) {
            scrollBehaviorOptions.el = to.meta.scrollToElement
        }
        //if the route has saved position, return it, otherwise return scrollBehaviorOptions
        return savedPosition ?? scrollBehaviorOptions
    },
    //define some routes, each route record should map to a component
    routes: [
        {path: '/', name: 'mainLayout', component: () => import('@/views/MainLayout.vue'), children: [
            {path: '/home', name: 'home', component: () => import('@/views/Home.vue'), meta: {requiresAuth: false} },
            {path:'/blogPosts', name: 'blogPosts', component: () => import('@/views/BlogPosts.vue'), 
            meta: { enterAnimation: 'animate__animated animate__bounceIn', leaveAnimation: 'animate__animated animate__bounceOut'},
            redirect: {name: 'blogPostsGreeting'},
            children: [
            {path: '', name: 'blogPostsGreeting',component: () => import('@/views/BlogPostsGreeting.vue'), meta: {requiresAuth: false} },
            {path: '/blogPosts/:id(\\d+)', name:'blogPost', components: { default: () => import('@/views/BlogPost.vue'), sidebar: () => import('@/views/Ads.vue')}, meta: {requiresAuth: true, scrollToElement: '.blog-post-layout'}}
        ]},
        {path: '/about', name: 'about', component: () => import('@/views/About.vue'), meta: {requiresAuth: false}},
        ]},
        { path: '/login', name: 'login', component: () => import('@/views/Login.vue'), meta: {requiresAuth: false}},
        {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue'), meta: {requiresAuth: false}}, //match any path that hasn't been matched
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