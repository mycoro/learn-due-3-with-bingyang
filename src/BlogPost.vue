<template>
    <div class="blog-post">
        <p>
            {{ message }}
        </p>
        <!-- display the id, title, and content of a blog post-->
         <h2> {{ id }} - {{ blogPostTitle }}</h2>
         <h4>{{ blogPostContent }}</h4>
         <button @click="changeBlogPostTitle">Change blog post title</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
let message = ref('This is the BlogPost component.')

const props = defineProps(['id', 'blogPostTitle', 'blogPostContent'])
console.log(props.blogPostTitle)
// defineProps({
//     id: Number,
//     blogPostTitle: String,
//     blogPostContent: String
// })

function changeBlogPostTitle() {
    props.blogPostTitle = 'A different title'
}
</script>

<style scoped>
.blog-post {
    background-color: aqua;
    padding: 10px;
    margin-bottom: 10px;
}
</style>