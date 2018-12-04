<template>
  <b-container>
    <div class="section">
      <b-row>
        <b-col md="8" class="ml-auto mr-auto text-center1">
          <h2 class="title">{{this.schema.legend}}</h2>
        </b-col>
      </b-row>
      <b-row class='text-left' v-for="field in this.schema.fields" :key='field.model'>
        <preview-element
          :field="field"
          :model="models[field.model]"
          :models="models"
          :verifiedPersonEmails="verifiedPersonEmails" />
      </b-row>
    </div>
  </b-container>
</template>

<script>
import PreviewElement from '~/components/preview/PreviewElement';

import { isEmpty } from '~/assets/utils/utils';
export default {
  props: ['models', 'schema', 'verifiedPersonEmails'],
  components: {
    PreviewElement,
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.text-left {
  text-align: left;
}
.section {
  pointer-events: none;
}
</style>
