<template>
  <v-card :loading="cardLoading" :disabled="disabled">
    <v-card-title>
      <v-row justify="space-between">
        <v-col class="justify-start align-center my-2" cols="10">
          <slot name="header">
            <v-icon v-if="icon" class="flex-unset">{{ icon }}</v-icon>&nbsp;
            <p>
              {{ title }}
            </p>
          </slot>
        </v-col>
        <v-col class="align-center my-2" cols="2">
          <slot name="header-button">
            <v-btn
              v-if="headerButton"
              :loading="btnLoading || cardLoading"
              :disabled="btnLoading || cardLoading"
              depressed
              :color="btnColor"
              class="flex-unset ma-0"
              @click="$emit('header-button-click')"
            >{{ headerButton }}
            </v-btn>
          </slot>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <slot name="body"/>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "CustomCard",
    props: {
      title: {type: String, default: ''},
      icon: {type: String},
      headerButton: {},
      btnLoading: {type: Boolean, default: false},
      cardLoading: {type: Boolean, default: false},
      btnColor: {type: String, default: 'primary'},
      disabled: {type: Boolean, default: false},
    }
  }
</script>

<style scoped>

</style>
