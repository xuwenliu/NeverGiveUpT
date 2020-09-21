<template>
  <div class="register-form">
    <mu-dialog
      title="登录"
      width="500"
      max-width="90%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-form ref="form" :model="validateForm">
        <mu-form-item label="邮箱/昵称" prop="email" :rules="emailRules">
          <mu-text-field v-model.trim="validateForm.email" prop="email"></mu-text-field>
        </mu-form-item>

        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field v-model.trim="validateForm.password" type="password" prop="password"></mu-text-field>
        </mu-form-item>

        <mu-form-item label="验证码" prop="captcha" :rules="captchaRules">
          <mu-text-field v-model.trim="validateForm.captcha" prop="captcha">
            <div @click="getCaptcha" class="captcha" v-html="captcha"></div>
          </mu-text-field>
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
      captcha: "",
      emailRules: [{ validate: val => !!val, message: "邮箱/昵称必填！" }],
      passwordRules: [{ validate: val => !!val, message: "密码必填！" }],
      captchaRules: [{ validate: val => !!val, message: "请输入验证码" }],
      validateForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async getCaptcha() {
      const res = await this.$axios.get("/captcha");
      if (res) {
        this.captcha = res.data;
      }
    },
    submit() {
      this.$refs.form.validate().then(async result => {
        if (result) {
          const res = await this.$axios.post("/login", this.validateForm);
          if (res.data) {
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$toast.success("登录成功");
            location.reload();
            this.$emit("toggle", false);
          } else {
            this.$toast.error(res.msg);
            this.getCaptcha();
          }
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
        introduction: "",
        captcha: ""
      };
      this.$emit("toggle", false);
    }
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.getCaptcha();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.captcha {
  cursor: pointer;
  /deep/ svg {
    vertical-align: middle;
  }
}
</style>