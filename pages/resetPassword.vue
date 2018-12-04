<template>
  <b-container>
    <b-card class='m-3'>
      <b-alert variant="success" :show="isSuccess">密碼修改完成，請嘗試重新登入！</b-alert>
      <b-alert variant="danger" :show="!!formError">{{formError}}</b-alert>
      <h3>重設密碼</h3>
      <b-form @submit="onSubmit">
        <b-form-group label="密碼" label-for="newPassword">
          <b-form-input id="newPassword"
            type="password"
            v-model="form.newPassword"
            required
            placeholder="請輸入您的新密碼" />
        </b-form-group>
        <b-form-group label="密碼確認" label-for="confirmPassword">
          <b-form-input id="confirmPassword"
            type="password"
            v-model="form.confirmPassword"
            required
            placeholder="請再次輸入您的新密碼" />
        </b-form-group>
        <b-button block type="submit" variant="info" :disabled="isLoading">送出</b-button>
      </b-form>
      前往 <b-link href="/auth/login">登入會員</b-link>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      isSuccess: false,
      isLoading: false,
      formError: null,
      form: {
        newPassword: '',
        confirmPassword: ''
      },
    }
  },
  methods: {
    async onSubmit (evt) {
      try {
        evt.preventDefault();
        if (this.newPassword === '' || this.newPassword !== this.confirmPassword) {
          this.formError = '請確認密碼是否輸入正確！'
        }
        const { code } = this.$route.query;
        if (!code) {
          this.formError = '驗證碼有誤，請重新嘗試或者重新提出申請'
        }
        this.isLoading = true;
        await this.$store.dispatch('auth/resetPwd', { ...this.form, code });
        this.formError = null;
        this.isSuccess = true;
        this.isLoading = false;
      } catch ({ error = '發生錯誤：請確認資料無誤重新送出' }) {
        this.formError = error;
        this.isLoading = false;
      }
    }
  }
}
</script>
