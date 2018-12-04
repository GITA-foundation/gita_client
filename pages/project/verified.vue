<template>
  <div>
    <!-- Sub-header section -->
    <div class="page-header header-filter" data-parallax="true"></div>
    <!-- End of sub-header section -->
    <!-- Main content -->
    <div class="main main-raised">
      <div class="text-center">
        <b-alert :show="isLoaded" :variant="`${ok ? 'success' : 'danger'}`">{{msg}}</b-alert>
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
      isLoaded: false,
      ok: false,
      msg: ''
    }
  },
  async asyncData({ params, store, route }) {
    try {
      const { token } = route.query;
      const result = await projectApi.verified(token);
      const { ok, msg } = result.data;
      return { isLoaded: true, ok, msg };
      console.log(t,'===');
    } catch (err) {
      console.log(err, '==err');
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  height: 25vh;
  background-image: url('/img/project-bg.jpg');
}
</style>
