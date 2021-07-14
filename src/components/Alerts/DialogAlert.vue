<template>
  <custom-dialog :show.sync="dialog" :width="width">
    <template v-slot:body>
      <custom-card :title="title" center-title>
        <template v-slot:body>
        <span>
          {{msg}}
        </span>
        </template>

        <template v-slot:actions>
          <v-btn
            :disabled="isLoading"
            :color="cancelBtnColor"
            @click="cancel"
            class="mx-4 px-5 my-1"
            rounded
            small
            outlined
            depressed
          >
            <span>{{ cancelBtnTitle }}</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            :color="okBtnColor"
            @click="accept"
            depressed
            class="mx-4 px-5 my-1"
            rounded
            width="150"
            type="submit"
            small
          >
            <strong>
              <span>{{ okBtnTitle }}</span>
            </strong>
          </v-btn>
        </template>
      </custom-card>
    </template>
  </custom-dialog>
</template>
<script>
  import CustomCard from "../Cards/CustomCard";
  import CustomDialog from "../Dialogs/CustomDialog";
  export default {
    name: "DialogAlert",
    components: {CustomDialog, CustomCard},
    props: {
      title: {
        type: String,
        default: ""
      },
      msg: {
        type: String,
      },
      okBtnTitle: {
        type: String,
        default: "Proceed"
      },
      okBtnColor: {
        type: String,
        default: "accent darken-3"
      },
      cancelBtnTitle: {
        type: String,
        default: "Discard"
      },
      cancelBtnColor: {
        type: String,
        default: "primary lighten-2"
      },
      show: {
        type: Boolean,
        default: false
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: "350"
      }
    },
    methods: {
      accept() {
        this.$emit("accept");
      },
      cancel() {
        this.$emit("cancel");
      }
    },

    data() {
      return {
        dialog: this.show
      }
    },

    watch: {
      show: function (value) {
        this.dialog = value;
      },
      dialog: function () {
        this.$emit('update:show', this.dialog);
      },
    }
  }
</script>
