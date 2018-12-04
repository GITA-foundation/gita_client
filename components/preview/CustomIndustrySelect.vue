<template>
  <b-col md="10">
    <p-label :field="field" />
    <div class="answer-block">
      {{model.target}}
      {{model.target === 'Other' ? `: ${model.other}` : '' }}
    </div>
  </b-col>
</template>

<script>
import PLabel from '~/components/preview/PLabel';
export default {
  props: {
    model: {
      default: {}
    },
    field: Object,
  },
  components: { PLabel },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
