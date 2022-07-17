<template>
  <div class="map-section">
    <div class="map-holder">
       <div id="map-test"></div>
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
            @click="$emit('selectLocation', item), changeLocation(item)"
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
import { ref, watch, onMounted, computed } from '@nuxtjs/composition-api'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'

export default {
  head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
        },
      ],
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
        })
    }

    const clearLocation = () => {
      if ( newLocations.value) {
        console.log('super')
      }
    }

    let map = {}

    const changeLat = ref('')
    const changeLng = ref('')

    const selectCenterLocation = () => {
        if (newLat < 0) {
          console.log('**************' + props.lng, props.lat + '**************')
          return props.lng, props.lat
        }
        if (props.lat < 0) {
          console.log('**************' + [18.1112229, 49.041469] + '**************')
          return 18.1112229, 49.041469
        }
    }

    selectCenterLocation()
    // CREATE MAP MAPBOX

    const createMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWFub21nIiwiYSI6ImNrbjRhbHVlMDBmaWQydnM5ZDJrdDlhcDIifQ.cqndNn4Xp_GxuCDFByoHEA'
        map = new mapboxgl.Map({
          container: 'map-test', // <div id="map"></div>
          style: 'mapbox://styles/julianomg/ckye93rf101wk14qpuf03drqp', // default style
          center: [18.1112229, 49.041469], // starting position as [lng, lat]
          zoom: 4
      })
    }

     const changeLocation = (item) => {
      changeLat.value = item.x
      changeLng.value = item.y

      
      // ZOOM TO CLICK LOCATION
      map.flyTo({
            center: [changeLat.value,  changeLng.value],
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion,
            zoom: 12
      });
      // ADD NEW MARKER
      return new mapboxgl.Marker()
      .setLngLat([changeLat.value,changeLng.value])
      .addTo(map)
    }


    onMounted(() => {
       createMap()
       selectCenterLocation
    })

    return {
      location,
      searchLocation,
      newLocations,
      url,
      newLat,
      newLng,
      clearLocation,
      changeLocation,
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

#map-test {
  position: relative;
  width: 100%;
  height: 200px;
}
</style>
