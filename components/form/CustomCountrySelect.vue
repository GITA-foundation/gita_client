<template>
  <div class="form-group bmd-form-group">
    <f-label :field="field" />
    <select class="form-control"
      v-model="models[field.model]">
      <option v-for="item in items" :value="item.id" :key="item.id">{{item.name}}</option>
    </select>
  </div>
</template>

<script>
import FLabel from '~/components/form/FLabel';
export default {
  props: ['models', 'field'],
  components: { FLabel },
  computed: {
    items() {
      return this.field.values;
    },
  },
  methods: {
  }
};
</script>
