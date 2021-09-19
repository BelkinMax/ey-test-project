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
      >
        <PhotoCard :photo="photo" @remove="removeCard(photo.id)" />
      </v-col>
    </v-row>
    <v-row>
      <v-col ref="loadingSpinner" cols="12" justify="center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      fetchMorePhotos: false,
    };
  },
  methods: {
    ...mapActions("photos", ["fetchPhotos"]),

    removeCard(id) {
      // TODO: Remove photo
    },
  },
  computed: {
    ...mapGetters("photos", [
      "photos",
      "photosIsLoading",
      "photosMeta",
      "photosParams",
    ]),
  },
};
</script>
