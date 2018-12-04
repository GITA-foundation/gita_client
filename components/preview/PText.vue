<template>
  <b-col md="10">
    <p-label :field="field" />
    <div v-html="field.descHtmlElm"/>
    <div class="answer-block">
      <a v-if="model && field.inputType === 'url'" :href="model" :alt="field.label" target="_blank">{{model}}</a>
      <span v-else :class="field.styleClasses">
        <span v-if="field.styleClasses === 'price-block'">USD</span>
        {{model}}
        <span v-if="field.styleClasses === 'percent-block'">%</span>
      </span>
    </div>
  </b-col>
</template>

<script>
import PLabel from '~/components/preview/PLabel';
export default {
  props: ['model', 'field'],
  components: { PLabel },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  input.price-block, input.percent-block {
    width: 12%;
    display: inline-block;
  }
</style>
