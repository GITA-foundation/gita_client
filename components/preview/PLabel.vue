<template>
  <h5 class="title">{{field.label}}
    <span class='help-text'>{{field.help}}</span>
  </h5>
</template>

<script>
export default {
  props: ['field']
}
</script>

<style lang="scss" scoped>
  .title {
    margin: 15px 0;
  }
  .help-text {
    color: #e91e63;
    font-size: 10px;
  }
</style>
