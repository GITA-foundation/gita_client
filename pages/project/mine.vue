<template>
  <div class="profile-page">
    <!-- Sub-header section -->
    <div class="page-header header-filter" data-parallax="true"></div>
    <!-- End of sub-header section -->
    <!-- Main content -->
    <div class="main main-raised">
      <b-container class="project-container">
        <b-form @submit="onSubmit">
          <div>
            <div class="legend">Project Status</div>
            <b-form-select v-model="project.status">
              <option value='draft'>Draft</option>
              <option value='publish'>Publish</option>
            </b-form-select>
          </div>
          <div id="accordion" role="tablist" aria-multiselectable="true" class="card-collapse">
            <div class="card card-plain" v-for="(schema, index) in schemas.groups" :key="index">
              <div class="card-header" role="tab" :id="`heading${index}`">
                  <a class="legend" data-toggle="collapse" data-parent="#accordion" :href="`#collapse${index}`" aria-expanded="true" :aria-controls="`collapse${index}`">
                    {{schema.legend}}
                    <i class="material-icons">keyboard_arrow_down</i>
                  </a>
              </div>
              <div :id="`collapse${index}`" class="collapse show" role="tabpanel" :aria-labelledby="`heading${index}`">
                <div class="card-body page">
                  <form-element v-for="field in schema.fields" :field="field" :models="project.items" :key="field.name" />
                </div>
              </div>
            </div>
          </div>
          <b-button :disabled="isLoading" type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-container>
    </div>
    <!-- End of main content -->
  </div>
</template>

<script>
import { getModelInitColumns, groupSchemaForArray } from '~/assets/utils/project';
import { isEmpty } from '~/assets/utils/utils';

import FormElement from '~/components/form/FormElement';

export default {
  data () {
    return {
      isLoading: false,
      identity: null,
      gitaShort: process.env.gitaShort,
      gitaLong: process.env.gitaLong,
      project: {},
      schemas: {
        groups: []
      },
    }
  },
  async created() {
    try {
      const { token } = this.$store.state.auth;
      const schemas = await this.$store.dispatch('project/getSchema');
      const project = await this.$store.dispatch('project/getMyProject', token);
      const groupSchemas = groupSchemaForArray(schemas);
      if (isEmpty(project.items)) {
        project.items = getModelInitColumns(groupSchemas);
      }
      this.identity = project.identity;
      this.project = project;
      this.schemas = { groups: groupSchemas };
    } catch (err) {
      if (err === 'noProjectFound') {
        window.alert('You do Not have any project! Please register ONE.');
        this.$router.push('/project/register');
      } else if (err === 'noAuthorizationHeaderFound') {
        window.alert('You are not verified, please contact SuperNode!');
        this.$router.push('/');
      } else {
        window.alert(err);
      }
    }
  },
  components: {
    FormElement
  },
  methods: {
    async onSubmit (e) {
      try {
        this.isLoading = true;
        e.preventDefault();
        const { identity, project } = this.$data;
        const token = this.$store.state.auth.token;
        const payload = { data: project, token, identity };
        await this.$store.dispatch('project/update', payload);
        this.isLoading = false;
        window.alert('Update Success!');
      } catch ({ error = 'Error: Please check inputs and try again later.' }) {
        console.log(error, '==');
        this.formError = error;
        this.isLoading = false;
      }
    },
  }
}
</script>
<style lang="scss">
.card-body.page > .form-group {
  margin-bottom: 30px;
  > label {
    color: #343a40;
  }
}
</style>

<style lang="scss" scoped>
.page-header {
  background-image: url('/img/project-bg.jpg');
}

.project-container {
  padding: 1.5rem;
  .legend {
    font-size: 25px;
  }
}

.card-header {
  padding-top: 5px;
}
.card-collapse .card-header a:hover,
.card-collapse .card-header a[aria-expanded="true"] {
  color: #2196f3;
}
</style>
