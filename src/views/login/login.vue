<template>
    <div class="login-page">
        <el-form :model="form" ref="form" :rules="rules" size="large">
            <el-form-item label="">
                <h3>系统登录</h3>
            </el-form-item>
            <el-form-item label="" prop="user">
                <el-input v-model="form.user" placeholder="请输入账号"
                    prefix-icon="el-icon-user">
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" 
                    show-password prefix-icon="el-icon-lock" @keyup.native.enter="onSubmit">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登&nbsp;录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                user: 'admin',
                password: '123456'
            },
            rules: {
                user: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return false;
                }
                let data = {
                    token: 'PC-1234567890',
                    userInfo: {
                        id: 123456,
                        name: 'admin'
                    }
                }
                this.$store.commit('LOGIN', data);
                // 获取并设置动态路由
                this.$store.dispatch('getMenuList').then(res => {
                    this.$router.push('/index');
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-page{
        min-height: 100%;
        background: #384655;
    }
    .el-form{
        width: 380px;
        margin: 0 auto;
        padding-top: 12.5%;
        padding-bottom: 10px;
        color: #fff;
        h3{
            margin-bottom: 10px;
            font-size: 24px;
            text-align: center;
        }
        .el-button{
            width: 100%;
        }
        /deep/ .el-input__icon{
            font-size: 16px;
        }
    }
    @media screen and (max-width: 1400px) {
        .el-form{
            padding-top: 10%;
        }
    }
</style>