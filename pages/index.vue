<template>
  <v-container fluid>
    <!-- Photos -->
    <transition-group ref="itemsWrapper" class="row pa-3 items-row" name="list">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="col-6 col-sm-4 col-md-3 col-lg-2 square-cell"
      >
        <PhotoCard :photo="photo" @remove="removeCard" />
      </div>
    </transition-group>

    <!-- Loader -->
    <v-row ref="loader" justify="center" class="pa-3 mb-6">
      <v-col ref="loadingSpinner" cols="12" class="text-center">
        <v-progress-linear indeterminate color="primary"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { isInViewport } from "@/helpers/Utils";

export default {
  data() {
    return {
      isFetchMorePhotos: false, // true -> will trigger items fetch
      TRIGGER_OFFSET: 200, // px from loader top
      FULL_CHUNK_PARAMS: { _limit: 12 }, // get 12 items
      ONE_PHOTO_PARAMS: { _limit: 1 } // get 1 item
    };
  },

  mounted() {
    // 1. Set listeners on scroll and resize events.
    window.addEventListener("scroll", this.checkLoaderInViewport);
    window.addEventListener("resize", this.checkLoaderInViewport);

    // 2. Check if ref "loader" is in the viewport.
    this.checkLoaderInViewport();
  },

  watch: {
    isFetchMorePhotos: {
      handler: function(val) {
        if (
          val &&
          !this.photosIsLoading &&
          this.photosMeta["photos_left"] > 0
        ) {
          // 5. Watch "isFetchMorePhotos" to be "true"
          //    and fetch 12 more photos.
          this.fetchMorePhotos(this.FULL_CHUNK_PARAMS);
        }
      }
    }
  },

  computed: {
    ...mapGetters("photos", [
      "photos",
      "photosIsLoading",
      "photosParams",
      "photosMeta"
    ])
  },

  methods: {
    ...mapActions("photos", ["fetchPhotos", "removePhoto"]),
    ...mapMutations("photos", ["SET_PARAMS", "REMOVE_PHOTO"]),

    async fetchMorePhotos(params) {
      this.SET_PARAMS(params);
      await this.fetchPhotos(this.photosParams);
      // Check if loader keeps in viewport.
      this.checkLoaderInViewport();
    },

    checkLoaderInViewport() {
      // 3. Reset "isFetchMorePhotos" to false so the watcher could be triggered.
      this.isFetchMorePhotos = false;

      // 4. Check if ref "loader" is in the viewport
      //    and set "isFetchMorePhotos" to false if
      //    NOT in the viewport / true if IN the viewport.

      this.$nextTick(() => {
        this.isFetchMorePhotos = isInViewport({
          element: this.$refs.loader,
          offsetTop: this.TRIGGER_OFFSET
        });
      });
    },

    async removeCard(id) {
      // Remove 1 photo and fetch 1 back.
      this.REMOVE_PHOTO({ id });
      await this.fetchMorePhotos(this.ONE_PHOTO_PARAMS);
    }
  }
};
</script>

<style lang="scss" scoped>
.items-row {
  width: 100%;

  .square-cell {
    aspect-ratio: 1;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
