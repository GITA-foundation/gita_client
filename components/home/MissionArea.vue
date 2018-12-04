<template>
    <div class="team-5 section-image" data-parallax="true">
        <b-container>
            <b-row>
            <b-col md="10" class="ml-auto mr-auto text-center">
                <h2 class="title">GITA Mission</h2>
                <h5 class="description">{{ gitaLong }} ({{ gitaShort }}) purpose is to support companies that create new solutions through the benefits of blockchain technology. At {{ gitaShort }}, we think there should be a level-playing field for fundraising to all global participants. We commit to set the standards for self-disclosure that will guide and govern responsible ICO projects.</h5>
            </b-col>
            </b-row>          
            <b-row>
            <b-col md="4">
                <div class="info text-center">
                <div class="icon">
                    <i class="material-icons">verified_user</i>
                </div>
                <h4 class="info-title">Protection</h4>
                <p>Protect investors by providing access to information about crowdfunding campaigns on blockchain and their progress after the crowdsale.</p>
                </div>
            </b-col>
            <b-col md="4">
                <div class="info text-center">
                <div class="icon">
                    <i class="material-icons">explore</i>
                </div>
                <h4 class="info-title">Development</h4>
                <p>Help blockchain and distributed ledger based businesses succeed in their valuation creation efforts.</p>
                </div>
            </b-col>
            <b-col md="4">
                <div class="info text-center">
                <div class="icon">
                    <i class="material-icons">public</i>
                </div>
                <h4 class="info-title">Collaboration</h4>
                <p>Become a forum for knowledge-sharing and industry improvement.</p>
                </div>
            </b-col>
            </b-row>
        </b-container>
    </div> 
</template>

<script>
export default {
  data () {
    return {
      gitaShort: process.env.gitaShort,
      gitaLong: process.env.gitaLong
    }
  }
}
</script>

<style lang="scss" scoped>
.section-image {

    background-image: url('/img/features-5.jpg');

    .icon {
        color: white;
    }

    .info-title {
        color: white;
    }

    p {
        color: white;
    }
}
</style>