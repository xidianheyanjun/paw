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
<style scoped>
.info {
  box-sizing: border-box;
  padding: 8%;
  height: 100%;
}
.info-hd {
    font-size: 16px;
    color: #374760;
    margin-bottom: 10px;
}
.info-bd {
    font-size: 15px;
    line-height: 26px;
    text-indent: 2em;
}
</style>