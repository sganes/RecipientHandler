<template>
  <v-container>
    <v-file-input
      v-model="file"
      accept=".csv"
      label="Select File..."
    ></v-file-input>
    <v-btn @click="onUpload" :disabled="!file">Upload</v-btn>
    <p>{{ this.responseMsg }}</p>
  </v-container>
</template>

<script>
export default {
  name: 'fileUpload',
  data() {
    return {
      file: null,
      responseMsg: '',
    };
  },
  methods: {
    async onUpload() {
      const formData = new FormData();
      formData.append('file', this.file);
      const response = await fetch('/api/recipients/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.status === 200) {
        this.responseMsg = 'uploaded successfully';
        this.file = null;
      } else {
        this.responseMsg = 'Error uploading';
      }
    },
  },
};
</script>
