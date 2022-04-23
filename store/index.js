import Vuex from "vuex";
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
           posts: []
        },

        getters: {

            // filter category in the map
            filterLocations(state) {
                if(state.posts) {
                    const values = Object.values(state.posts)
                    const accomodation = values.filter(post => {
                        if(post.category == 'accomodation') {
                            return post.category
                        }
                    })
                    const skateshop = values.filter(post => {
                        if(post.category == 'skateshop') {
                            return post.category
                        }
                    })
                

                    return { accomodation, skateshop }
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
                        const data = response.data
                        const postsArray = []
                        for (const key in data) {
                            postsArray.push({ ...data[key], id: key})
                        }
                        commit('setPosts', postsArray)
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