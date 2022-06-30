<template>
  <div class="map-content">
    <div class="filter-nav">
      <!-- {{ filterLocations.filming }} -->
      <button @click="accomodationLocations">
        Accomodation
      </button>
      <button @click="filmingLocations">
        Filming
      </button>
    </div>
    <div id="map">
      <l-map style="height: 100%; z-index: 5;" :options="options">
        <l-tile-layer
          :options="titleLayers.options"
          :url="url"
          :name="titleLayers.name"
          :visible="titleLayers.visible"
        />
        <l-marker
          v-for="accomodation in filterLocations.accomodation"
          :key="accomodation.id"
          :lat-lng="[accomodation.long, accomodation.lat]"
          :visible="accomodationActive"
        >
          <l-popup>
            {{ accomodation.category }}
          </l-popup>
        </l-marker>
        <l-marker
          v-for="filming in filterLocations.filming"
          :key="filming.id"
          :lat-lng="[filming.long, filming.lat]"
          :visible="filmingActive"
        >
          <l-popup>
            {{ filming.category }}
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

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
      filmingActive: true,
      markerLatLng: [50.0598058, 14.3255399],
      url: 'https://api.mapbox.com/styles/v1/julianomg/ckye93rf101wk14qpuf03drqp/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA',
      options: {
        zoomControll: false,
        center: [50.0598058, 14.3255399],
        zoom: 12
      },
      titleLayers: [
        {
          name: 'Mapa',
          visible: true,
          options: {
            id: 'ckye93rf101wk14qpuf03drqp',
            user: 'julianomg',
            accessToken: 'pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA'
          }
        }
      ]
    }
  },
  computed: {
    filterLocations () {
      return this.$store.getters.filterLocations
    }
  },
  methods: {
    accomodationLocations () {
      this.accomodationActive = !this.accomodationActive
    },
    filmingLocations () {
      this.filmingActive = !this.filmingActive
    }
  }
}
</script>

<style lang="scss">
    #map {
        position: fixed;
        top: 0px;
        width:48%;
        height: 100vh;
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
    position: fixed;
    right: 30px;
    top: 30px;
    z-index: 10;

    button {
        background: white;
        color: black;
        padding: 5px 10px;
        border-radius: 12px;
    }
}

</style>
