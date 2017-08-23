<template>
  <div id="map" class="map">
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  let HYMap = {};
  const MAP_SEARCH_RADIUS = 5000;
  export default {
    name: 'map',
    computed: mapGetters([
      'gdmap'
    ]),
    components: {},
    mounted(){
      let self = this;
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
          title: "地图",
          callback: null
        }
        // right: {
        //   img: "",
        //   title: "地图",
        //   callback: function () {
        //   }
        // }
      });
      this.userLocation = this.gdmap.userLocation;
      this.nearbank = this.gdmap.nearbank;
      this.initMap();

    },
    methods: {
      initMap() {
        console.log("create map");
        if (!AMap) {
          return;
        }
        HYMap = new AMap.Map('map', {
          resizeEnable: true
        });
        console.log('userLocation', this.userLocation)
        console.log('nearbank', this.nearbank)
        if (!this.userLocation.position) {
          this.geolocationUserLocation();
          return;
        }
        if (!this.nearbank.pois.length) {
          this.placeSearchMap(this.userLocation);
          return;
        }
        
        let lat = this.$route.query['lat'];
        let lng = this.$route.query['lng'];
        if (lat) {
          this.walkingMap(this.userLocation, {
            lat,
            lng
          });
        } else if (this.userLocation.position) {
          this.placeSearchMap(this.userLocation);
        }
      },
      geolocationUserLocation() {
        console.log('geolocationUserLocation start');
        let self = this;
        HYMap.plugin(['AMap.Geolocation'], function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 100000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB',
            map: HYMap
          });
          console.log('AMap.Geolocation:', geolocation);
          HYMap.addControl(geolocation);
          geolocation.getCurrentPosition();

          AMap.event.addListener(geolocation, 'error', function (err) {
            console.log('AMap.Geolocation err:', err);
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '无法获取您的位置，请确保打开了定位'
            });
            self.$emit('fetchMapNearbanks', err.message);
            return;
          });

          AMap.event.addListener(geolocation, 'complete', function (result) {
            console.log('AMap.Geolocation complete', result);
            self.$store.dispatch('gdmap_setUserLocation', result);
            self.placeSearchMap(result);
          });
        });
      },
      placeSearchMap(result) {
        console.log('placeSearchMap start', result);
        let self = this;
        AMap.service(['AMap.PlaceSearch'], function () {//回调函数
          let placeSearch = new AMap.PlaceSearch({
            pageSize: 100, // 一次性查找的个数最多只能限制50个？？
            pageIndex: 1,
            city: result.city,
            map: HYMap,
            panel: ''
          });
          placeSearch.searchNearBy('银行', new AMap.LngLat(result.position.getLng(), result.position.getLat()), MAP_SEARCH_RADIUS, function (statusSearch, resultSearch) {
            console.log('statusSearch:', statusSearch); // 无结果返回'no_data'
            console.log('resultSearch:', resultSearch);
            if (!resultSearch.poiList) {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: '暂无搜索到您五公里内的银行'
              });
            }
            self.$store.dispatch('gdmap_setNearbank', resultSearch.poiList || {
              count: 0,
              pois: []
            });
            self.$emit('fetchMapNearbanks', resultSearch.poiList || statusSearch);
            // self.walkingMap(result, resultSearch.poiList.pois[0]);// 定位最近的一个银行
          });
        });
      },
      walkingMap(result, resultSearchPoi) {
        console.log('walkingMap start');
        console.log('userLocation:', result);
        console.log('resultSearchPoi:', resultSearchPoi);
        AMap.service(['AMap.Walking'], function () {
          let walking = new AMap.Walking({
            map: HYMap,
            panel: ''
          });
          walking.search(
            new AMap.LngLat(result.position.getLng(), result.position.getLat()),
            new AMap.LngLat(resultSearchPoi.lng, resultSearchPoi.lat)
          );
        });
      }
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
