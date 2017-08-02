<template>
<div class="info">
    <div class="info-hd">服务与反馈</div>
    <div class="info-bd">
      服务与反馈服务与反馈服务与反馈服务与反馈服务与反馈服务与反馈服务与反馈服务与反馈服务与反馈
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'personHelp',
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
                window.location.href = "#/service/zx";
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
    font-size: 14px;
    color: #374760;
    margin-bottom: 10px;
    text-align: center;
}
.info-bd {
    font-size: 12px;
    line-height: 18px;
    text-indent: 2em;
}
</style>