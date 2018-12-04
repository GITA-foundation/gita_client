<template>
  <div class="form-group bmd-form-group">
    <f-label :field="field" />
    <div class="industry-block">
      <select class="form-control"
        v-model="value.target"
        :name="field.inputName">
        <option v-for="option in options"
          :value="option.value"
          :key="option.value">
          {{option.label}}
        </option>
      </select>
      <input v-if="value.target==='other'"
        class="form-control"
        name="other"
        type="text"
        v-model="value.other" />
    </div>
  </div>
</template>

<script>
import FLabel from '~/components/form/FLabel';
export default {
  data () {
    return {
      options: [
        {label: "Platform", value: "platform"},
        {label: "Crypto Currency", value: "crypto_currency"},
        {label: "Business services", value: "business_services"},
        {label: "Investment", value: "investment"},
        {label: "Software", value: "software"},
        {label: "Smart Contract", value: "smart_contract"},
        {label: "Internet", value: "internet"},
        {label: "Entertainment", value: "entertainment"},
        {label: "Infrastructure", value: "infrastructure"},
        {label: "Banking", value: "banking"},
        {label: "Artificial Intelligence", value: "artificial_intelligence"},
        {label: "Communication", value: "communication"},
        {label: "Big Data", value: "big_data"},
        {label: "Media", value: "media"},
        {label: "Retail", value: "retail"},
        {label: "Health", value: "health"},
        {label: "Real estate", value: "real_estate"},
        {label: "Education", value: "education"},
        {label: "Tourism", value: "tourism"},
        {label: "Sports", value: "sports"},
        {label: "Manufacturing", value: "manufacturing"},
        {label: "Energy", value: "energy"},
        {label: "Casino & Gambling", value: "casino_gambling"},
        {label: "Virtual Reality", value: "virtual_reality"},
        {label: "Charity", value: "charity"},
        {label: "Electronics", value: "electronics"},
        {label: "Energy", value: "energy"},
        {label: "Legal", value: "legal"},
        {label: "Art", value: "art"},
        {label: "Other", value: "other"},
      ]
    }
  },
  props: ['models', 'field'],
  components: { FLabel },
  computed: {
    items() {
      return this.field.values;
    },
    value() {
      return this.models[this.field.model];
    }
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.industry-block {
  > * {
    display: inline;
  }
  select {
    width: 20%;
  }
  input {
    width: 60%;
  }
}

</style>
