<template>
  <label class="bmd-label-static" v-if="field.label">
    {{field.label}}
    <span class="help-text">{{field.help}}</span>
  </label>
</template>

<script>
export default {
  props: ['field']
}
</script>

<style lang="scss" scoped>
  .help-text {
    color: #e91e63;
    font-size: 9px;
    padding-left: 5px;
  }
</style>
