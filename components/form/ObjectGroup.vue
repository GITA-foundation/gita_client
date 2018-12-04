<template>
  <div class="form-group bmd-form-group">
    <f-label :field="field" />
    <div class="object-group-box">
      <form-child-element
        v-for="child in field.schema.fields"
        :key="`${field.model}${child.model}`"
        :field="child"
        :models="models[field.model]" />
    </div>
  </div>
</template>

<script>
import FLabel from '~/components/form/FLabel';
import FormChildElement from '~/components/form/FormChildElement';
export default {
  props: ['models', 'field'],
  components: {
    FLabel,
    FormChildElement,
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss">
  .object-group-box {
    padding-left: 20px;
    padding-top: 20px;
  }
</style>
