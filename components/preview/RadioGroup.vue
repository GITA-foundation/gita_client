<template>
  <div>
    <fieldset>
      <p-label :field="field" />
      <div v-for="option in options" :key="option.value">
        <input type="radio"
          v-model="model.target"
          :id="`${field.model}${option.value}`"
          :value="option.value" />
        <label :for="`${field.model}${option.value}`">{{option.label}}</label>
        <div v-for="child in getCurrentChilds(option.value, field.childs)"
          :key="child.name"
          :class="`label-floating detail ${child.className}`">
          <label v-if="child.label !== 'Label'"> - {{child.label}}</label>
          <div v-if="['textarea', 'text', 'select'].includes(child.type)" class="answer-block">
            {{getValue(child, model)}}
          </div>
          <div v-if="child.type === 'file' && model[child.name] && model[child.name].length > 0"
            v-for="file in model[child.name]" :key="file.fd">
            {{file.filename}} {{file}}
            <a :href="file.fd" target="_blank">
              <i class="material-icons">pageview</i>
            </a>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
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
  components: {
    PLabel,
  },
  computed: {
    options() {
      return this.field.values;
    },
  },
  methods: {
    getCurrentChilds: (key, childs = []) => {
      return childs.reduce((r, c) => {
        return (c.name.includes(`${key}_`)) ? [...r, c] : r;
      }, [])
    },
    getValue(field, model) {
      if (field.type !== 'select') return model[field.name];
      const obj = field.values.reduce((r, field) => ({ ...r, [field.value]: field.label }), {});
      return obj[model[field.name]];
    }
  }
};
</script>

<style lang="scss" scoped>
fieldset {
  margin: 0 10px;
}

.detail {
  padding-left: 10px;
  &.inline {
    display: inline-block;
    width: 60%;
  }
}
</style>
