<template>
  <div class="modal" v-if="isShow">
    <div class="loading" v-if="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <div class="city-list">
      <div class="city-top">
        选择地区
        <div class="icon-close" @click="closeHouseEstate"></div>
      </div>
      <div class="select-province" v-show="isShowStreetList">
        <div class="select-title">选择街道</div>
        <scroll class="wrapper1">
          <ul>
            <li v-for="(item, index) in streetList" :key="index">
              <div class="province" @click="choseStreet(item)">
                <div class="label" style="width:0"></div>
                <div class="name">{{ item.streetName }}</div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
      <div class="selected" v-show="isShowCity">
        <span class="selected-area" @click="selectCity">{{
          selectAddress.chosedProvince
        }}</span>
        <span class="selectCityButton">选择社区</span>
      </div>
      <div class="select-street" v-if="isShowCity">
        <scroll class="wrapper2">
          <ul>
            <li v-for="(item, index) in cityList" :key="index">
              <div class="city" @click="choseCity(item)">
                <div class="label" style="width:0"></div>
                <div class="name">{{ item.name }}</div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
      <div class="selected" v-show="isShowTown">
        <span class="selected-area" @click="selectCity">{{
          selectAddress.chosedProvince
        }}</span>
        <span class="selected-street" @click="selectNTStreet">{{
          selectAddress.chosedCity
        }}</span>
        <span class="selectCityButton">选择小区</span>
      </div>
      <div class="select-area" v-if="isShowTown">
        <scroll class="wrapper3">
          <ul>
            <li v-for="(item, index) in townList" :key="index">
              <div class="city" @click="choseTown(item)">
                <div class="label" style="width:0"></div>
                <div class="name">{{ item.name }}</div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
import Scroll from "@/components/Scroll";
export default {
  props: ["isShow"],
  data() {
    return {
      loading: false,
      isShowStreetList: true,
      isShowCity: false,
      isShowTown: false,
      streetList: [],
      selectAddress: {
        chosedProvince: "",
        chosedCity: "",
        chosedTown: ""
      },
      cityList: [],
      townList: []
    };
  },
  created() {},
  mounted() {
    var vm = this;
    //获取街道
    vm.loading = true;
    http.get(api.GETSTREETLIST, {}, this).then(resp => {
      vm.loading = false;
      vm.streetList = resp.data.data;
    });
  },
  methods: {
    closeHouseEstate() {
      this.$emit("closeHouse", {
        isShow: false
      });
    },
    // 选择区
    choseStreet(item) {
      var vm = this;
      vm.loading = true;
      http
        .get(
          api.GETCOMMUNITYLIST,
          {
            streetID: item.streetID
          },
          this
        )
        .then(resp => {
          vm.loading = false;
          vm.cityList = resp.data.data;
          vm.selectAddress.chosedProvince = item.streetName;
          vm.isShowStreetList = false;
          vm.isShowCity = true;
          vm.isShowTown = false;
        });
    },
    selectCity() {
      this.isShowStreetList = true;
      this.isShowCity = false;
      this.isShowTown = false;
      this.selectAddress.chosedProvince = "";
      this.selectAddress.chosedCity = "";
      this.selectAddress.chosedTown = "";
    },
    selectNTStreet() {
      this.isShowStreetList = false;
      this.isShowCity = true;
      this.isShowTown = false;
      this.selectAddress.chosedCity = "";
      this.selectAddress.chosedTown = "";
    },
    // 获取小区
    choseCity(item) {
      let vm = this;
      vm.isShowStreetList = false;
      vm.isShowCity = false;
      vm.loading = true;
      http
        .get(
          api.GETSMALLCOMMUNITYBYCOMMUNITYID,
          {
            communityID: item.id
          },
          this
        )
        .then(resp => {
          vm.loading = false;
          if (resp.data.data.length > 0) {
            vm.isShowTown = true;
            vm.townList = resp.data.data;
            vm.selectAddress.chosedCity = item.name;
          } else {
            vm.selectAddress.chosedCity = item.name;
            vm.selectAddress.chosedTown = item.name;
            this.$emit("choseHouse", {
              isShow: false,
              chosedValue: {
                houseEstate: this.selectAddress.chosedTown,
                id: item.id
              }
            });
            this.selectCity();
          }
        });
    },
    choseTown(item) {
      this.selectAddress.chosedTown = item.name;
      this.$emit("choseHouse", {
        isShow: false,
        chosedValue: {
          houseEstate: this.selectAddress.chosedTown,
          id: item.id
        }
      });
      this.selectCity();
    }
  },
  components: {
    Scroll
  }
};
</script>
<style lang="less" scoped>
.modal {
  width: 100%;
  height: 100%;
  background-color: rgba(59, 58, 58, 0.623);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1999;
  }
  .city-list {
    width: 100%;
    height: 70%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    .city-top {
      height: 45px;
      width: 100%;
      text-align: center;
      font-size: 15px;
      line-height: 45px;
      position: absolute;
      background-color: #fff;
      left: 0;
      top: 0;
      .icon-close {
        width: 20px;
        height: 20px;
        background: url("../assets/image/icon-close.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .select-province,
    .select-street,
    .select-area {
      height: 100vh;
      box-sizing: border-box;
      .wrapper1 {
        height: 400px;
        overflow: hidden;
      }
      .wrapper2 {
        height: 400px;
        overflow: hidden;
      }
      .wrapper3 {
        height: 400px;
        overflow: hidden;
      }
      .wrapper1,
      .wrapper2,
      .wrapper3 {
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            .province,
            .city,
            .area {
              height: 30px;
              line-height: 30px;
              display: flex;
              .label {
                width: 20px;
                text-align: center;
                margin-left: 15px;
                font-size: 14px;
                color: rgb(199, 197, 197);
              }
              .name {
                font-size: 14px;
                padding-left: 15px;
              }
            }
          }
          li:last-child {
            padding-bottom: 70px;
          }
        }
      }
      .select-title {
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        padding-left: 20px;
        color: rgb(199, 197, 197);
      }
    }
    .select-province {
      padding-top: 45px;
    }
    .select-street,
    .select-area {
      padding-top: 75px;
    }
    .selected {
      height: 30px;
      width: 100%;
      line-height: 35px;
      position: absolute;
      background-color: #fff;
      left: 0;
      top: 45px;
      .selected-area,
      .selected-street,
      .selectCityButton,
      .selectedCityButton {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 12.5px;
        background-color: #eee;
        font-size: 12px;
        padding: 1px 10px;
        margin-left: 20px;
        letter-spacing: 1px;
      }
      .selectCityButton {
        color: #2e55d6;
      }
    }
  }
}
</style>
