<template>
  <v-card width="100%" height="100%" hover>
    <v-img
      eager
      :src="photo.url"
      :lazy-src="photo.thumbnailUrl"
      aspect-ratio="1"
    >
      <template #placeholder>
        <v-skeleton-loader
          width="100%"
          height="100%"
          type="image"
        ></v-skeleton-loader>
      </template>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    photo: {
      required: true,
      type: Object
    }
  }
};
</script>
