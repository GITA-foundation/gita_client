<template>
  <fieldset>
    <p-label :field="field" />
    <div v-for="option in options" :key="option.value">
      <input type="checkbox"
        v-model="model[option.value].target"
        :id="option.value"
        :value="option.value" />
      <label :for="option.value">{{option.label}}</label>
      <div v-if="option.value === 'other'" class="answer-block other-text">{{model.other.token}}</div>
      <ul v-if="model[option.value].target">
        <div>
          <li>Utilitytoken</li>
          <label>Please specify the jurisdictions where it is not classified as a security</label>

          <div class='answer-block'>{{model[option.value].utility.security}}</div>
          <label>Which rights does the investor acquire?</label>
          <div class='answer-block'>{{model[option.value].utility.investor}}</div>
          <label>How they are documented? (if any)</label>
          <div class='answer-block'>{{model[option.value].utility.doc}}</div>
        </div>
        <div>
          <li>Payment token</li>
          <label>Please specify the jurisdictions where it is not classified as a security</label>
          <div class='answer-block'>{{model[option.value].payment.security}}</div>
          <label>Which rights does the investor acquire?</label>
          <div class='answer-block'>{{model[option.value].payment.investor}}</div>
          <label>How they are documented? (if any)</label>
          <div class='answer-block'>{{model[option.value].payment.doc}}</div>
        </div>
        <div>
          <li>Asset/Securitytoken</li>
          <label>Which rights does the investor acquire?</label>
          <div class='answer-block'>{{model[option.value].AS.investor}}</div>
          <label>How they are documented?</label>
          <div class='answer-block'>{{model[option.value].AS.doc}}</div>
        </div>
        <div>
          <li>Hybrid token</li>
          <label>Which rights does the investor acquire?</label>
          <div class='answer-block'>{{model[option.value].hybrid.investor}}</div>
          <label>How they are documented?</label>
          <div class='answer-block'>{{model[option.value].hybrid.doc}}</div>

          <label>Is the token classified as a security in your jurisdictions?</label>
          <div>
            <input type="radio"
              v-model="model[option.value].hybrid.jurisidctionOpts"
              id="token_type_yes"
              value="yes" />
            <label for="token_type_yes">Yes</label>
            <input type="radio"
              v-model="model[option.value].hybrid.jurisidctionOpts"
              id="token_type_no"
              value="no" />
            <label for="token_type_no">No</label><br/>
            <label>{{getJurisdictionsTxt(model[option.value].hybrid.jurisidctionOpts)}}</label>
            <div class='answer-block bootstrap-tagsinput info-badge'>
              <span class="tag badge"
                v-for="tag in model[option.value].hybrid.jurisidctions"
                :key="tag.id">
                {{tag.name}}
              </span>
            </div>
          </div>
        </div>
      </ul>
    </div>
    <div>
      <label>Will a swap occur, and if so, how?</label>
      <div class="answer-block">{{model.swap}}</div>
    </div>
  </fieldset>
</template>

<script>
import PLabel from '~/components/preview/PLabel';
export default {
  components: {
    PLabel,
  },
  data () {
    return {
      options: [
        {value:'ERC20', label: 'ERC-20'},
        {value:'ERC721', label: 'ERC-721'},
        {value:'NEP5', label: 'NEP5'},
        {value:'native', label: 'Native'},
        {value:'other', label: 'Other'},
      ],
    }
  },
  props: {
    model: {
      default: {
        ERC20: {},
        ERC721: {},
        NEP5: {},
        native: {},
        other: {},
      }
    },
    field: Object,
  },
  methods: {
    getJurisdictionsTxt (value) {
      return value === 'NO'
        ? 'Please specify the jurisdictions where it is not classified as a security'
        : 'Please list the relevant jurisdictions';
    }
  }
};
</script>

<style lang="scss" scoped>
fieldset {
  margin: 0 10px;
}
input.other-text {
  width: 40%;
  display: inline;
}
div.info-badge {
  display: block;
}
</style>

