<template>
  <b-col md="10">
    <p-label :field="field" />
    <div class="answer-block">
      {{getSelectObject(field)[model]}}
    </div>
  </b-col>
</template>

<script>
import PLabel from '~/components/preview/PLabel';
export default {
  props: ['model', 'field'],
  components: { PLabel },
  methods: {
    getSelectObject: (field) => {
      return field.values.reduce((result, f)=> {
        result[f.id] = f.name;
        return result;
      }, {});
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
