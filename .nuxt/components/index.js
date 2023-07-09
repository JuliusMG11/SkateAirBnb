export { default as DeletePost } from '../../components/DeletePost.vue'
export { default as EditForm } from '../../components/EditForm.vue'
export { default as PostDetail } from '../../components/PostDetail.vue'
export { default as PostList } from '../../components/PostList.vue'
export { default as TheMap } from '../../components/TheMap.vue'
export { default as SearchLocation } from '../../components/searchLocation.vue'
export { default as UploadImage } from '../../components/uploadImage.vue'
export { default as HomepageTheAds } from '../../components/homepage/TheAds.vue'
export { default as NavigationLogo } from '../../components/navigation/Logo.vue'
export { default as NavigationTheNavigation } from '../../components/navigation/TheNavigation.vue'
export { default as PostForm } from '../../components/postForm/PostForm.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
