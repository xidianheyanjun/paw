<template>
    <div>
    </div>
</template>
<script>
export default {
    name: 'loan',
    data(){
        return {

        }
    },
    mounted() {
        // 如果有携带参数则设置参数
        // this.pageType = this.$route.params["id"] || "company";
        this.$store.dispatch("head_setHead", {
            left: {
                img: "",
                title: "返回",
                callback: function () {
                window.location.href = "#/product/loan/index";
                }
            },
            center: {
                img: "",
                title: "贷款产品",
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
    }
}
</script>
<style scoped>
</style>