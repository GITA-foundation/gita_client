<template>
  <div class="page-header header-filter">
    <b-container>
      <b-row>
        <b-col sm="12" md="6" class="ml-auto mr-auto">
          <b-card class="m-4">
            <b-alert variant="danger" :show="!!formError">{{formError}}</b-alert>
            <h2 class="card-title text-center my-4">Login</h2>
            <b-form @submit="onSubmit">
              <b-form-group label="Email" label-for="email">
                <b-form-input id="email"
                  type="email"
                  v-model="form.identifier"
                  required />
              </b-form-group>
              <b-form-group label="Password" label-for="password">
                <b-form-input id="password"
                  type="password"
                  v-model="form.password"
                  required />
              </b-form-group>
              <b-button block type="submit" variant="info">Login</b-button>
            </b-form>
            <div class="text-center my-4">
              Don't have an account? <b-link href="/auth/signup">Please Signup</b-link><br />
              <!-- <ForgotPasswordButton /> -->
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import ForgotPasswordButton from '~/components/auth/ForgotPasswordButton';

export default {
  components: {
    // ForgotPasswordButton,
  },
  async mounted () {
    try {
      const { token } = this.$route.query;
      if (!token) return;
      this.isLoading = true;
      this.$router.push('/');
    } catch (error) {
      console.log(error, '!wee!!');
      this.formError = error;
      this.isLoading = false;
    }
  },
  data () {
    return {
      isLoading: false,
      formError: null,
      form: {
        identifier: '',
        password: ''
      },
    }
  },
  methods: {
    async onSubmit (evt) {
      try {
        evt.preventDefault();
        this.isLoading = true;
        await this.$store.dispatch('auth/login', this.form);
        this.$router.push('/');
      } catch ({ error = 'Error: Please check inputs and try again later.' }) {
        this.formError = error;
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background-image: url('/img/bg7.jpg');
  background-size: cover;
  background-position: top center;
}
</style>
