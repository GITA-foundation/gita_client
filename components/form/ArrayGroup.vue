<template>
  <div class="form-group">
    <f-label :field="field" />
    <textarea v-if="field.model === 'advisor_role'"
      class="form-control desc"
      v-model="models.advisor_role_desc"
      rows="3" />
    <div v-for="(item, index) in models[field.model]" :key="`${index}${item.title}`">
      <span v-if="field.items">
        <component
          :is='`array-group-container`'
          :field="field"
          :model="item"
          :index="index"
          @removeItem='removeElement(index)'>
          <form-child-element
            v-for="child in field.items.schema.fields"
            :key="`${field.model}${child.model}`"
            :field="child"
            :models="item" />
        </component>
      </span>
    </div>
    <input type="button" value="+ New"
      class="btn btn-primary btn-outline-dark"
      @click="newElement"/>
  </div>
</template>

<script>
import ArrayGroupContainer from '~/components/form/ArrayGroupContainer';
import FLabel from '~/components/form/FLabel';
import FormChildElement from '~/components/form/FormChildElement';
export default {
  components: { FLabel, ArrayGroupContainer, FormChildElement },
  props: ['models', 'field'],
  computed: {
  },
  methods: {
    getItemsDefaultValue () {
      return this.field.items.schema.fields
        .reduce((r, f) => ({
          ...r,
          [f.model]: f.type === 'customUpload' ? [] : ''
        }), {});
    },
    newElement() {
      let value = this.models[this.field.model];
      if (!value || !value.push) value = [];
      value.push(this.getItemsDefaultValue());
      this.models[this.field.model] = [...value];
    },
    removeElement(index) {
      this.models[this.field.model].splice(index, 1);
    },
  }
};
</script>
