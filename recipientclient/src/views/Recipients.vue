<template>
  <div class="recipients">
    <AddRecipients msg="Add Recipients"/>
    <UploadRecipients />
  </div>
</template>

<script>
// @ is an alias to /src
import AddRecipients from '@/components/AddRecipients.vue';
import UploadRecipients from '@/components/CSVFileUpload.vue';

export default {
  name: 'recipients',
  components: {
    AddRecipients,
    UploadRecipients,
  },
};
</script>
