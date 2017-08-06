<template>
<div class="info">
    <div class="info-hd">条款一</div>
    <div class="info-bd">
      服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款服务条款
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'serviceZXInfo',
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
                    history.back(-1);
                }
            },
            center: {
                img: "",
                title: "服务条款",
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
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.info {
  box-sizing: border-box;
  padding: $spacing;
  height: 100%;
}
.info-hd {
    font-size: $fontSize;
    color: $fontColor;
    margin-bottom: 10px;
}
.info-bd {
    font-size: $fontSizeTitle;
    line-height: 26px;
    text-indent: 2em;
    // color: $fontColor2;
}
</style>