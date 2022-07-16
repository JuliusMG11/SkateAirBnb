<template>
  <div class="map-section">
    <div class="map-holder">
      <l-map style="height: 100%; z-index: 5;" :options="options">
        <l-tile-layer
          :options="titleLayers.options"
          :url="url"
          :name="titleLayers.name"
          :visible="titleLayers.visible"
        />
        <l-marker
          :lat-lng="[lng, lat]"
          :visible="true"
        />
      </l-map>
    </div>
    <div class="dislpay-arena">
      <div class="coordinates-header">
        
        <div class="form-group">
          <input
            id="location"
            v-model="location"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Find your location..."
            @submit.prevent="searchLocation()"
            required
          >
        </div>
        <ul v-if="location" class="selectLocations">
          <li
            v-for="item in newLocations"
            :key="item.id"
            :value="item"
            @click="$emit('selectLocation', item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { ref, watch } from '@nuxtjs/composition-api'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { onMounted } from '@nuxtjs/composition-api'

export default {
  head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
        },
      ],
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const newLat = Number(props.lat)
    const newLng = Number(props.lng)
    const url = 'https://api.mapbox.com/styles/v1/julianomg/ckye93rf101wk14qpuf03drqp/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA'
    const options = {
      zoomControll: false,
      center: [props.lng, props.lat],
      zoom: 12
    }

    const titleLayers = {
      name: 'Mapa',
      visible: true,
      options: {
        id: 'ckye93rf101wk14qpuf03drqp',
        user: 'julianomg',
        accessToken: 'pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA'
      }
    }
    const provider = new OpenStreetMapProvider()


    const location = ref('')
    const newLocations = ref('')

    watch(location, (currentValue, oldValue) => {
      searchLocation()
    })

    const searchLocation = async () => {
      await provider.search({ query: location.value })
        .then(function (result) {
          newLocations.value = result
            const test = newLocations.value
           console.log(test)
        })
    }

    const clearLocation = () => {
      if ( newLocations.value) {
        console.log('super')
      }
    }

    // const map = new mapboxgl.Map({
    //       accessToken: 'pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA',
    //       container: 'map-holder', // <div id="map"></div>
    //       style: 'mapbox://styles/mapbox/streets-v9', // default style
    //       center: [-21.9270884, 64.1436456], // starting position as [lng, lat]
    //       zoom: 13
    //   })

    //      map.flyTo({
    //         center: [props.lat, props.lng],
    //         essential: true // this animation is considered essential with respect to prefers-reduced-motion
    //       });


    // onMounted(() => {
    //    const mapboxgl = require('mapbox-gl')
    // })

    return {
      location,
      searchLocation,
      newLocations,
      options,
      titleLayers,
      url,
      newLat,
      newLng,
      clearLocation 
    }
  },
  data () {
    return {
      geosearchOptions: { // Important part Here
        provider: new OpenStreetMapProvider()
      },
      loading: false,
      // location: '',
      access_token: 'pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA',
      center: [0, 0],
      map: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.map-holder {
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  height: 120px;
  width: 100%;
  margin-bottom: 16px;
}

.selectLocations {
  position: relative;
  max-height: 200px;
  overflow: scroll;
  margin: 16px 0px;
}
</style>
