<template>
  <v-container fluid>
    <v-row ref="itemsWrapper" justify="center" class="pa-3">
      <v-col
        v-for="photo in photos"
        :key="photo.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        class="square-cell"
      >
        <PhotoCard :photo="photo" @remove="removeCard(photo.id)" />
      </v-col>
    </v-row>

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
      isFetchMorePhotos: false,
      fullChunkParams: { _limit: 12 },
      onePhotoParams: { _limit: 1 }
    };
  },

  mounted() {
    // 1. Set listeners on scroll and resize events
    window.addEventListener("scroll", this.checkLoaderInViewport);
    window.addEventListener("resize", this.checkLoaderInViewport);

    // 2. Check if ref "loader" is in the viewport
    this.checkLoaderInViewport();
  },

  watch: {
    isFetchMorePhotos: {
      handler: function(val) {
        if (val && !this.photosIsLoading) {
          // 5. Watch "isFetchMorePhotos" to be "true"
          //    and fetch 12 more photos
          this.fetchMorePhotos(this.fullChunkParams);
        }
      }
    }
  },

  computed: {
    ...mapGetters("photos", ["photos", "photosIsLoading", "photosParams"])
  },

  methods: {
    ...mapActions("photos", ["fetchPhotos"]),
    ...mapMutations("photos", ["SET_PARAMS"]),

    async fetchMorePhotos(params) {
      this.SET_PARAMS(params);
      await this.fetchPhotos(this.photosParams);
      this.checkLoaderInViewport();
    },

    checkLoaderInViewport() {
      // 3. Reset "isFetchMorePhotos" to false so the watcher could be triggered
      this.isFetchMorePhotos = false;

      // 4. Check if ref "loader" is in the viewport
      //    and set "isFetchMorePhotos" to false if
      //    NOT in the viewport / true if IN the viewport
      //
      //    Used nextTick to trigger the watcher in case
      //    if "isFetchMorePhotos" was "true" and keeps
      //    "true" after check

      this.$nextTick(() => {
        this.isFetchMorePhotos = isInViewport({
          element: this.$refs.loader,
          offsetTop: 200
        });
      });
    },

    removeCard(id) {
      // TODO: Remove photo
    }
  }
};
</script>

<style lang="scss" scoped>
.square-cell {
  aspect-ratio: 1;
}
</style>
