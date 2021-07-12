<template>
  <v-card :loading="cardLoading" :disabled="disabled" elevation="5">
    <v-card-title class="my-0 py-0 font-weight-bold">
      <v-row justify="space-between">
        <v-col class="justify-start align-center" :cols="!headerButton ? 12 : 10">
          <slot name="header">
            <v-icon v-if="icon" class="flex-unset">{{ icon }}</v-icon>&nbsp;
            <p :class="{'text-center': centerTitle && !headerButton}">
              {{ title }}
            </p>
          </slot>
        </v-col>
        <v-col class="align-center my-2" cols="2" v-if="headerButton">
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
    <v-divider v-if="title" class="mb-2" />
    <v-card-text>
      <slot name="body"/>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "CustomCard",
    props: {
      title: {type: String, default: ''},
      icon: {type: String},
      headerButton: {},
      centerTitle: {type: Boolean, default: false},
      btnLoading: {type: Boolean, default: false},
      cardLoading: {type: Boolean, default: false},
      btnColor: {type: String, default: 'primary'},
      disabled: {type: Boolean, default: false},
    }
  }
</script>

<style scoped>

</style>
