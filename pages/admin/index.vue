<template>

<div class="container">
       <h2>admin page</h2>
       <div class="w-full max-w-xs">
        
        <form 
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            @submit.prevent="onSubmit"
        >

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                   Title
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="title" 
                    type="text" 
                    placeholder="title"
                    v-model="post.title"
                >
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
                     Image cover
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="image" 
                    type="file" 
                    placeholder="image"
                    ref="fileInput"
                    @change="previewImage" 
                    accept="image/*"
                >
                
            <div v-if="imageData!=null">                     
                    <img class="preview" height="268" width="356" :src="img1">
                <br>
            </div>   
            </div>

             <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                     Name
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" 
                    type="text" 
                    placeholder="name"
                    v-model="post.name"
                >
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="email" 
                    type="email" 
                    placeholder="email"
                    v-model="post.email"
                >
            </div>

            <div class="mb-4">
        
               <input type="checkbox" id="accomodation" value="accomodation" v-model="post.category">
                <label for="accomodation">Accomodation</label>
                
                <input type="checkbox" id="skateshop" value="skateshop" v-model="post.category">
                <label for="skateshop">Skateshop</label>
                
                <input type="checkbox" id="spot-guide" value="spotGuide" v-model="post.category">
                <label for="spot-guide">Spot guide</label>

                <span>Checked names: {{ post.category }}</span>
            </div>


            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                   Content
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="content" 
                    type="textarea" 
                    rows="3"
                    placeholder="content"
                    v-model="post.content"
                >
            </div>

            <div class="flex items-center justify-between">
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                
                SAve
            </button>

            </div>
        </form>
    </div>
</div>
 


</template>

<script>
import axios from 'axios'
// import firebase from 'firebase';

export default {
    data() {
        return {
            post: {
                    title: '',
                    name: '',
                    email: '',
                //  adress: '',
                    imageData: null ,
                    category: [],
                    content: '',
                    image: '',
                }
            
        } 
    },

    methods: {
        
        // SUBMIT FORM
        
        onSubmit() {
            axios
            .post('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts.json', this.post)
            .then(result => console.log(result))
            .catch(e => console.log(e));

        },
    }

}
</script>

<style scoped>

</style>