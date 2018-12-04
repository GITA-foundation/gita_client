<template>
  <component :is="dynamicComponent" :field="field" :models="models" />
</template>

<script>
import CustomCountrySelect from '~/components/form/CustomCountrySelect';
import CustomIndustrySelect from '~/components/form/CustomIndustrySelect';
import CustomTokenType from '~/components/form/CustomTokenType';
import File from '~/components/form/File';
import FInput from '~/components/form/FInput';
import RadioGroup from '~/components/form/RadioGroup';
import FTextarea from '~/components/form/FTextarea';

import { isEmpty } from '~/assets/utils/utils';
export default {
  props: ['models', 'field'],
  components: {
    CustomCountrySelect,
    CustomIndustrySelect,
    CustomTokenType,
    File,
    FInput,
    RadioGroup,
    FTextarea,
  },
  computed: {
    dynamicComponent: function () {
      switch(this.field.type) {
        case 'input':
          return 'f-input';
        case 'textArea':
          return 'f-textarea';
        case 'radioGroup':
          return 'radio-group';
        case 'countrySelect':
          return 'custom-country-select';
        case 'industrySelect':
          return 'custom-industry-select';
        case 'tokenType':
          return 'custom-token-type';
        case 'customUpload':
          return 'file';
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
