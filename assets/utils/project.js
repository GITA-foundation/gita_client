// origin use vue-form-generator
// so you can refs format to document: https://icebob.gitbooks.io/vueformgenerator/content/fields/core-fields.html
const getHelp = ({ required = false, isGitaStandard = false }) => {
  const prefixRquired = required === true || required === 'true' ? '*' : '';
  return isGitaStandard
    ? `${prefixRquired} (Required for GITA Disclosure Standard)`
    : prefixRquired;
}

const formatInputElm = (schema) => {
  const basicData = {
    inputType: schema.type,
    label: schema.label === 'Label' ? null : schema.label,
    model: schema.name,
    help: getHelp(schema),
    // remove required validator to use Gita Standard
    // required: schema.required === true || schema.required === 'true',
  }
  switch(schema.type) {
    case 'text':
      return {
        ...basicData,
        type: 'input',
        inputType: schema.subtype,
        descHtmlElm: schema.descHtmlElm,
        // remove validator to use Gita Standard
        // validator: validators.string,
      }
    case 'number':
      return {
        ...basicData,
        type: 'input',
        inputType: 'number',
        step: 0.01,
        min: 0,
        styleClasses: schema.className
      }
    case 'file':
      return {
        ...basicData,
        type: 'customUpload',
        fileType: '',
        descHtmlElm: schema.descHtmlElm,
        accept: schema.fileLimit === 'image' ? '.jpg,.png' : '.pdf,.docx'
      }
    case 'textarea':
      const tempObj = {
        ...basicData,
        type: 'textArea',
        rows: schema.rows,
      }

      if (!schema.maxlength) return tempObj;

      return {
        ...tempObj,
        maxlength: schema.maxlength
      }

    case 'select':
      return {
        ...basicData,
        type: 'select',
        values: schema.values,
        selectOptions: {
          value: 'value',
          name: 'label'
        }
      }
    case 'radio-group':
      return {
        ...basicData,
        type: 'radios',
        values: schema.values,
        radiosOptions: {
          value: 'value',
          name: 'label'
        }
      }
  }
}

const defaultRadioField =({ label, name, values, isGitaStandard, required }) => ({
  type: 'radioGroup',
  label,
  model: name,
  help: getHelp({ isGitaStandard, required }),
  values,
  childs: []
})

const defaultCountryField =({ label, name, values, isGitaStandard, required }) => ({
  type: 'countrySelect',
  label,
  model: name,
  help: getHelp({ isGitaStandard, required }),
  values,
})

const defaultIndustryField =({ label, name, isGitaStandard, required }) => ({
  type: 'industrySelect',
  label,
  model: name,
  help: getHelp({ isGitaStandard, required }),
});

const defaultTokenTypeField = ({ label, name, isGitaStandard, required, countries }) => ({
  type: 'tokenType',
  label,
  model: name,
  help: getHelp({ isGitaStandard, required }),
  countries
});

const defaultObjectField = ({ label, name, isGitaStandard, required }) => ({
  type: 'object',
  label,
  model: name,
  help: getHelp({ isGitaStandard, required }),
  schema: {
    fields: []
  }
});

const defaultArrayField = ({ label, name, isGitaStandard, required }) => ({
  type: 'array',
  label,
  model: name,
  help: getHelp({ isGitaStandard, required }),
  itemContainerComponent: 'FieldArrayContainer',
  showRemoveButton: false,
  newElementButtonLabelClasses: "btn btn-primary btn-outline-dark",
  items: {
    type: 'object',
    name,
    schema: {
      fields: []
    }
  }

});

const getTokenTypeDetail = () => ({
  utility: { security: '', investor: '', doc: ''},
  payment: { security: '', investor: '', doc: ''},
  AS: { investor: '', doc: ''},
  hybrid: { investor: '', doc: '', jurisidctionOpts: 'yes', jurisidctions: []},
});

export const getModelInitColumns = (groups) => {
  let columns = {};
  groups.forEach((group) => {
    group.fields.forEach((field) => {
      switch (field.type) {
        case 'array':
          const defaultColumn = field.items.schema.fields
            .reduce((result, f) => ({
              ...result,
              [f.model]: f.type === 'customUpload' ? [] : ''
            }), {})
          columns[field.model] = [defaultColumn];
          break;
        case 'tokenType':
          columns[field.model] = {
            ERC20: { target: false, ...getTokenTypeDetail() },
            ERC721: { target: false, ...getTokenTypeDetail() },
            NEP5: { target: false, ...getTokenTypeDetail() },
            native: { target: false, ...getTokenTypeDetail() },
            other: { target: false, token: '', ...getTokenTypeDetail() },
            swap: '',
          };
          break;
        case 'customUpload':
          columns[field.model] = [];
          break;
        case 'object':
          const defaultObjectCol = field.schema.fields
            .reduce((result, f) => ({
              ...result,
              [f.model]: f.type === 'customUpload' ? [] : ''
            }), {})
          columns[field.model] = defaultObjectCol;
          break;
        case 'radioGroup':
        case 'industrySelect':
          columns[field.model] = {};
          return;
        default:
          columns[field.model] = '';
      }
    });
  });
  return columns;
}

export const groupSchemaForArray = (schemas) => {
  let groups = [];
  schemas.map((schema) => {
    if (schema.label) {
      schema.label = schema.label.replace(/<p>/g, '');
      schema.label = schema.label.replace(/<\/p>/g, '');
    }

    if ((schema.type === 'header' && schema.hType === 'step') || groups.length === 0) {
      groups.push({
        legend: schema.label,
        fields: []
      });
      return;
    }

    const key = groups.length - 1;
    const fieldsKey = groups[key].fields.length - 1;

    if (schema.hType === 'complexTokenType') {
      groups[key].fields.push(defaultTokenTypeField(schema));
      return;
    } else if (schema.hType === 'object') {
      if (schema.type === 'header' && schema.subtype === 'h2') {
        groups[key].fields.push(defaultObjectField(schema));
        return;
      }
      groups[key].fields[fieldsKey].schema.fields.push(formatInputElm(schema));
      return;
    } else if (schema.hType === 'array') {
      if (schema.type === 'header' && schema.subtype === 'h2') {
        groups[key].fields.push(defaultArrayField(schema));
        return;
      }
      groups[key].fields[fieldsKey].items.schema.fields.push(formatInputElm(schema));
      return;
    } else if (schema.hType === 'radio') {
      if (schema.type === 'header' && schema.subtype === 'h2') {
        groups[key].fields.push({});
        return;
      } else if (schema.type === 'radio-group') {
        groups[key].fields[fieldsKey] = defaultRadioField(schema);
        return;
      }
      groups[key].fields[fieldsKey].childs.push(schema);
      return;
    } else if (schema.dataFrom === 'country') {
      groups[key].fields.push(defaultCountryField(schema));
      return;
    } else if (schema.dataFrom === 'industry') {
      groups[key].fields.push(defaultIndustryField(schema));
      return;
    }

    if (['text', 'textarea', 'file', 'select', 'number', 'radio-group'].includes(schema.type)) {
      groups[key].fields.push(formatInputElm(schema));
    }
  });
  return groups;
}
