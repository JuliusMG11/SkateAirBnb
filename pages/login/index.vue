<template>
    <div>

        <h1>Login</h1>

                <form 
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"   
             >

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                   Email
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="email" 
                    placeholder="Email"
                    v-model="email"
                >
            </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                   Password
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="password" 
                    placeholder="Password"
                    v-model="password"
                >
            </div>
            <button @click.prevent="pressed" type="submit">submit</button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
    data() {
        return {
            email: '',
            password: '',
            errors: '',
        }
    },
    methods: {
        pressed() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(user => {
                            console.log( user );
                            this.$router.push('/');
                        })
                        .catch(error => {
                            this.errors = error;
                        })
                } 
    }
}
</script>

<style lang="scss" scoped>

</style>