<template>
<div class="maps">
    <div id="map">
        <l-map style="height: 300px" :options="options">
        <l-tile-layer 
        :options="titleLayers.options"
        :url="url"
        :name="titleLayers.name"
        :visible="titleLayers.visible"
      
        >
        </l-tile-layer>
         <l-marker 
        v-for="post in posts"
        :key="post.id"
         :lat-lng="[post.lat, post.long]"
         >
         <l-popup>{{ post.title }}</l-popup>
         </l-marker>
  </l-map>
    </div>
        <button @click="loadingShopData">tedt</button>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    },
    data () {
     return {
        markerLatLng:  [50.0598058, 14.3255399],
        url: 'https://api.mapbox.com/styles/v1/julianomg/ckye93rf101wk14qpuf03drqp/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA',
        options: {
          zoomControll: false,
          center: [50.0598058, 14.3255399],
          zoom: 12,
        },
        titleLayers: [
            {
                name: 'Mapa',
                visible: true,
                options: {
                    id:  'ckye93rf101wk14qpuf03drqp',
                    user: 'julianomg',
                    accessToken: 'pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA'
                }
            }
        ]
    };
  },
  methods: {
       checkPost(post) {
            console.log(post.category)
            if (post.category === 'skateshop') {
                
            }
        },
        
        async loadingShopData() {
            try {
                const response = await fetch('https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app/posts.json')

                if (!response.ok) {
                    console.log(response.status)
                }

                const result = await response.json()
                console.log(result)

                return result

            } catch(err) {
                console.log(err)
            }
        }   
  },

  moutned() {
        loadingShopData()
  },
  computed: {
        posts() {
            return this.$store.state.loadedPosts
        },
    }
}
</script>

<style lang="scss">
    #map {   
        width:100%;   
        height:50vh;
    .marker {
        background-image: url('@/assets/mapbox-icon.png');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
}


</style>