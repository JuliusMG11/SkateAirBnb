import Vuex from "vuex";
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
           posts: []
        },

        getters: {
            filterLocations(state) {
                if(state.posts) {
                    const values = Object.values(state.posts)
                    const result = values.filter(post => {
                        return post.category
                    })
                    console.log(result + 'MORE')

                    return result
                }
            }
        },
        actions: {

            // get post data
            getPosts({
                commit
            }) {
                axios.get('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
                    .then(response => {
                        commit('setPosts', response.data)
                        // console.log(response.data);
                    })
            }
        },

        mutations: {

            setPosts(state, posts) {
                state.posts = posts;
            } 
        }
    })
}

export default createStore