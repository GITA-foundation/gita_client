<template>
    <b-container>
        <div class="section">
            <!-- Search projects -->
            <b-row>
            <b-col md="6" sm="12" class="ml-auto mr-auto text-center">
                <h2 class="title">Browse Projects</h2>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="material-icons">search</i>
                        </span>
                    </div>
                    <b-form-input v-model="projectSearch" type="text" class="form-control" placeholder="Enter project name..." />
                </div>
            </b-col>
            </b-row>
            <!-- End of search projects -->
            <!-- Display projects -->
            <div class="main-project-list d-flex flex-wrap justify-content-center">
            <div class="m-3 p-2 text-center" v-for="project in filterItems(projects)" :key="project.identity">
                <a :href="`/project/${project.identity}`">
                <img class="img-raised rounded" :src="project.logo" />
                <div class="title mt-2">
                  {{ project.title }}
                  <br /><small class="text-muted">{{ project.token }}</small>
                </div>
                </a>
            </div>
            </div>
            <!-- End of display projects -->
        </div>
    </b-container>
</template>

<script>
import * as projectApi from '~/api/project'
export default {
  data () {
    return {
      projectSearch: '',
      projects: []
    }
  },
  async created() {
    const projects = await projectApi.getList();
    this.projects = projects.data;
  },
  methods: {
      filterItems (presets) {
          var app = this;
          return presets.filter(function(preset) {
              let regex = new RegExp('(' + app.projectSearch + ')', 'i');
              return preset.title.match(regex);
          })
      }
  }
}
</script>

<style lang="scss" scoped>
.main-project-list {
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
