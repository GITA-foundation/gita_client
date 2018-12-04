<template>
  <div class="form-group bmd-form-group">
    <f-label :field="field" />
    <div>
      <div v-for="option in options" :key="option.value">
        <input type="radio"
          v-model="value.target"
          @change="onChange"
          :id="`${field.model}${option.value}`"
          :value="option.value" />
        <label :for="`${field.model}${option.value}`">{{option.label}}</label>
        <div v-for="child in getCurrentChilds(option.value, field.childs)"
          :key="child.name"
          :class="`label-floating detail ${child.className}`">
          <label v-if="child.label !== 'Label'"> - {{child.label}}</label>
          <textarea v-if="child.type==='textarea'"
            v-model="value[child.name]"
            :name="child.name"
            :rows="child.rows"
            class="form-control" />
          <input v-if="child.type==='text'"
            v-model="value[child.name]"
            type="text"
            :name="child.name"
            class="form-control" />
          <select v-if="child.type==='select'"
            class="form-control"
            v-model="value[child.name]"
            :name="child.name">
            <option v-for="v in child.values" :value="v.value" :key="v.value">{{v.label}}</option>
          </select>
          <multiple-file-upload v-if="child.type==='file'"
            type='file'
            :name="child.name"
            :model="value"
            :schema="child" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultipleFileUpload from '~/components/project/MultipleFileUpload';
import FLabel from '~/components/form/FLabel';
export default {
  props: ['models', 'field'],
  components: {
    MultipleFileUpload,
    FLabel,
  },
  computed: {
    options() {
      return this.field.values;
    },
    value() {
      return this.models[this.field.model];
    }
  },
  methods: {
    getCurrentChilds: (key, childs = []) => {
      return childs.reduce((r, c) => {
        return (c.name.includes(`${key}_`)) ? [...r, c] : r;
      }, [])
    },
    onChange: function ({ target }) {
      const targetKey = target.value;
      Object.keys(this.value).forEach((key) => {
        if (key === 'target' || key.includes(`${targetKey}_`)) return;
        this.value[key] = '';
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.detail {
  padding-left: 10px;
  &.inline {
    display: inline-block;
    width: 60%;
  }
}
</style>
