<template>
  <b-col md="10">
    <p-label :field="field" />
    <div v-if="model && model.length > 0">
      <img v-if="isImage(model[0].fd)" :src="model[0].fd" :alt="field.label" width="50" height="50" />
      <a v-else :href="model[0].fd" target="_blank">{{model[0].filenmae}}</a>
    </div>
    <div v-else class="answer-block" />
  </b-col>
</template>

<script>
import PLabel from '~/components/preview/PLabel';
export default {
  props: ['model', 'field'],
  components: { PLabel },
  methods: {
    isImage: (src) => /\.(gif|jpg|jpeg|tiff|png)$/i.test(src),
  }
}
</script>
<style lang="scss" scoped>
  input.price-block, input.percent-block {
    width: 12%;
    display: inline-block;
  }
</style>
