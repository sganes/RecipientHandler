<template>
  <v-form v-model="isValid">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="firstName"
            label="First Name"
            required
            :rules="[(v) => !!v || 'First name is required']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="lastName"
            label="Last Name"
            required
            :rules="[(v) => !!v || 'Last name is required']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="country"
            label="Country"
            :rules="[(v) => !!v || 'Country is required']"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn block :disabled="!isValid" @click="addRecipients">
        Add Recipient
      </v-btn>
      <!-- <p>{{this.responseMsg}}</p> -->
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Address',
  props: {
    msg: String,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      isValid: true,
      responseMsg: '',
    };
  },
  methods: {
    async addRecipients() {
      const response = await fetch('/api/recipients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            country: this.country,
          },
        }),
      });
      if (response.status === 200) {
        this.responseMsg = 'Recipient added successfully';
        this.formClear();
      } else {
        this.responseMsg = 'Error adding Recipient';
      }
    },
    formClear() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.country = '';
    },
  },
};
</script>
