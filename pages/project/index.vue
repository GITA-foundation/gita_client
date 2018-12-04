<template>
  <div>
    <!-- Sub-header section -->
    <div class="page-header header-filter" data-parallax="true"></div>
    <!-- End of sub-header section -->
    <!-- Main content -->
    <div class="main main-raised">
      <div class="container">
        <b-row>
          <b-col md="9" sm="12" class="mt-4 ml-auto mr-auto text-center">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="material-icons">search</i>
                    </span>
                </div>
                <b-form-input v-model="projectSearch" type="text" class="form-control" placeholder="Enter project name / refs node ......" />
            </div>
          </b-col>
        </b-row>
        <hr />
        <b-table
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :items="filterItems(projects)"
          :fields="fields">
          <template slot="title" slot-scope="data">
            <a :href="`/project/${data.item.identity}`">
              <img witdh="30" height="30" :src="data.item.logo" />
              {{data.item.title}}
            </a>
          </template>
          <template slot="percent" slot-scope="data">
            {{data.item.percent}} %
          </template>
          <template slot="refsNode" slot-scope="data">
            <b-badge variant="success">{{data.item.AdminUser && data.item.AdminUser.fullName}}</b-badge>
          </template>
          <template slot="isGitaStandard" slot-scope="data">
            <span :class="data.item.isGitaStandard ? 'success' : ''">
              {{ data.item.isGitaStandard ? 'Match' : 'NOT MATCH'}}
            </span>
          </template>
        </b-table>
      </div>
    </div>
    <!-- End of main content -->
  </div>
</template>

<script>
import * as projectApi from '~/api/project'

export default {
  data () {
    return {
      sortBy: 'percent',
      sortDesc: false,
      projects: [],
      projectSearch: '',
      fields: [
        { key: 'title', label: 'Project Name' },
        { key: 'token' },
        { key: 'refsNode', label: 'refs Node' },
        { key: 'isGitaStandard', label: 'Gita Standard'},
        { key: 'percent', label: 'Completion', sortable: true },

      ]
    }
  },
  async asyncData({ params, store }) {
    try {
      const { data: projects } = await projectApi.getList();
      return { projects };
    } catch (err) {
      console.log(err, '==err');
    }
  },
  methods: {
    filterItems (projects) {
      var app = this;
      return projects.filter(function(project) {
          const regex = new RegExp('(' + app.projectSearch + ')', 'i');
          const refNode = project.AdminUser ? project.AdminUser.fullName : '';
          return regex.test(project.title) || regex.test(refNode);
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  height: 25vh;
  background-image: url('/img/project-bg.jpg');
}

.b-table {
  .success {
    color: #4caf50;
  }

  .danger {
    color: #f44336;
  }
}
</style>
