<template>
  <b-col md="10">
    <p-label :field="field" />
    <div class="answer-block" v-if="field.model === 'advisor_role' && models['advisor_role_desc']">
      {{models['advisor_role_desc']}}
    </div>
    <b-row v-if="model && model.length > 0">
      <b-col md="4" v-for="(data, dIndex) in model" :key="dIndex">
        <div class="card card-pricing">
          <div class="card-body ">
            <h6 v-if="hasMentionedPerson(verifiedPersonEmails, field.model, data)"
              :class="`card-category text-${checkIsVerified(verifiedPersonEmails, field.model, data) ? 'success' : 'warning' }`">
              {{ checkIsVerified(verifiedPersonEmails, field.model, data) ? 'Verified' : 'unverified'}}
            </h6>
            <h1 class="card-title">{{data.name || data.title || '---'}}</h1>
            <ul>
              <li v-if="childField.inputType !== 'email' && index !== 0"
                v-for="(childField, index) in field.items.schema.fields" :key="index">
                <b>{{childField.label}}</b>
                <a v-if="childField.inputType === 'url'"
                  :href="data[childField.model]"
                  target="_blank">
                  {{data[childField.model]}}
                </a>
                <span v-else>{{data[childField.model] || '[UNFILLED]'}}</span>
              </li>
            </ul>
          </div>
        </div>
      </b-col>
    </b-row>
    <div v-else-if="!(field.model === 'advisor_role' && models['advisor_role_desc'])" class=" answer-block unfill" />
  </b-col>
</template>

<script>
import PLabel from '~/components/preview/PLabel';
export default {
  data () {
    return {
      mentionedPersonModels: ["biography_team", "biography_advisor", "biography_developer", "advisor_role", "marketing_partnership"]
    }
  },
  props: ['model', 'field', 'verifiedPersonEmails', 'models'],
  components: { PLabel },
  methods: {
    checkIsVerified: (verifiedPersonEmails, modelName, data) => {
      return verifiedPersonEmails[modelName].includes(data.email)
    },
    hasMentionedPerson: (verifiedPersonEmails, modelName, data) => {
      return verifiedPersonEmails && (data.email || data.name)
    }
  }
}
</script>
<style lang="scss" scoped>
  input.price-block, input.percent-block {
    width: 12%;
    display: inline-block;
  }
</style>
