<template>
  <div class="form-group bmd-form-group">
    <f-label :field="field" />
    <div v-html="field.descHtmlElm"/>
    <input :class="`${field.styleClasses} form-control`"
      v-model="models[field.model]"
      :type="field.inputType"
      :step="field.step"
      min="0" />
    <span v-if="field.styleClasses === 'percent-block'">%</span>
    <span v-if="field.styleClasses === 'price-block'">USD</span>
  </div>
</template>

<script>
import FLabel from '~/components/form/FLabel';
export default {
  props: ['models', 'field'],
  components: { FLabel },
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
