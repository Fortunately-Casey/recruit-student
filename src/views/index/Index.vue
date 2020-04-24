<template>
  <div id="index">
    <div class="header">
      首页
      <div class="back" @click="goBack">
        返回
        <div class="back-icon"></div>
      </div>
      <!-- <span class="qrcode" @click="isShowQrcode = true">打卡二维码</span> -->
    </div>
    <div class="children-list" v-if="isReloadList">
      <div v-for="(item, index) in childList" :key="index" @click="goToDetail(item)">
        <left-slider :index="index" @deleteItem="deleteItem(item)" :ref="item.rowNumber">
          <div class="item">
            <div class="number">
              <div class="name">预报名码</div>
              <div class="number-code">{{ item.forecastCode }}</div>
            </div>
            <div class="info">
              <div class="info-logo">
                <div class="logo"></div>
              </div>
              <div class="values">
                <div class="child-name">{{ item.name }}</div>
                <div class="idCard">{{ item.idCard }}</div>
              </div>
            </div>
          </div>
        </left-slider>
      </div>
    </div>
    <div class="apply-button" @click="addNewApply">添加新申请</div>
  </div>
</template>
<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
import { Indicator } from "mint-ui";
import LeftSlider from "@/components/LeftSlider";
import { Notify, Dialog } from "vant";
export default {
  data() {
    return {
      childList: [],
      isReloadList: true
    };
  },
  created() {
    this.getStudentByAdmissionID();
  },
  methods: {
    getStudentByAdmissionID() {
      Indicator.open();
      http.get(api.GETSTUDENTBYADMISSIONID).then(resp => {
        Indicator.close();
        this.childList = resp.data.data;
      });
    },
    addNewApply() {
      this.$router.push({
        path: "/addChild"
      });
    },
    goToDetail(item) {
      this.$router.push({
        path: "/addChild",
        query: {
          id: item.id
        }
      });
    },
    deleteItem(item) {
      if (item.forecastCode) {
        Notify({ type: "danger", message: "提交后的子女信息不可删除" });
        return;
      }
      let vm = this;
      Dialog.confirm({
        title: "删除",
        message: "确认删除该子女信息"
      })
        .then(() => {
          http
            .delete(api.DELETESTUDENTBYID, {
              studentID: item.id
            })
            .then(resp => {
              if (resp.data.success) {
                Notify({
                  type: "success",
                  message: "保存成功"
                });
                vm.isReloadList = false;
                vm.getStudentByAdmissionID();
                vm.isReloadList = true;
              } else {
                Notify({ type: "warning", message: resp.data.message });
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    goBack() {
      this.$router.push({
        path: "/login"
      });
    }
  },
  components: {
    LeftSlider
  }
};
</script>
<style lang="less" scoped>
#index {
  height: 100%;
  background-color: #eee;
  position: relative;
  .header {
    height: 40px;
    background-color: #4398e0;
    color: #fff;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    letter-spacing: 10px;
    text-indent: 10px;
    position: relative;
    .back {
      width: 60px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      .back-icon {
        width: 8px;
        height: 13px;
        background: url("../../assets/image/back-icon.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .qrcode {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: #fff;
    }
  }
  .children-list {
    .item {
      height: 100px;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      margin-bottom: 10px;
      .number {
        height: 35px;
        border-bottom: 1px solid #ddd;
        display: flex;
        line-height: 35px;
        .name {
          width: 200px;
          font-size: 14px;
          font-weight: 500;
        }
        .number-code {
          flex: 1;
          font-size: 13px;
          color: #64b3ed;
          text-align: right;
          font-weight: bold;
        }
      }
      .info {
        height: 65px;
        display: flex;
        .info-logo {
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          .logo {
            width: 52px;
            height: 40px;
            background: url("../../assets/image/apply-logo.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .values {
          flex: 1;
          display: flex;
          flex-direction: column;
          .child-name,
          .idCard {
            display: flex;
            flex: 1;
            align-items: center;
            font-size: 14px;
          }
        }
      }
    }
  }
  .apply-button {
    width: 280px;
    height: 40px;
    border-radius: 20px;
    background-color: #64b3ed;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    font-weight: bold;
  }
}
</style>
