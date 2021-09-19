<template>
  <v-skeleton-loader
    width="100%"
    height="100%"
    type="image"
  ></v-skeleton-loader>
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
