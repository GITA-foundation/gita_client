<template>
  <b-row>
    <b-col md="6" class="ml-auto mr-auto">
      <div class="profile mb-5">
        <div class="avatar">
          <img :src="this.project.logo" alt="Circle Image" class="img-raised rounded-circle img-fluid">
        </div>
        <div class="name">
          <h3 class="title">{{ this.project.title }}</h3>
          <h6>{{this.project.token}}</h6>
          <p>
            <a :href="getProjectUrl(this.project)">{{getProjectUrl(this.project)}}</a>
          </p>
        </div>
        <div class="description text-center">
          <p>{{this.project.items && this.project.items.project_goal}}</p>
        </div>
      </div>
    </b-col>
    <div class="history-btn">
      <a class='btn btn-info' :href="`/project/${project.identity}/history`">History List</a>
    </div>
  </b-row>
</template>

<script>
export default {
  props: ['project'],
  methods: {
    getProjectUrl: (project) => project.items && project.items.project_url
  }
}
</script>

<style lang="scss" scoped>
.profile {
  .avatar {
    img {
      background-color: white;
    }
  }
}
.history-btn {
  position: absolute;
  right: 5px;
}
</style>
