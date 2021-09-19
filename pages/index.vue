<template>
  <v-container fluid>
    <v-row ref="itemsWrapper" justify="center" class="pa-3">
      <v-col
        v-for="(photo, idx) in photos"
        :key="idx"
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
import { mapActions, mapGetters } from "vuex";
import { isInViewport } from "@/helpers/Utils";
import { concat } from "lodash";

export default {
  data() {
    return {
      fetchMorePhotos: false,
      photos: []
    };
  },
  mounted() {
    this.checkLoaderInViewport();
    window.addEventListener("scroll", this.checkLoaderInViewport);
    window.addEventListener("resize", this.checkLoaderInViewport);
  },
  watch: {
    fetchMorePhotos: {
      handler: function(val) {
        if (val) {
          this.fetchPhotos();
        }
      }
    }
  },
  methods: {
    // ...mapActions("photos", ["fetchPhotos"]),

    fetchPhotos() {
      const chunk = [
        {
          albumId: 1,
          id: 1,
          title: "accusamus beatae ad facilis cum similique qui sunt",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952"
        },
        {
          albumId: 1,
          id: 2,
          title: "reprehenderit est deserunt velit ipsam",
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796"
        },
        {
          albumId: 1,
          id: 3,
          title: "officia porro iure quia iusto qui ipsa ut modi",
          url: "https://via.placeholder.com/600/24f355",
          thumbnailUrl: "https://via.placeholder.com/150/24f355"
        },
        {
          albumId: 1,
          id: 4,
          title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
          url: "https://via.placeholder.com/600/d32776",
          thumbnailUrl: "https://via.placeholder.com/150/d32776"
        },
        {
          albumId: 1,
          id: 5,
          title: "natus nisi omnis corporis facere molestiae rerum in",
          url: "https://via.placeholder.com/600/f66b97",
          thumbnailUrl: "https://via.placeholder.com/150/f66b97"
        },
        {
          albumId: 1,
          id: 6,
          title: "accusamus ea aliquid et amet sequi nemo",
          url: "https://via.placeholder.com/600/56a8c2",
          thumbnailUrl: "https://via.placeholder.com/150/56a8c2"
        },
        {
          albumId: 1,
          id: 7,
          title:
            "officia delectus consequatur vero aut veniam explicabo molestias",
          url: "https://via.placeholder.com/600/b0f7cc",
          thumbnailUrl: "https://via.placeholder.com/150/b0f7cc"
        },
        {
          albumId: 1,
          id: 8,
          title: "aut porro officiis laborum odit ea laudantium corporis",
          url: "https://via.placeholder.com/600/54176f",
          thumbnailUrl: "https://via.placeholder.com/150/54176f"
        },
        {
          albumId: 1,
          id: 9,
          title: "qui eius qui autem sed",
          url: "https://via.placeholder.com/600/51aa97",
          thumbnailUrl: "https://via.placeholder.com/150/51aa97"
        },
        {
          albumId: 1,
          id: 10,
          title: "beatae et provident et ut vel",
          url: "https://via.placeholder.com/600/810b14",
          thumbnailUrl: "https://via.placeholder.com/150/810b14"
        },
        {
          albumId: 1,
          id: 11,
          title: "nihil at amet non hic quia qui",
          url: "https://via.placeholder.com/600/1ee8a4",
          thumbnailUrl: "https://via.placeholder.com/150/1ee8a4"
        },
        {
          albumId: 1,
          id: 12,
          title:
            "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
          url: "https://via.placeholder.com/600/66b7d2",
          thumbnailUrl: "https://via.placeholder.com/150/66b7d2"
        }
      ];
      this.photos = concat(this.photos, chunk);

      this.checkLoaderInViewport();
    },

    checkLoaderInViewport() {
      this.fetchMorePhotos = false;

      this.$nextTick(() => {
        this.fetchMorePhotos = isInViewport({
          element: this.$refs.loader,
          offsetTop: 200
        });
      });
    },

    removeCard(id) {
      // TODO: Remove photo
    }
  }
  // computed: {
  //   ...mapGetters("photos", [
  //     "photos",
  //     "photosIsLoading",
  //     "photosMeta",
  //     "photosParams"
  //   ])
  // }
};
</script>

<style lang="scss" scoped>
.square-cell {
  aspect-ratio: 1;
}
</style>
