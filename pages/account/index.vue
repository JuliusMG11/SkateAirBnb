<template>
    <div>

        <h1>Sign in</h1>

          
        <form 
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            @click="pressed"
        >

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                   Email
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text" 
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
            <button>submit</button>
        </form>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        pressed() {
            alert('form submitted')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>