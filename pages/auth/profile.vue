<template>
  <div class="page-header header-filter">
    <b-container>
      <b-row>
        <b-col sm="12" md="6" class="ml-auto mr-auto">
          <b-card class='m-4'>
            <b-alert variant="danger" :show="!!formError">{{formError}}</b-alert>
            <b-alert variant="success" :show="isSuccess">Profile updated!</b-alert>
            <h2 class="card-title text-center my-4">Profile setting</h2>
            <b-form @submit="onSubmit">
              <b-form-group label="Email" label-for="email">
                <b-form-input id="email"
                  disabled
                  type="email"
                  v-model="form.email" />
              </b-form-group>
              <b-form-group label="Edit password" label-for="password">
                <b-form-input id="password"
                  type="password"
                  v-model="form.password" />
              </b-form-group>
              <b-form-group label="Password confirm" label-for="confirmPassword">
                <b-form-input id="confirmPassword"
                  type="password"
                  v-model="form.confirmPassword" />
              </b-form-group>
              <b-form-group label="Name" label-for="fullName">
                <b-form-input id="fullName"
                  type="text"
                  v-model="form.fullName"
                  required
                  placeholder="input nick name" />
              </b-form-group>
              <b-form-group label="Contact" label-for="contact">
                <b-form-input id="contact"
                  type="text"
                  v-model="form.contact"
                  required
                  placeholder="input contact" />
              </b-form-group>
              <b-form-group label="Phone" label-for="phone">
                <b-form-input id="phone"
                  type="tel"
                  v-model="form.phone"
                  placeholder="Please input your phone number" />
              </b-form-group>
              <b-form-group label="Address" label-for="address">
                <b-form-textarea id="address"
                  rows="4"
                  v-model="form.address"
                  placeholder="Please enter address here." />
              </b-form-group>
              <b-button block type="submit" variant="info" :disabled="isLoading">Confirm</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  components: {
    // ForgotPasswordButton,
  },
  data () {
    return {
      isSuccess: false,
      isLoading: false,
      formError: null,
      form: {
        password: null,
        confirmPassword: null,
        fullName: null,
        phone: null,
        address: null,
        country: null,
      },
      genderOptions: [
        { text: '男生', value: 'male' },
        { text: '女生', value: 'female' },
        { text: '其他', value: 'none' }
      ]
    }
  },
  async created() {
    try {

      this.form = await this.$store.dispatch('auth/getProfile');
      // console.log(this.form);
      // return { form: user }
    } catch (err) {
      return { formError: err || '發生錯誤：請重新嘗試，或者聯絡管理員'}
    }
  },
  methods: {
    changeGender (temp) {
      this.form.gender = 'none';
    },
    async onSubmit (evt) {
      try {
        evt.preventDefault();
        this.isSuccess = false;
        const {
          password, confirmPassword, fullName, gender, mobile,
          address, region, zipcode, birthDate,
        } = this.form;

        if (password && password !== confirmPassword) {
          this.formError = 'Please confirm your password is correct！'
          return;
        }
        this.isLoading = true;
        const params = this.form;
        await this.$store.dispatch('auth/updateProfile', params);
        this.formError = null;
        this.isLoading = false;
        this.isSuccess = true;
      } catch ({ error = 'Warning: please try again.' }) {
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
  display: block;
  padding-top: 80px;
  height: auto;
}
</style>
