<template>
  <span>
    <b-link @click="show=true">Forgot Password</b-link>
    <b-modal v-model="show" title='Forgot Password' @shown="resetData">
       <b-container>
        <b-alert variant="danger" :show="!!formError">{{formError}}</b-alert>
        <b-alert variant="success" :show="isSuccess">Please check your email for the password reset link</b-alert>
        <form @submit.stop.prevent="handleSubmit">
          <b-form-input type="email"
            required
            block
            placeholder="Please enter your email address"
            v-model="form.email" />
          </form>
       </b-container>
       <div slot="modal-footer" class="w-100 text-right">
         <b-btn class="mr-3" @click="show=false">Close</b-btn>
         <b-btn v-if="!isSuccess" variant="success" @click="handleSubmit" :disabled="isLoading">Submit</b-btn>
       </div>
    </b-modal>
  </span>
</template>

<script>
export default {
  data () {
    return {
      formError: null,
      isLoading: false,
      isSuccess: false,
      show: false,
      form: {
        email: ''
      },
    }
  },
  methods: {
    resetData () {
      this.formError = null;
      this.isLoading = false;
      this.isSuccess = false;
      this.form.email = '';
    },
    async handleSubmit () {
      try {
        this.isLoading = true;
        await this.$store.dispatch('auth/forgotPwd', this.form);
        this.isSuccess = true;
        this.isLoading = false;
      } catch ({ error = 'Error: Please check inputs and try again later.' }) {
        this.formError = error;
        this.isLoading = false;
      }
    }
  }
}
</script>
