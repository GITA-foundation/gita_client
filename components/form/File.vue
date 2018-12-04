<template>
  <div class="form-group bmd-form-group">
    <f-label :field="field" />
    <div>
      <div v-if="models[field.model] && models[field.model].length > 0"
        v-for="(file, index) in models[field.model]" :key="file.fd">
        {{file.filename || 'File'}}
        <a :href="file.fd" target="_blank">
          <i class="material-icons">pageview</i>
        </a>
        <i class="material-icons delete" :index='index' @click="onDelete">delete</i>
      </div>
      <input class="form-control"
        type="file"
        @change="onChange"
        :accept="field.accept"
        :multiple="field.multiple"
        :placeholder="field.placeholder"
        :readonly="field.readonly"
        :disabled="false"
        :required="isRequired()" />
      <span class="has-error">{{ message }}</span>
    </div>
  </div>
</template>

<script>
import FLabel from '~/components/form/FLabel';
export default {
  props: ['models', 'field'],
  data () {
    return {
      message: '',
      hasErr: false,
      uploading: false,
    }
  },
  components: {
    FLabel,
  },
  computed: {
    values() {
      return this.models[this.field.model];
    }
  },
  methods: {
    isImage (src) {
      return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(src);
    },
    isRequired () {
      // 應必填而為填時才驗證
      return this.field.required && !this.models[this.field.model];
    },
    isOverSize (fileSize) {
      // 100 MB = 100 * 1000 * 1000
      const sizeLimit = 100000000;
      return fileSize > sizeLimit;
    },
    onDelete ({ target }) {
      const index = target.getAttribute('index');
      this.models[this.field.model].splice(index, 1);
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

        const originModel = this.models[this.field.model] ? Array.from(this.models[this.field.model]) : [];
        this.models[this.field.model] = [...originModel, ...formatResult];
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
  position: relative;
  width: 90%;
  z-index: 1;
}

span.has-error {
  color: red;
}

i.delete {
  cursor: pointer;
  position: relative;
  top: 7.5px;
}
</style>
