<template>
  <div id="map" class="map">
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'map',
    computed: mapGetters([]),
    components: {},
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: null
        },
        center: {
          img: "",
          title: "地图",
          callback: null
        },
        right: {
          img: "",
          title: "地图",
          callback: function () {
          }
        }
      });

      console.log("create map");
      let map = new AMap.Map('map', {
        resizeEnable: true
      });

      map.plugin(["AMap.Geolocation"], function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 100000,          //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: 'RB'
        });
        console.log(geolocation);
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'error', function (err) {
          console.log(err);
        });
        AMap.event.addListener(geolocation, 'complete', function (result) {
          console.log(result);
          AMap.service(['AMap.PlaceSearch', 'AMap.Walking'], function () {//回调函数
            let placeSearch = new AMap.PlaceSearch({
              pageSize: 5,
              pageIndex: 1,
              city: result.city, //城市
              map: map,
              panel: ""
            });

            placeSearch.searchNearBy('银行', new AMap.LngLat(result.position.getLng(), result.position.getLat()), 5000, function (statusSearch, resultSearch) {
              console.log(statusSearch, resultSearch);

              let walking = new AMap.Walking({
                map: map,
                panel: ""
              });

              console.log("search location");
              walking.search(new AMap.LngLat(result.position.getLng(), result.position.getLat()), new AMap.LngLat(resultSearch.poiList.pois[0].location.lng, resultSearch.poiList.pois[0].location.lat));
            });
          });
        });
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
