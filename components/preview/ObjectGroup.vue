<template>
  <b-col md="10">
    <p-label :field="field" />
    <div v-if="model" v-for="childField in getChildFields(field)" :key="childField.model">
      <div v-if="childField.label && childField.label !== 'Label'"><label>{{childField.label}}</label></div>
      <a v-if="childField.inputType === 'file' && model[childField.model] && model[childField.model].length > 0"
        :href="model[childField.model][0].fd"
        target="_blank">
        {{model[childField.model][0].filename}}
      </a>
      <div class="answer-block" v-else-if="model[childField.model] && model[childField.model].length > 0">
        {{model[childField.model]}}
        <span v-if="childField.styleClasses === 'percent-block'">(%)</span>
      </div>
      <div v-else-if="childField.inputType !== 'file' && !model[childField.model]" class="unfill answer-block">
        <span v-if="childField.styleClasses === 'percent-block'">(%)</span>
      </div>
    </div>
  </b-col>
</template>

<script>
import PLabel from '~/components/preview/PLabel';
export default {
  props: ['model', 'field'],
  components: { PLabel },
  methods: {
    getChildFields: (field) => field.schema ? field.schema.fields : [],
  }
}
</script>
<style lang="scss" scoped>
  input.price-block, input.percent-block {
    width: 12%;
    display: inline-block;
  }
</style>
