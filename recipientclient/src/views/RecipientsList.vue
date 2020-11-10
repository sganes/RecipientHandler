<template>
  <v-card>
    <v-card-title>
      <v-btn small class="mr-2" @click="deleteRecipients">
        Delete selected recipients
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :search="search"
      v-model="selected"
      :headers="headers"
      :items="recipients"
      :single-select="singleSelect"
      item-key="firstName"
      show-select
      class="elevation-1"
    >
    </v-data-table>
    <!-- <p>{{ responseMsg }}</p> -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      responseMsg: '',
      search: '',
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'First name',
          align: 'start',
          sortable: true,
          value: 'firstName',
        },
        { text: 'Last name', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Country', value: 'country' },
      ],
      recipients: [],
    };
  },
  created() {
    this.getRecipients();
  },
  methods: {
    async getRecipients() {
      const response = await fetch('/api/recipients');
      this.recipients = await response.json();
    },
    async deleteRecipients() {
      const response = await fetch('/api/recipients', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.selected),
      });
      if (response.status === 200) {
        this.responseMsg = 'Recipient deleted successfully';
        this.selected = [];
        this.search = '';
        this.recipients = await response.json();
      } else {
        this.responseMsg = 'Error deleting Recipient';
      }
    },
  },
};
</script>
