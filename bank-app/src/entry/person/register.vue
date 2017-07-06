<template>
    <div class="paper">
        <div class="form">
            <mu-text-field label="手机号码" v-model="account" hintText="" type="number" max="11" :errorText="accountError"/>
            <mu-text-field label="密码" v-model="password" hintText="(6-16位字符)" type="password" :minLength="6" :maxLength="16" :errorText="passwordError"/>
            <mu-text-field label="再次输入密码" v-model="password2" hintText="(6-16位字符)" type="password" :minLength="6" :maxLength="16" :errorText="passwordError2"/>
            <mu-raised-button label="立即注册" class="register-btn" @click="register" primary fullWidth/>
        </div>
        <mu-toast class="vv-toast" v-if="toast" message="注册成功"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'personRegister',
    computed: mapGetters([]),
    data() {
        return {
            account: '',
            accountError: '',
            password: '',
            passwordError: '',
            password2: '',
            passwordError2: '',
            toast: false
        };
    },
    mounted() {
        this.$store.dispatch("head_setHead", {
            left: {
                img: "",
                title: "返回",
                callback: function () {
                    window.location.href = "#/home/index";
                }
            },
            center: {
                img: "",
                title: "注册",
                callback: null
            },
            right: {
                img: "",
                title: "地图",
                callback: function () {
                    window.location.href = "#/common/map";
                }
            }
        });
    },
    methods: {
        register() {
            let self = this;
            if (!self.account.length) {
                self.accountError = '手机号不能为空';
                return;
            }
            if (!self.password.length) {
                self.passwordError = '密码不能为空';
                return;
            }
            console.log(self.password)
            console.log(self.password2)
            if (self.password != self.password2) {
                self.passwordError2 = '两次输入的密码不一致';
                return;
            }

            self.$sendRequest({
                url: "/user/register",
                params: {
                    account: self.account,
                    password: self.password
                },
                success(body){
                    if (body.code === 'success') {
                        self.$store.dispatch("updateName", self.account);
                        
                        self.toast = true;
                        if (self.toastTimer) {
                            clearTimeout(self.toastTimer);
                        }
                        self.toastTimer = setTimeout(() => { self.toast = false }, 2000);
                    }
                    
                },
                error(err){
                }
            });
        },

    }
}
</script>
<style scoped>
.paper {
    display: block;
    width: 100%;
    height: 100%;
    // background-color: #f0f0f0;
}
.form{
    padding:0 5% 10%;
}
.register-btn{
    margin:5% 0;
}
.vv-toast{
    text-align:center;
}
</style>