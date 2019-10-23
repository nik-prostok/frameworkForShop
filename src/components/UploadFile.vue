<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <b-form-file
          v-model.lazy="files"
          multiple
          placeholder="Выберите файлы..."
          drop-placeholder="Drop file here..."
          :file-name-formatter="formatNames"
          :change="handleFileUpload()"
        />
      </div>
    </div>
    <div class="container mt-3">
      <div
        v-for="(file, index) in files"
        :key="file.name"
        class="container row mt-1 mb-1"
      >
        <div
          v-if="file.name !== ''"
          class="col-1"
        >
          <i
            class="material-icons"
            style="cursor: pointer;"
            @click="deleteFile(index)"
          >close</i>
        </div>
        <div
          v-if="file.name.length < 10"
          class="col-4"
        >
          {{ file.name }}
        </div>
        <div
          v-else
          class="col-4"
        >
          {{ file.name.slice(0, 10) }}...
        </div>
        <div
          v-if="file.name !== ''"
          class="col-7"
        >
          <progress-bar
            v-if="!uploadPercentage[index]"
            :value="uploadPercentage[index]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../../config.json';
import ProgressBar from './ProgressBar.vue';

export default {
  components: {
    'progress-bar': ProgressBar,
  },
  data() {
    return {
      files: [
        {
          uploadPercentage: 0,
          name: '',
        },
      ],
      max: 100,
      fileNames: [],
      uploadPercentage: [0],
      urlName: [],
      value: 30,
      stateSendData: false,
    };
  },
  methods: {
    deleteFile(index) {
      this.files.splice(index, 1);
      this.urlName.splice(index, 1);
      this.uploadPercentage.splice(index, 1);
      this.$emit('uploadFiles', this.urlNames);
    },
    onAllUploadFile(urlNames) {
      this.$emit('uploadFiles', urlNames);
    },
    formatNames(files) {
      if (files.length === 2) {
        return files[0].name;
      }
      return `${files.length} files selected`;
    },
    handleFileUpload() {
      this.fileNames = this.files.map((file) => {
        if (file.name < 7) return file.name;
        return file.name.slice(0, 7);
      });
      if (this.files.length && this.files[0].name !== '') {
        this.submitFile();
      }
    },
    submitFile() {
      let formData;
      const myUploadProgress = (fileName, index) => (progress) => {
        const percentage = Math.floor((progress.loaded * 100) / progress.total);
        if (percentage === 100 && this.uploadPercentage[index] !== 100) {
          this.$set(this.uploadPercentage, [index], percentage);
        }
      };

      this.files.forEach((file, index) => {
        const configUpload = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: myUploadProgress(file.name, index),
        };

        formData = new FormData();
        formData.append('image', file);

        axios
          .post(`${config.api}/image/upload`, formData, configUpload)
          .then((response) => {
            let count = false;
            this.urlName.forEach((name) => {
              if (name === response.data.data) {
                count = true;
              }
            });
            if (!count) this.urlName.push(response.data.data);
          })
          .catch((err) => {
            // console.error(err);
          });
      });
      this.onAllUploadFile(this.urlName);
    },
  },
};
</script>
