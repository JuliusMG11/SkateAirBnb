<template>

    <div id="map">
        {{ filterLocations }}
        <l-map style="height: 500px" :options="options">
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
         <l-popup>{{ post.title }}
             {{ post.category}}
         </l-popup>
         </l-marker>
  </l-map>
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
   computed: {
   posts() {
        return this.$store.state.posts
    },

    filterLocations () {
        return this.$store.getters.filterLocations
    }
 },
 mounted() {
    this.$store.dispatch('getPosts')
  }
}
</script>

<style lang="scss">
    #map {   
        width:100%;   
        height:300px;
        overflow: hidden;
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