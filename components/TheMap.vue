<template>

    <div id="map">
        <div class="filter-nav">
            <button @click="accomodationLocations">Accomodation</button>
            <button @click="skateshopLocations">Skateshop</button>
        </div>
        <l-map style="height: 500px" :options="options">
        <l-tile-layer 
        :options="titleLayers.options"
        :url="url"
        :name="titleLayers.name"
        :visible="titleLayers.visible"
      
        >
        </l-tile-layer>
        <l-marker
            v-for="accomodation in filterLocations.accomodation"
            :key="accomodation.id"
            :lat-lng="[accomodation.lat, accomodation.long]"
            :visible="accomodationActive"
        >
            <l-popup>
                {{ accomodation.category }}
            </l-popup>
        </l-marker>
        <l-marker
            v-for="skateshop in filterLocations.skateshop"
            :key="skateshop.id"
            :lat-lng="[skateshop.lat, skateshop.long]"
            :visible="skateshopActive"
        >
            <l-popup>
                {{ skateshop.category }}
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
        accomodationActive: true,
        skateshopActive: true,
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
      accomodationLocations() {
          this.accomodationActive = !this.accomodationActive
      },
     skateshopLocations() {
          this.skateshopActive = !this.skateshopActive
      }
  },
   computed: {
    filterLocations () {
        return this.$store.getters.filterLocations
    }
 }
}
</script>

<style lang="scss">
    #map {   
        position: relative;
        width:100%;   
        height:100vh;
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

.filter-nav {
    position: absolute;
    right: 30px;
    top: 30px;
}


</style>