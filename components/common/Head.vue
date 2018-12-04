<template>
  <nav class="navbar navbar-color-on-scroll navbar-transparent fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
    <b-container>
      <div class="navbar-translate">
        <div class="navbar-brand">
          <div class="logo-big">
            <a href="/"><img src="/img/logo.png" class="img-fluid"></a>
          </div>
          <div class="logo-small">
            <a href="/"><img src="/img/logo_only.png" class="img-fluid"></a>
          </div>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="https://gita.foundation" target="_blank" class="nav-link">
              About {{ gitaShort }}
            </a>
          </li>
          <li class="nav-item">
            <a href=" https://gita.foundation/#organization" target="_blank" class="nav-link">
              {{ gitaShort }} Foundation
            </a>
          </li>
          <li class="nav-item">
            <a href="/project" class="nav-link">
              Projects
            </a>
          </li>
          <template v-if="isAuthenticated">
            <li class="nav-item" v-if="currentUser.isVerified && currentUser.role === 'user' && currentUser.type === 'entity'">
              <a href="/project/mine" class="nav-link">
                My Project
              </a>
            </li>
            <li class="nav-item dropdown" v-if="['node', 'supernode', 'admin'].includes(currentUser.role)">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="/adv/users">User</a>
                <a class="dropdown-item" href="/adv/projects">Project</a>
              </div>
            </li>
            <li class="button-container nav-item iframe-extern">
              <a href="/auth/profile" class="btn btn-info btn-round btn-block">
                <span><i class="material-icons" >person</i> PROFILE</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click="onLogout()" class="nav-link">
                Logout
              </a>
            </li>
          </template>
          <template v-else>
            <li class="button-container nav-item iframe-extern">
              <div class='btn-group'>
                  <a href="/auth/login" class="btn btn-info btn-sm btn-round btn-block">LOGIN
                  </a>
                  <a href="/auth/signup" class="btn btn-info btn-sm btn-round btn-block">SIGNUP
                  </a>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </b-container>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      user: null,
      userActionUrl: '/auth/signup',
      gitaShort: process.env.gitaShort
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },
  methods: {
    onLogout () {
      this.$store.dispatch('auth/logout')
      window.location.href = "/";
    }
  }
}
</script>
