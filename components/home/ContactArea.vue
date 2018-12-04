<template>
    <div class="section section-contacts">
        <b-container>
            <h2 class="title text-center">Be Part of {{ gitaShort }}</h2> 
            <b-row>
                <b-col sm="12" md="6" class="ml-auto mr-auto">
                    <div class="info-horizontal m-3">
                        <div class="icon icon-primary mt-2">
                            <i class="material-icons">layers</i>
                        </div>
                        <div class="description">
                            <h4 class="info-title">Blockchain-related Projects</h4>
                            <p class="text-justify">Projects utilizing blockchain technology for fundraising are encouraged to disclosure their project details via the {{ gitaShort }} platform to facilitate transparency with investors to build up trust and confidence.</p>
                        </div>
                    </div>     
                    <div class="info-horizontal m-3">
                        <div class="icon icon-primary mt-2">
                            <i class="material-icons">layers</i>
                        </div>
                        <div class="description">
                            <h4 class="info-title">Organizations Promoting Blockchain</h4>
                            <p class="text-justify">{{ gitaShort }} aims to build an industry standard for ICO to foster the developmemnt of the whole blockchain industry. With a global recognized standard, organization promoting blockchain can have a better direction.</p>
                        </div>
                    </div>    
                    <div class="info-horizontal m-3">
                        <div class="icon icon-primary mt-2">
                            <i class="material-icons">layers</i>
                        </div>
                        <div class="description">
                            <h4 class="info-title">Funds, Exchanges or Incubators</h4>
                            <p class="text-justify">As an investor or exchange, it's tired to study projects that have different standrads which makes investment decision much harder. With {{ gitaShort }} transparency platform gathering and verifiying information become much more easier.</p>
                        </div>
                    </div>    
                    <!-- <div class="text-center"><a href="#pablo" class="btn btn-primary">Learn More</a></div> -->
                </b-col>
                <b-col sm="12" md="4" class="ml-auto mr-auto my-auto">
                    <h5 class="description">Have questions about {{ gitaShort }}? Feel free to drop us a message.</h5>
                    <b-form class="contact-form" @submit="onSubmit">
                        <b-form-group>
                            <label for="name" class="bmd-label-floating">Your Name</label>
                            <b-form-input v-model="contact.name" name="name" type="text" class="form-control" required />
                        </b-form-group>
                        <b-form-group>
                            <label for="email" class="bmd-label-floating">Your Email</label>
                            <b-form-input v-model="contact.email" name="email" type="email" class="form-control" required />
                        </b-form-group>
                    <b-form-group>
                        <label for="msg" class="bmd-label-floating">Your Message</label>
                        <b-form-textarea v-model="contact.content" name="msg" type="text" class="form-control" rows="4" required></b-form-textarea>
                    </b-form-group>
                    <b-row>
                        <b-col md="4" class="ml-auto mr-auto text-center">
                        <button class="btn btn-primary btn-raised mt-4">
                            Send Message
                        </button>
                        </b-col>
                    </b-row>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import axios from '~/plugins/axios';
export default {
  data () {
    return {
      gitaShort: process.env.gitaShort,
      contact: {
        name: '',
        email: '',
        content: ''
      },
    }
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault();
      let result = await axios.post('/api/faq/forms', this.contact);
      alert('Thanks for your information, will contact.')
      window.location.reload();
      // return this.$router.push('/');
    },
  }
}
</script>

<style lang="scss" scoped>
.section-contacts {
    fieldset {
        margin: 5px 0px 5px 0px;
    }
}
</style>