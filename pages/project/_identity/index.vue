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
            <GroupDetail :models="project.items" :schema="schema" :verifiedPersonEmails="verifiedPersonEmails" />
          </div>
          <hr />
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
              <div class="media-area">
                <h3 class="title text-center">{{comments.length}} Comments</h3>
                <div class="media"
                  v-for="comment in comments"
                  :key="comment.id">
                  <div class="float-left avatar">
                    {{comment.User.fullName.substr(0, 1)}}
                  </div>
                  <div class="media-body">
                   <h4 class="media-heading">{{comment.User.fullName}} <small>· {{comment.createdAt}}</small></h4>
                   <p>{{comment.content}}</p>
                  </div>
                </div>
              </div>
              <h3 class="title text-center">Post your comment</h3>
              <div class="media media-post">
                <div class="media-body">
                  <b-alert :show="!isAuthenticated" variant="warning">You should login First!</b-alert>
                  <form v-if="isAuthenticated" @submit="onSubmit" class="comment-form">
                    <div class="form-group">
                      <label class="form-control-label bmd-label-floating" for="exampleBlogPost"> Write some nice stuff or nothing...</label>
                      <textarea class="form-control" v-model="form.content" rows="4" required />
                    </div>
                    <div class="text-right">
                      <b-button type="button" v-if="!$store.state.auth" disabled variant="primary">Post Comment</b-button>
                      <b-button type="submit" v-if="$store.state.auth" :disabled="isLoading" variant="primary">Post Comment</b-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </b-container>
      </div>
    </div>
    <!-- End of main content -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeadInfo from '~/components/project/HeadInfo';
import GroupDetail from '~/components/project/GroupDetail';
import { groupSchemaForArray } from '~/assets/utils/project';

export default {
  validate ({ params }) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(params.identity)      // Must be a uuid
  },
  data () {
    return {
      isLoading: false,
      gitaShort: process.env.gitaShort,
      gitaLong: process.env.gitaLong,
      project: {},
      schemas: {},
      comments: [],
      form: {
        content: ''
      }
    }
  },
  async asyncData({ params, store }) {
    try {
      const { identity } = params;
      const [ schemas, project, comments, verifiedPersonEmails ] = await Promise.all([
        store.dispatch('project/getSchema'),
        store.dispatch('project/getByIdentity', { identity }),
        store.dispatch('project/getCommentList', { identity }),
        store.dispatch('project/getVerifiedEmails', { identity })
      ]);
      return {
        comments,
        project,
        schemas: groupSchemaForArray(schemas),
        verifiedPersonEmails
      };
    } catch (err) {
      console.log(err, '==err');
    }

  },
  components: {
    HeadInfo,
    GroupDetail,
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    async onSubmit (e) {
      try {
        e.preventDefault();
        this.isLoading = true;
        const { identity } = this.$route.params;
        const { token } = this.$store.state.auth;
        const payload = { data: this.form, token, identity };
        await this.$store.dispatch('project/createComment', payload);
        alert('Create Success!');
        window.location.reload();
      } catch ({ error = 'Error: Please check inputs and try again later.' }) {
        this.isLoading = false;
      }
    },
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
.comment-form {
  width: 100%;
}
.avatar {
  line-height: 40px;
  text-align: center;
  font-size: 30px;
}
</style>
