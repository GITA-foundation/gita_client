<template>
  <div>
    <!-- Sub-header section -->
    <div class="page-header header-filter header-small" data-parallax="true">
      <b-container>
        <b-row>
          <b-col md="8" class="ml-auto mr-auto text-center">
            <h2 class="title">{{ gitaLong }}</h2>
            <h4><strong>{{ gitaShort }}</strong> seeks to promote a self-regulatory framework and sustainable ecosystem, both in the pre-ICO and post-ICO phases, to drive transparency and accountability across the globe.</h4>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- End of sub-header section -->
    <!-- Main content -->
    <div class="main main-raised">
      <!-- Recent projects -->
      <ProjectArea />
      <!-- GITA Mission -->
      <MissionArea />   
      <!-- Contact form -->
      <ContactArea />
    </div>
    <!-- End of main content -->
  </div>
</template>

<script>
import ProjectArea from '~/components/home/ProjectArea';
import MissionArea from '~/components/home/MissionArea';
import ContactArea from '~/components/home/ContactArea';
export default {
  data () {
    return {
      gitaShort: process.env.gitaShort,
      gitaLong: process.env.gitaLong,
    }
  },
  components: {
    ProjectArea,
    MissionArea,
    ContactArea
  },
  methods: {
    setLang () {
      const currentLocale = this.$i18n.locale
      // set locales
      this.$i18n.locale = currentLocale === 'zh'? 'en':'zh'
      this.$store.commit('SET_LANG', this.$i18n.locale)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background-image: url('/img/main-bg.jpg');
}
</style>
