<template>
  <div class="form-group bmd-form-group">
    <f-label :field="field" />
    <div class='token-type-box'>
      <div v-for="option in options" :key="option.value">
        <input type="checkbox"
          v-model="value[option.value].target"
          :id="option.value"
          :value="option.value" />
        <label :for="option.value">{{option.label}}</label>
        <input v-if="option.value === 'other'"
          class="form-control other-text"
          name="other"
          type="text"
          v-model="value.other.token" />
        <ul v-if="value[option.value].target">
          <div>
            <li>Utilitytoken</li>
            <label>Please specify the jurisdictions where it is not classified as a security</label>
            <input class='form-control' type='text' v-model='value[option.value].utility.security' />
            <label>Which rights does the investor acquire?</label>
            <input class='form-control' type='text' v-model='value[option.value].utility.investor' />
            <label>How they are documented? (if any)</label>
            <input class='form-control' type='text' v-model='value[option.value].utility.doc' />
          </div>
          <div>
            <li>Payment token</li>
            <label>Please specify the jurisdictions where it is not classified as a security</label>
            <input class='form-control' type='text' v-model='value[option.value].payment.security' />
            <label>Which rights does the investor acquire?</label>
            <input class='form-control' type='text' v-model='value[option.value].payment.investor' />
            <label>How they are documented? (if any)</label>
            <input class='form-control' type='text' v-model='value[option.value].payment.doc' />
          </div>
          <div>
            <li>Asset/Securitytoken</li>
            <label>Which rights does the investor acquire?</label>
            <input class='form-control' type='text' v-model='value[option.value].AS.investor' />
            <label>How they are documented?</label>
            <input class='form-control' type='text' v-model='value[option.value].AS.doc' />
          </div>
          <div>
            <li>Hybrid token</li>
            <label>Which rights does the investor acquire?</label>
            <input class='form-control' type='text' v-model='value[option.value].hybrid.investor' />
            <label>How they are documented?</label>
            <input class='form-control' type='text' v-model='value[option.value].hybrid.doc' />

            <label>Is the token classified as a security in your jurisdictions?</label>
            <div>
              <input type="radio"
                v-model="value[option.value].hybrid.jurisidctionOpts"
                id="token_type_yes"
                value="yes" />
              <label for="token_type_yes">Yes</label>

              <input type="radio"
                v-model="value[option.value].hybrid.jurisidctionOpts"
                id="token_type_no"
                value="no" />
              <label for="token_type_no">No</label><br/>
              <label>{{getJurisdictionsTxt(value[option.value].hybrid.jurisidctionOpts)}}</label>
              <select class="form-control"
                :tokenType="option.value"
                :name="field.jurisidctions"
                @change="onSelectJurisidction">
                <option value=''>-- Select --</option>
                <option v-for="country in field.countries"
                  :value="country.id"
                  :key="country.id">
                  {{country.name}}
                </option>
              </select>
              <div class='bootstrap-tagsinput info-badge'>
                <span class="tag badge"
                  v-for="(tag, index) in value[option.value].hybrid.jurisidctions"
                  :key="tag.id">
                  {{tag.name}}
                  <span data-role="remove"
                    :tokenType="option.value"
                    :index="index"
                    @click="onDelete"/>
                </span>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div>
        <label>Will a swap occur, and if so, how?</label>
        <input class='form-control' type='textarea' name='swap' v-model='value.swap' />
      </div>
    </div>
  </div>
</template>

<script>
import FLabel from '~/components/form/FLabel';
export default {
  data () {
    return {
      options: [
        {value:'ERC20', label: 'ERC-20'},
        {value:'ERC721', label: 'ERC-721'},
        {value:'NEP5', label: 'NEP5'},
        {value:'native', label: 'Native'},
        {value:'other', label: 'Other: '},
      ],
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
    getJurisdictionsTxt (value) {
      return value === 'no'
        ? 'Please specify the jurisdictions where it is not classified as a security'
        : 'Please list the relevant jurisdictions';
    },
    onDelete ({ target }) {
      const index = target.getAttribute('index');
      const tokenType = target.getAttribute('tokenType');
      this.value[tokenType].hybrid.jurisidctions.splice(index, 1);
    },
    onSelectJurisidction ({ target }) {
      const { value, innerHTML } = target.selectedOptions[0];
      if (value === '') return;
      const tokenType = target.getAttribute('tokenType');
      this.value[tokenType].hybrid.jurisidctions.push({ id: value, name: innerHTML });
    }
  }
};
</script>
<style lang="scss" scoped>
input.other-text {
  width: 40%;
  display: inline;
}
.token-type-box {
  padding-top: 10px;
}
</style>
