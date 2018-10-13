<template>
    <div class="login-container">
        <div class="login-border">
            <!-- banner -->
            <i class="bannerimg"></i>
            <!-- 表单 -->
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="login-form">
                <div class="title">智能财务决策支持系统V5.0</div>
                <P>用户名</P>
                <el-form-item prop="email">
                    <el-input v-model="loginUser.email" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <P>公司</P>
                <el-form-item prop="email">
                    <el-input v-model="loginUser.email" placeholder="请选择公司"></el-input>
                </el-form-item>
                <P>密码</P>
                <el-form-item prop="password">
                    <!-- 绑定一个keyup事件,实现按回车能模拟点击按钮,触发登陆 -->
                    <el-input :type="pwdType" v-model="loginUser.password" placeholder="请输入密码" @keyup.enter.native="submitForm('loginForm')"></el-input>
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon icon-class="eye" />
                    </span>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" style="width:100%;" @click="submitForm('loginForm')">登陆</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号?现在<router-link to='register'>注册</router-link>
                    </p>
                </div>

            </el-form>
        </div>

    </div>

</template>

<script>
    import loginMothod from '../../../utils/login.js'
    export default {
        name: 'Login',
        data() {
            return {
                 pwdType: 'password',
                loginUser: {
                    email: "",
                    password: "",
                },
                rules: {
                    email: [{
                        type: "email",
                        required: true,
                        message: "邮箱格式不正确",
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    }, {
                        min: 6,
                        max: 30,
                        message: "长度在6到30之间",
                        trigger: "blur"
                    }]
                }
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        return loginMothod.submit(this.loginUser)
                    }
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    /* .login {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .bg {
        background: url(~@a/loginpic.jpg);
        height: 100%;
        width: 100%;
    }

    .bg-blur {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .form_container {
        width: 370px;
        height: 21px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10 px #cccc;
    }

    .sumbmit_btn {
        width: 100%;
    }

 

    .tiparea p a {
        color: #409eff;
    } */
</style>