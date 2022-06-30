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
        <h3>Current Location</h3>
        <div class="form-group">
          <input
            id="location"
            v-model="location"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="location"
            @submit.prevent="searchLocation()"
          >
        </div>
        <label for="locations">Choose address:</label>
        <ul class="selectLocations">
          <li
            v-for="item in newLocations"
            :key="item.id"
            :value="item"
            @click="$emit('selectLocation', item)"
          >
            {{ item.label }}
            {{ item.lat }}
            {{ item.lon }}
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

export default {
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
        })
    }

    return {
      location,
      searchLocation,
      newLocations,
      options,
      titleLayers,
      url,
      newLat,
      newLng
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
  },
  mounted () {
    // this.createMap()
    // const geocoder = new MapboxGeocoder({
    //   accessToken: this.access_token,
    //   mapboxgl: mapboxgl
    // })

    // document.getElementById('geocoder').appendChild(geocoder)

  },
  methods: {
    // getLocation () {
    //   const geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    //   })

    //   console.log(location)
    //   try {
    //     this.loading = true
    //     const response = await axios.get(
    //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
    //     )
    //     this.loading = false
    //     this.location = response.data.features[0].place_name
    //     console.log(location)
    //   } catch (err) {
    //     this.loading = false
    //     console.log(err)
    //   }
    // }
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
  max-width: 200px;
  max-height: 200px;
  overflow: scroll;
}
</style>
