<template>
  <v-card width="100%" height="100%" hover @click="onClickCard">
    <v-img
      eager
      :src="photo.url"
      :lazy-src="photo.thumbnailUrl"
      aspect-ratio="1"
    >
      <v-card-subtitle v-text="photo.id" class="white--text"></v-card-subtitle>

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
  emits: ["remove"],

  props: {
    photo: {
      required: true,
      type: Object
    }
  },

  methods: {
    onClickCard() {
      this.$emit("remove", this.photo.id);
    }
  }
};
</script>
