<template>
  <div class="profile-page">
    <!-- Sub-header section -->
    <div class="page-header header-filter" data-parallax="true"></div>
    <!-- End of sub-header section -->
    <!-- Main content -->
    <div class="main main-raised">
      <div class="profile-content">
        <b-container>
          <HeadInfo :project="project" />
          <div class="m-3 p-2 text-center"
            v-if="schema.fields.length > 0"
            v-for="schema in schemas" :key="schema.legend">
            <hr />
            <GroupDetail :models="project.items" :schema="schema" />
          </div>
          <b-row>
            <b-col md="3" class="ml-auto mb-4 mr-auto text-center">
              <label>
                Modify User: {{project.ModifyUser && project.ModifyUser.fullName}}<br/>
                Modify At: {{project.createdAt}}
              </label>
              <a class='btn btn-info' :href="`/project/${projectIdentity}/history`">Go Back To History List</a>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <!-- End of main content -->
  </div>
</template>

<script>
import HeadInfo from '~/components/project/HeadInfo';
import GroupDetail from '~/components/project/GroupDetail';
import { groupSchemaForArray } from '~/assets/utils/project';

export default {
  validate ({ params }) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(params.identity)
      && /^(\d|latest)+$/.test(params.historyId) // Must be a uuid
  },
  data () {
    return {
      projectIdentity: this.$route.params.identity,
      isLoading: false,
      gitaShort: process.env.gitaShort,
      gitaLong: process.env.gitaLong,
      project: {},
      schemas: {},
      form: {
        content: ''
      }
    }
  },
  async asyncData({ params, store }) {
    try {
      const { token } = store.state.auth;
      const { identity, historyId } = params;
      const payload = {
        token,
        projectId: identity,
        historyId
      };
      const [ schemas, project ] = await Promise.all([
        store.dispatch('project/getSchema'),
        store.dispatch('project/getHistory', payload),
      ]);
      return { project, schemas: groupSchemaForArray(schemas) };
    } catch (err) {
      console.log(err, '==err');
    }

  },
  components: {
    HeadInfo,
    GroupDetail,
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background-image: url('/img/project-bg.jpg');
}

h2.title {
  word-wrap: break-word;
}

.list-item {
  border: 1px solid #00000020;
}
</style>
