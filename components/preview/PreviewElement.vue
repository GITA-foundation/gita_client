<template>
  <component
    :is="dynamicComponent"
    :field="field"
    :model="model"
    :models="models"
    :verifiedPersonEmails="verifiedPersonEmails" />
</template>

<script>
import ArrayGroup from '~/components/preview/ArrayGroup';
import CustomCountrySelect from '~/components/preview/CustomCountrySelect';
import CustomIndustrySelect from '~/components/preview/CustomIndustrySelect';
import CustomTokenType from '~/components/preview/CustomTokenType';
import PFile from '~/components/preview/PFile';
import PText from '~/components/preview/PText';
import RadioGroup from '~/components/preview/RadioGroup';
import ObjectGroup from '~/components/preview/ObjectGroup';

import { isEmpty } from '~/assets/utils/utils';
export default {
  props: ['model', 'field', 'verifiedPersonEmails', 'models'],
  components: {
    ArrayGroup,
    CustomCountrySelect,
    CustomIndustrySelect,
    CustomTokenType,
    PFile,
    ObjectGroup,
    RadioGroup,
    PText,
  },
  computed: {
    dynamicComponent: function () {
      switch(this.field.type) {
        case 'input':
        case 'textArea':
          return 'p-text';
        case 'customUpload':
          return 'p-file';
        case 'object':
          return 'object-group';
        case 'countrySelect':
          return 'custom-country-select';
        case 'industrySelect':
          return 'custom-industry-select';
        case 'tokenType':
          return 'custom-token-type';
        case 'radioGroup':
          return 'radio-group';
        case 'array':
          return 'array-group';
        default:
          console.log(this.field.type, '==');
          break;
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.answer-block {
  border-bottom: 0.5px solid #ccc;
  min-height: 36px;
  padding: 0 5px;
}
</style>
