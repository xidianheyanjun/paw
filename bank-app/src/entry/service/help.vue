<template>
<div>
    

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

</style>