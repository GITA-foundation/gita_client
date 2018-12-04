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
            <a :href="`/project/${data.item.identity}/history/latest`" target="_blank">
              <img witdh="30" height="30" :src="data.item.logo" />
              {{data.item.title}}
            </a>
          </template>
          <template slot="percent" slot-scope="data">
            {{data.item.percent}} %
          </template>
          <template slot="refsNode" slot-scope="data">
            <b-badge>{{data.item.AdminUser && data.item.AdminUser.fullName}}</b-badge>
          </template>
          <template slot="isGitaStandard" slot-scope="data">
            <span :class="data.item.isGitaStandard ? 'success' : ''">
              {{ data.item.isGitaStandard ? 'Match' : 'NOT MATCH'}}
            </span>
          </template>
          <template slot="history" slot-scope="data">
            <b-row>
              <a class='btn btn-info' target="_blank" :href="`/project/${data.item.identity}/history`">History List</a>
            </b-row>
          </template>
          <template slot="isVerified" slot-scope="data">
            <div class="togglebutton">
              <label>
                <input type="checkbox" @change="onVerificationChanged"
                  :checked="data.item.isVerified"
                  :data-index="data.index">
                  <span class="toggle"></span>
              </label>
            </div>
          </template>
          <template slot="status" slot-scope="data">
            <select class='form-control' @change="onStatusChanged"
              :value="data.item.status"
              :data-index="data.index">
              <option value="draft">Draft</option>
              <option value="publish">Publish</option>
            </select>
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
        { key: 'isVerified', label: 'isConfirmed' },
        { key: 'status', label: 'Status' },
        { key: 'percent', label: 'Completion', sortable: true },
      ]
    }
  },
  async asyncData({ params, store }) {
    try {
      const { token } = store.state.auth;
      const projects = await store.dispatch('advance/getProjects', token);
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
    },
    async onStatusChanged (e) {
      try {
        const index = e.target.getAttribute('data-index');
        const newStatus = e.target.value;
        const originData = this.projects[index];
        const originStatus = originData.status;
        if (newStatus === originStatus) return;
        const result = window.confirm(`Are you sure you want to update ${originData.title}'s status ?`);

        if (!result) {
          e.target.value = originStatus;
          return;
        }

        const { token } = this.$store.state.auth;
        await this.$store.dispatch('advance/updateProject', {
          identity: originData.identity,
          token,
          status: newStatus
        });
      } catch (err) {
        console.log('error', err);
      }
    },
    async onVerificationChanged (e) {
      try {
        const index = e.target.getAttribute('data-index');
        const newVerfication = e.target.checked;
        const originData = this.projects[index];
        const originVerfication = originData.isVerified;
        if (newVerfication === originVerfication) return;
        const result = window.confirm(`Are you sure you want to update ${originData.title} ?`);

        if (!result) {
          e.target.checked = originVerfication;
          return;
        }

        const { token } = this.$store.state.auth;
        await this.$store.dispatch('advance/updateProject', {
          identity: originData.identity,
          token,
          isVerified: newVerfication
        });
      } catch (err) {
        console.log('error', err);
      }
    },
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
