<template>
  <div class="page-header header-filter">
    <b-container>
      <b-row>
        <b-col md="8" class="ml-auto mr-auto">
          <b-card class="card-signup">
            <div class='alert alert-info'>It ONLY support for ICO issuer/SuperNode/Node to register now.</div>
            <div class='alert alert-danger' v-if="!!formError">{{formError}}</div>
            <h2 class="card-title text-center my-4">Join {{ gitaShort }}</h2>
            <b-form @submit="onSubmit">
              <b-form-group label="E-mail" label-for="email">
                <b-form-input id="email"
                  type="email"
                  v-model.trim="form.email"
                  required
                  autocomplete="username email"
                  placeholder="Please enter a valid email. This will be your login ID" />
              </b-form-group>
              <b-form-group label="Password" label-for="password">
                <b-form-input id="password"
                  type="password"
                  v-model="form.password"
                  required
                  autocomplete="new-password"
                  placeholder="Please enter a password" />
              </b-form-group>
              <b-form-group label="Confirm password" label-for="confirmPassword">
                <b-form-input id="confirmPassword"
                  type="password"
                  v-model="form.confirmPassword"
                  required
                  autocomplete="new-password"
                  placeholder="Please re-enter your password" />
              </b-form-group>
              <b-form-group label="Name" label-for="contact">
                <b-form-input id="contact"
                  type="text"
                  v-model.trim="form.contact"
                  required
                  placeholder="Please enter a recognizable name" />
              </b-form-group>
              <b-form-group label="Node" label-for="node">
                <b-form-select id="node"
                  v-model="form.node"
                  :options="nodes"
                  required
                  placeholder="Please select your country" />
              </b-form-group>
              <b-form-group label="Country" label-for="country">
                <b-form-select id="country"
                  v-model="form.country"
                  :options="countries"
                  required
                  placeholder="Please select your country" />
              </b-form-group>
              <b-form-group label="Company/Entity Name" label-for="company">
                <b-form-input id="company"
                  type="text"
                  v-model.trim="form.company"
                  required
                  placeholder="Please enter your company/project/entity name" />
              </b-form-group>
              <b-form-group label="Title/Position" label-for="title">
                <b-form-input id="title"
                  type="text"
                  v-model.trim="form.title"
                  required
                  placeholder="Please enter your title/position" />
              </b-form-group>
              <b-button block type="submit" variant="info" :disabled="isLoading">Submit</b-button>
            </b-form>
            <div class="text-center my-3">Already registered? <b-link href="/auth/login">Login here</b-link></div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import http from '~/plugins/axios';

export default {
  data () {
    return {
      gitaShort: process.env.gitaShort,
      isLoading: false,
      formError: null,
      countries: [],
      nodes: [],
      form: {
        email: null,
        type: 'entity',
        contact: null,
        country: null,
        company: null,
        title: null,
        password: null,
        confirmPassword: null,
        node: null,
      },
    }
  },
  methods: {
    async onSubmit (evt) {
      try {
        evt.preventDefault();
        if (this.form.password === '' || this.form.password !== this.form.confirmPassword) {
          this.formError = 'Please ensure the password you type is correct!'
          return;
        }
        this.isLoading = true;
        await this.$store.dispatch('auth/signup', this.form);
        this.$router.push('/');
      } catch ({ error = 'Error: Please check inputs and try again later.' }) {
        this.formError = error;
        this.isLoading = false;
      }
    },
    async getNodeList () {
      let { data } = await http.get('/api/node/list');
      data.forEach((ele) => {
        this.nodes.push({ value: ele.id, text: ele.company })
      })
    },
    async getCountriesList () {
      let { data } = await axios.get('https://restcountries.eu/rest/v2/all');
      data.forEach((ele) => {
        this.countries.push({ value: ele.name, text: ele.name })
      })
    }
  },
  async created () {
    try {
      await this.getNodeList();
      await this.getCountriesList();
    } catch (e) {}
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background-image: url('/img/bg7.jpg');
  background-size: cover;
  background-position: top center;
  display: block;
  padding-top: 80px;
  height: auto;
}
</style>
