<template>
  <div class="form-group bmd-form-group">
    <f-label :field="field" />
    <textarea class="form-control"
      @keydown="onKeyDown"
      v-model="models[field.model]"
      :rows="field.rows || 3" />
    <span v-if="field.maxlength && field.maxlength > 0">
      Maximum {{field.maxlength}} characters
    </span>
  </div>
</template>

<script>
import FLabel from '~/components/form/FLabel';
export default {
  props: ['models', 'field'],
  components: { FLabel },
  methods:{
    onKeyDown(evt){
      if (!this.field.maxlength) return;
      const str = this.models[this.field.model];
      const matchResult = str.match(/\S+/g) || [];
      if (matchResult.length >= this.field.maxlength) {
        if (evt.keyCode >= 48 && evt.keyCode <= 90) {
          evt.preventDefault();
          return;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
