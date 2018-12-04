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
                <b-form-input v-model="searchText" type="text" class="form-control" placeholder="Enter FullName / Email / Role / refs node ......" />
            </div>
          </b-col>
        </b-row>
        <b-table
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :items="filterItems(users)"
          :fields="fields">
          <template slot="refsNode" slot-scope="data">
            <b-badge>{{data.item.Node.fullName}}</b-badge>
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
          <template slot="role" slot-scope="data">
            <select class='form-control' @change="onRoleChanged"
              :value="data.item.role"
              :data-index="data.index">
              <option value="user">User</option>
              <option value="node">Node</option>
              <option value="supernode" v-if="currentUser.role !== 'node'">SuperNode</option>
            </select>
          </template>
        </b-table>
      </div>
    </div>
    <!-- End of main content -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {

      sortBy: 'id',
      sortDesc: false,
      users: [],
      searchText: '',
      fields: [
        { key: 'id', label: '#' },
        { key: 'fullName' },
        { key: 'type' },
        { key: 'email' },
        { key: 'title'},
        { key: 'country'},
        { key: 'refsNode', label: 'refs Node' },
        { key: 'isVerified', label: 'isVerified' },
        { key: 'role', label: 'Role' }
      ]
    }
  },
  async created() {
    try {
      const { token } = this.$store.state.auth;
      const result = await this.$store.dispatch('advance/getUsers', token);
      this.users = result.users;
    } catch (err) {
      console.log(err, '===');
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    async onRoleChanged (e) {
      try {
        const index = e.target.getAttribute('data-index');
        const newRole = e.target.value;
        const originData = this.users[index];
        const originRole = originData.role;
        if (newRole === originRole) return;

        const result = window.confirm(`Are you sure you want to update ${originData.fullName}'s Role ?`);

        if (!result) {
          e.target.value = originRole;
          return;
        }

        const { token } = this.$store.state.auth;
        await this.$store.dispatch('advance/updateUser', {
          id: originData.id,
          token,
          role: newRole
        });
      } catch (err) {
        console.log('error', err);
      }
    },
    async onVerificationChanged (e) {
      try {
        const index = e.target.getAttribute('data-index');
        const newVerfication = e.target.checked;
        const originData = this.users[index];
        const originVerfication = originData.isVerified;
        if (newVerfication === originVerfication) return;

        const result = window.confirm(`Are you sure you want to update ${originData.fullName}'s verification ?`);

        if (!result) {
          e.target.checked = originVerfication;
          return;
        }

        const { token } = this.$store.state.auth;
        await this.$store.dispatch('advance/updateUser', {
          id: originData.id,
          token,
          isVerified: newVerfication
        });
      } catch (err) {
        console.log('error', err);
      }
    },
    filterItems (users) {
      var app = this;
      return users.filter(function(user) {
          const regex = new RegExp('(' + app.searchText + ')', 'i');
          return regex.test(user.fullName)
            || regex.test(user.email)
            || regex.test(user.role)
            || regex.test(user.title);
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  // height: 25vh;
  height: 150px;
  background-image: url('/img/project-bg.jpg');
}
.main {
  // z-index: 9999;
}
</style>
