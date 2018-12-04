<template>
  <div class="card">
    <div :id="'heading' + field.model + index">
      <div class='vgf-header float-left' data-toggle="collapse" :data-target="'#collapse' + field.model + index" aria-expanded="false" :aria-controls="'collapse' + field.model + index">
        {{ headerText }}
      </div>
      <input type="button" class="btn btn-warning btn-sm float-right" @click="$emit('removeItem')" value="x" />
    </div>
    <div :id="'collapse' + field.model + index" class="collapse" :aria-labelledby="'heading' + field.model + index">
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script>
import FLabel from '~/components/form/FLabel';
import FormChildElement from '~/components/form/FormChildElement';
export default {
  props: ['model', 'field', 'index'],
  components: {
    FLabel,
    FormChildElement,
  },
  computed: {
    headerText() {
      const { model, label} = this.field.items.schema.fields[0];
      return `${label}: ${this.model && this.model[model] || 'NOT_SET'}`;
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .vgf-header {
    cursor: pointer;
    display: inline-block;
    line-height: 40px;
    padding-left: 15px;
    width: 90%;
  }
  .card-body {
    padding: 20px 20px 0px 20px;
    border-top: 1px solid #ddd;
  }
</style>
