<template>
  <div id="add-child">
    <div class="header">学生信息</div>
    <div class="step1">
      <div class="info-box">
        <div class="item">
          <div class="name space">姓名</div>
          <div class="value">
            <input type="text" v-model="userName" @blur="blur" />
          </div>
        </div>
        <div class="item">
          <div class="name">身份证号</div>
          <div class="value">
            <input type="text" v-model="idCard" @blur="blur" />
          </div>
        </div>
      </div>
      <div class="address-box">
        <div class="item">
          <div class="name">户口所在地</div>
          <div class="value">
            <div class="icon"></div>
          </div>
        </div>
        <div class="address-info">
          <input
            type="text"
            placeholder="详细地址：道路、门牌号、楼栋号、单元号"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { blur } from "@/common/tool/tool";
export default {
  data() {
    return {
      userName: "",
      idCard: ""
    };
  },
  methods: {
    blur() {
      blur();
    }
  }
};
</script>

<style lang="less" scoped>
#add-child {
  height: 100%;
  background-color: #eee;
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
  .step1 {
    .info-box {
      margin-bottom: 10px;
      background-color: #fff;
      padding: 0 10px;
      .item {
        height: 40px;
        border-bottom: 1px solid #efefef;
        display: flex;
        position: relative;
        .name {
          width: 100px;
          text-align: left;
          line-height: 40px;
          font-size: 14px;
          font-weight: bold;
          color: #222;
        }
        .space {
          letter-spacing: 25px;
          // text-indent: 25px;
        }
        .value {
          flex: 1;
          line-height: 40px;
          text-align: right;
          input {
            height: 100%;
            width: 80%;
            padding: 0;
            margin: 0;
            font-size: 14px;
            text-align: right;
          }
        }
      }
    }
    .address-box {
      background-color: #fff;
      padding: 0 10px;
      .item {
        height: 40px;
        border-bottom: 1px solid #efefef;
        display: flex;
        position: relative;
        background-color: #fff;
        .name {
          width: 100px;
          text-align: left;
          line-height: 40px;
          font-size: 14px;
          font-weight: bold;
          color: #222;
        }
        .value {
          flex: 1;
          line-height: 40px;
          text-align: right;
          .icon {
            width: 8px;
            height: 14px;
            background: url("../../assets/image/address-icon.png") no-repeat;
            background-size: 100% 100%;
            float: right;
            margin-top: 13px;
          }
        }
      }
      .address-info {
        height: 110px;
        input {
          width: 100%;
        }
      }
    }
  }
}
</style>
