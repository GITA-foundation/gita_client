<template>
  <div>
    <!-- Sub-header section -->
    <div class="page-header header-filter" data-parallax="true"></div>
    <!-- End of sub-header section -->
    <!-- Main content -->
    <div class="main main-raised">
      <div class="container">
        <b-table
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :items="projectHistories"
          :fields="fields">
          <template slot="title" slot-scope="data">
            <img witdh="30" height="30" :src="data.item.logo" />
            {{data.item.title}}
          </template>
          <template slot="percent" slot-scope="data">
            {{data.item.percent}} %
          </template>
          <template slot="modifyUser" slot-scope="data">
            {{data.item.ModifyUser && data.item.ModifyUser.fullName}}
          </template>
          <template slot="detail" slot-scope="data">
            <a class='btn btn-default'
              :href="`/project/${projectIdentity}/history/${data.item.id}`">
              More
            </a>
          </template>
        </b-table>
        <b-row>
          <b-col md="3" class="ml-auto mr-auto text-center">
            <a class='btn btn-info' :href="`/project/${projectIdentity}`">Go back to the last page</a>
          </b-col>
        </b-row>
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
      projectIdentity: this.$route.params.identity,
      sortBy: 'createdAt',
      sortDesc: false,
      projectHistories: [],
      fields: [
        { key: 'title', label: 'Project Name' },
        { key: 'token' },
        { key: 'status' },
        { key: 'isVerified', label: 'isConfirmed' },
        { key: 'percent', label: 'Completion' },
        { key: 'modifyUser', label: 'Modify User'},
        { key: 'createdAt' },
        { key: 'detail', label: 'Detail' },
      ]
    }
  },
  async asyncData({ params, store }) {
    try {
      const projectIdentity = params.identity
      const { token } = store.state.auth;
      const { data: projectHistories } = await projectApi.getHistoryList({ projectId: projectIdentity, token });
      return { projectHistories };
    } catch (err) {
      console.log(err, '==err');
    }
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  height: 25vh;
  background-image: url('/img/project-bg.jpg');
}

</style>
