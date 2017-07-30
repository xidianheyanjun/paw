<template>
<div class="help-info">
    <div class="help-hd">
        帮办热线
        <span class="tel">8008000</span>
    </div>
    <div class="help-bd">
        <span class="title">惠银帮办：</span>
        提供合理方案，快速沟通银行<br>
        全程传递资料 助您轻松解决贷款难题
    </div>

</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'serviceHelp',
    computed: mapGetters([]),
    components: {},
    data(){
        return {

        }
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
                title: "惠银帮办",
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

    }
}
</script>
<style scoped>
.help-info {
    display: absolute;
    margin: 50% auto;
    width: 240px;
    height: 100%;
}
.help-hd {
    font-size: 28px;
    color: #374760;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 2px solid #374760;
}
.help-bd {
    font-size: 13px;
    line-height: 16px;
}
.help-hd .tel,
.help-bd .title {
    color: #ff4081;
}
</style>