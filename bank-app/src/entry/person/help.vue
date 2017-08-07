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
<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';

</style>