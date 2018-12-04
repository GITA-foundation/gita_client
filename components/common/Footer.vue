<template>
  <footer class="footer">
    <b-container fluid>
      <b-row>
        <b-col sm="12" md="2">
          <ul class="social-buttons">
            <li>
              <a href="https://www.linkedin.com/company/gitalliance/" target="_blank" class="btn btn-just-icon btn-link btn-linkedin">
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://medium.com/gita-foundation" target="_blank" class="btn btn-just-icon btn-link btn-medium">
                <i class="fa fa-medium"></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/FoundationGITA/" target="_blank" class="btn btn-just-icon btn-link btn-facebook">
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/gita_foundation" target="_blank" class="btn btn-just-icon btn-link btn-twitter">
                <i class="fa fa-twitter"></i>
              </a>
            </li>
          </ul>
        </b-col>
        <b-col sm="12" md="6">
          <ul>
            <li>
              <a href="https://gita.foundation" target="_blank">
                About {{ gitaShort }}
              </a>
            </li>
            <li>
              <a href="https://gita.foundation/#organization" target="_blank">
                {{ gitaShort }} Foundation
              </a>
            </li>
<!--             <li>
              <a href="#">
                Go Transparency
              </a>
            </li> -->
          </ul>
        </b-col>
        <b-col sm="12" md="4">
          <div class="copyright">&copy; {{ copyrightYear }}, <strong>{{ gitaShort }}</strong> - {{ gitaLong }}</div>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      gitaShort: process.env.gitaShort,
      gitaLong: process.env.gitaLong,
      copyrightYear: new Date().getFullYear()
    }
  }
}
</script>

<style>

</style>
