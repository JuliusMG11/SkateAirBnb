<template>
  <v-card class="post-box">
    <nuxt-link :to="postLink">
      <div class="post-image">
        <uploadImage :image="post.image" />
        <div class="social flex items-center">
          <a href="#" class="icon">
            <img src="../assets/img/icons/instagram.svg" alt="person">
          </a>
        </div>
        <div class="header-title">
          {{ post.title }}
        </div>
      </div>
      <div class="box-container flex p-2">
        <div class="left-section">
          <div class="content flex items-start">
            <div class="icon">
              <img src="../assets/img/icons/person.svg" alt="person">
            </div>
            <span>{{ post.name }}</span>
          </div>
          <div class="content flex items-start">
            <div class="icon">
              <img src="../assets/img/icons/email.svg" alt="location">
            </div>
            <a href="#">{{ post.email }}</a>
          </div>
          <div class="content flex items-start">
            <div class="icon">
              <img src="../assets/img/icons/location.svg" alt="location">
            </div>
            <span>{{ post.addressLabel }}</span>
          </div>
        </div>
        <div class="right-section flex items-end justify-end">
          <div class="tatext-overline">
            <div
              v-for="item in post.category"
              :key="item.id"
              class="tags"
            >
              <div v-if="item == ['skater']">
                <img src="../assets/img/icons/skater.svg" alt="">
              </div>
              <div v-if="item == ['place']">
                <img src="../assets/img/icons/place.svg" alt="">
              </div>
              <!-- <span>{{ item }}</span> -->
            </div>
          </div>
        </div>

        <!-- <v-list-item-avatar
          tile
          size="80"
          color="grey"
        /> -->
      </div>
    </nuxt-link>
    <!-- <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Button
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const postLink = computed(() => {
      return '/posts/' + props.post.id
    })

    return {
      postLink
    }
  }
}
</script>

<style lang="scss" scoped>
.post-image {
  position: relative;
}
.post-box {
  border-radius: 12px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    background: linear-gradient(180deg, rgba(66,103,158,0) 0%, rgba(66,103,158,1) 100%);
    z-index: 1;
    top: 0px;
    left: 0px;
    height: 120px;
    width: 100%;
  }
}

.header-title {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 2;
  color: white;
  font-size: 22px;
  font-weight: 800;
}

.post-box {

  span,
  a {
    font-weight: 600;
  }

  .left-section {
    width: 80%;
  }

  .content {
    align-items: center;

    .icon {
      position: relative;
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      margin-right: 4px;

      img {
        position: relative;
        display: block;
        width: 22px;
      }
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 16px;
      width: 180px;
    }
  }
}

.tags {
  position: relative;
  display: block;
  border: solid 1px #42679E;
  color: white;
  padding: 6px;
  border-radius: 50%;

  img {
    width: 22px;
    height: 22px;
  }
}

.social {
  position: absolute;
  z-index: 10;
  right: 8px;
  top: 8px;

  .icon {
    background:white;
    border-radius: 50%;
    padding: 6px;
    img {
      height: 22px;
      width: 22px;
    }
  }
}

</style>
<style lang="scss">
.post-image {
  img {
    object-fit: cover;
    height: 120px;
    width: 100%;
  }
}
</style>
