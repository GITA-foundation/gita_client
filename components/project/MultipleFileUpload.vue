<template>
  <div class="wrapper">
    <div v-if="model[name] && model[name].length > 0"
      v-for="(file, index) in model[name]" :key="file.fd">
      {{file.filename}}
      <a :href="file.fd" target="_blank">
        <i class="material-icons">pageview</i>
      </a>
      <i class="material-icons delete" :index='index' @click="onDelete">delete</i>
    </div>
    <input class="form-control"
      type="file"
      @change="onChange"
      :accept="schema.accept || '.pdf,.docx'"
      :multiple="schema.multiple"
      :disabled="uploading" />
    <span :class="hasErr ? 'has-error' : ''">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: ['model', 'schema', 'name'],
  data () {
    return {
      message: '',
      hasErr: false,
      uploading: false,
    }
  },
  methods: {
    isOverSize (fileSize) {
      // 100 MB = 100 * 1000 * 1000
      const sizeLimit = 100000000;
      return fileSize > sizeLimit;
    },
    onDelete ({ target }) {
      const index = target.getAttribute('index');
      this.model[this.name].splice(index, 1);
    },
    async onChange({ target }){
      try {
        this.uploading = true;
        this.hasErr = false;

        if (target.files.length < 1) {
          this.message = 'Please choose a file';
          this.hasErr = true;
          this.uploading = false;
          return;
        }
        this.message = 'Uploading ...';

        const { token } = this.$store.state.auth;
        const uploadPromises = Array.from(target.files).reduce((r, file) => {
          if (this.isOverSize(file.size)) return r;

          let formData = new FormData();
          formData.append('uploadfile', file);
          formData.append('filename', file.name);
          return [...r, this.$store.dispatch('image/upload', { formData, token })];
        }, []);

        const result = await Promise.all(uploadPromises).then();
        const formatResult = result.map((output) => {
          return {
            fd: output[0].fd,
            filename: output[0].filename,
          };
        });

        const originModel = this.model[this.schema.model] ? Array.from(this.model[this.schema.model]) : [];
        this.model[this.name] = [...originModel, ...formatResult];

        this.message = '';
        this.uploading = false;
      } catch (e) {
        this.hasErr = true;
        this.message = 'Upload Fail!';
        this.uploading = false;
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped type="text/css">
input[type=file] {
  opacity: 1;
  z-index: 1;
  position: relative;
}
span.has-error {
  color: red;
}
i.delete {
  position: relative;
  top: 7.5px;
}
</style>
