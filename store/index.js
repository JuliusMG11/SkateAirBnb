import Vuex from "vuex";
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
           posts: []
        },

        getters: {

        },
        actions: {

            // get post data

            getPosts({
                commit
            }) {
                axios.get('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
                    .then(response => {
                        commit('SET_POSTS', response.data)
                        console.log(response.data);
                    })
            }
        },

        mutations: {

            SET_POSTS(state, posts) {
                state.posts = posts;
            }
            
        },
    })
}

export default createStore