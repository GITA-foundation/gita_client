<template>
  <div id='main-body'>
    <Head />
    <main>
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Head from '~/components/common/Head';
import Footer from '~/components/common/Footer';
export default {
  components: {
    Footer,
    Head
  }
}
</script>
<style type="text/css">
html {
    height: 100%;
}

#main-body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
header {
   flex: 0 0 auto;
}

main {
   flex: 1 0 auto;
}
footer {
   flex: 0 0 auto;
}

</style>
