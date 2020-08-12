<template>
  <div class="register-form">
    <mu-dialog
      title="登录"
      width="500"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-form ref="form" :model="validateForm">
        <mu-form-item label="邮箱/昵称" prop="email" :rules="emailRules">
          <mu-text-field v-model="validateForm.email" prop="email"></mu-text-field>
        </mu-form-item>

        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>

      </mu-form>

      <mu-button slot="actions" flat small @click="clear">取消</mu-button>
      <mu-button slot="actions" flat small color="primary" @click="submit">登录</mu-button>

    </mu-dialog>
  </div>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    close() {
      this.open = false;
    },
    ok() {
      this.close();
    }
  },
  data() {
    return {
      emailRules: [{ validate: val => !!val, message: "邮箱/昵称必填！" }],
      passwordRules: [{ validate: val => !!val, message: "密码必填！" }],
      validateForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
        if (result) {
          this.$emit("toggle", false);
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        email: "",
        nickName: "",
        password: "",
        confirmPassword: "",
        introduction: ""
      };
      this.$emit("toggle", false);
    }
  }
};
</script>
<style lang="less" scoped>
</style>