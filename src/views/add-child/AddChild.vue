<template>
  <div id="add-child">
    <div class="header">
      学生信息
      <div class="back" @click="topStep">
        {{ step === 1 ? "首页" : "上一步" }}
        <div class="back-icon"></div>
      </div>
      <div class="save">保存</div>
    </div>
    <div class="step1" v-show="step === 1">
      <div class="info-box">
        <div class="item">
          <div class="name space">姓名</div>
          <div class="value">
            <input type="text" v-model="userName" @blur="blur" maxlength="15" />
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
          <div class="value" @click="selectAddress">
            <div class="icon"></div>
          </div>
        </div>
        <div class="address-info">
          <div class="domicile-address">
            <div class="item-name">{{ domicileAddress.province }}</div>
            <div class="item-name">{{ domicileAddress.city }}</div>
            <div class="item-name">{{ domicileAddress.town }}</div>
          </div>
          <input
            type="text"
            placeholder="详细地址：道路、门牌号、楼栋号、单元号"
            @blur="blur"
          />
        </div>
      </div>
      <div class="live-info">
        <div class="item">
          <div class="name">现居住小区</div>
          <div class="value">
            <div class="icon"></div>
          </div>
        </div>
        <div class="item">
          <div class="name">预报名学校</div>
          <div class="value"></div>
        </div>
      </div>
      <div class="old-school">
        <div class="item">
          <div class="name">幼儿园名称</div>
          <div class="value">
            <input type="text" placeholder="请填写幼儿园名称" @blur="blur" />
          </div>
        </div>
      </div>
    </div>
    <div class="step2" v-show="step === 2">
      <div class="parent-info">
        <div class="item">
          <div class="name">姓名</div>
          <div class="value">
            <input type="text" @blur="blur" />
          </div>
        </div>
        <div class="item">
          <div class="name">关系</div>
          <div class="value">
            <div class="icon"></div>
          </div>
        </div>
        <div class="item">
          <div class="name">身份证号</div>
          <div class="value">
            <input type="text" @blur="blur" />
          </div>
        </div>
        <div class="item">
          <div class="name">联系电话</div>
          <div class="value">
            <input type="number" @blur="blur" />
          </div>
        </div>
        <div class="item">
          <div class="name">工作单位</div>
          <div class="value">
            <input type="text" @blur="blur" />
          </div>
        </div>
      </div>
      <div class="parent-info">
        <div class="item">
          <div class="name">姓名</div>
          <div class="value">
            <input type="text" maxlength="10" @blur="blur" />
          </div>
        </div>
        <div class="item">
          <div class="name">关系</div>
          <div class="value">
            <div class="icon"></div>
          </div>
        </div>
        <div class="item">
          <div class="name">身份证号</div>
          <div class="value">
            <input type="text" @blur="blur" />
          </div>
        </div>
        <div class="item">
          <div class="name">联系电话</div>
          <div class="value">
            <input type="number" @blur="blur" />
          </div>
        </div>
        <div class="item">
          <div class="name">工作单位</div>
          <div class="value">
            <input type="text" @blur="blur" />
          </div>
        </div>
      </div>
    </div>
    <div class="step3" v-show="step === 3">
      <div class="has-house">
        <div class="title">是否有房产？</div>
        <div
          class="select-item"
          v-for="(item, index) in hasHouse"
          :key="index"
          @click="choseHasHouse(index)"
        >
          {{ item.name }}
          <div class="active" v-if="chosedHouseIndex === index"></div>
        </div>
      </div>
      <div class="house-property">
        <div class="item">
          <div class="name">房产性质</div>
          <div class="value">
            <div class="icon"></div>
          </div>
        </div>
        <div class="item">
          <div class="name">房产所有人</div>
          <div class="value">
            <input type="text" @blur="blur" />
          </div>
        </div>
        <div class="item">
          <div class="name">取得/购买时间</div>
          <div class="value" @click="choseGetHouseTime">
            {{ todate(getHouseTime) }}
          </div>
        </div>
      </div>
      <div class="house-number">
        <div class="item">
          <div class="name">房产登记号/房产发票号</div>
        </div>
        <div class="item">
          <input type="text" @blur="blur" />
        </div>
      </div>
    </div>
    <div class="step4" v-show="step === 4">
      <div class="special-circumstances">
        <div class="title">特殊情况</div>
        <div
          class="select-item"
          v-for="(item, index) in specialCircumstances"
          :key="index"
          @click="choseSpecial(index)"
        >
          {{ item.name }}
          <div class="active" v-if="chosedSpecialIndex === index"></div>
        </div>
      </div>
      <div class="other-info">
        <div class="item">
          <div class="name">其他备注</div>
        </div>
        <textarea placeholder="填写备注信息"></textarea>
      </div>
      <div class="commitment" style="margin-bottom:0">
        <div class="item">
          <div class="name">报名承诺书</div>
        </div>
        <div class="commit-text">
          本人承诺：如有弄虚作假，提供虚假材料的，一经发现，对其已入学子女作退学或转学处理，由此产生的不良影响，本人愿意承担一切后果
        </div>
      </div>
      <div class="accept" :class="accept ? 'chosed' : ''">
        <van-checkbox v-model="accept" shape="square"
          >我已阅读并接受</van-checkbox
        >
      </div>
      <div
        class="commit-button"
        :class="accept ? 'enable' : 'disable'"
        v-if="step === 4"
        @click="confirm"
      >
        提交（{{ step }}/4）
      </div>
      <van-popup v-model="isShowAffirm" round closeable>
        <div class="commit-affirm">
          <div class="text">
            预报名申请提交后信息
            <span style="color:#ff3636">不可修改</span
            >，请仔核对填报信息后提交！
          </div>
          <div class="buttons">
            <div class="canncel" @click="isShowAffirm = false">再想想</div>
            <div class="confirm">确认</div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="step-button" v-if="step !== 4" @click="nextStep">
      下一步（{{ step }}/4）
    </div>
    <address-matching
      :isShow="isAddress"
      @choseAddress="choseAddress"
      @closeAddress="closeAddress"
    ></address-matching>
    <div class="date-time" v-if="isShowPurchaseDate">
      <van-datetime-picker
        v-model="purchaseDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmPurchaseDate"
        @cancel="canncelPurchaseDate"
      />
    </div>
  </div>
</template>
<script>
import { blur, Todate } from "@/common/tool/tool";
import { Notify } from "vant";
import AddressMatching from "@/components/AddressMatching.vue";
export default {
  data() {
    return {
      isAddress: false,
      userName: "",
      idCard: "",
      step: 1,
      hasHouse: [
        {
          name: "是"
        },
        {
          name: "否"
        }
      ],
      specialCircumstances: [
        {
          name: "单亲家庭"
        },
        {
          name: "孤儿"
        },
        {
          name: "留守儿童"
        },
        {
          name: "双胞胎"
        },
        {
          name: "残疾"
        },
        {
          name: "其他"
        },
        {
          name: "无"
        }
      ],
      domicileAddress: {},
      accept: false,
      chosedSpecialIndex: 0,
      chosedHouseIndex: 0,
      getHouseTime: new Date(),
      purchaseDate: new Date(),
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(),
      isShowAffirm: false,
      isShowPurchaseDate: false
    };
  },
  methods: {
    choseGetHouseTime() {
      this.isShowPurchaseDate = true;
    },
    confirmPurchaseDate(date) {
      this.getHouseTime = this.todate(date);
      this.isShowPurchaseDate = false;
    },
    canncelPurchaseDate() {
      this.isShowPurchaseDate = false;
    },
    choseAddress(address) {
      this.isAddress = address.isShow;
      this.domicileAddress = address.chosedValue;
    },
    closeAddress() {
      this.isAddress = false;
    },
    selectAddress() {
      this.isAddress = true;
    },
    topStep() {
      if (this.step === 1) {
        this.$router.push({
          path: "/index"
        });
      } else {
        this.step--;
      }
    },
    todate(date) {
      return Todate(date);
    },
    // 选择是否有房产
    choseHasHouse(index) {
      this.chosedHouseIndex = index;
    },
    // 选择特殊情况
    choseSpecial(index) {
      this.chosedSpecialIndex = index;
    },
    // 提交
    confirm() {
      if (!this.accept) {
        Notify({ type: "warning", message: "请阅读并勾选承诺书!" });
        return;
      }
      this.isShowAffirm = true;
    },
    // 下一步
    nextStep() {
      this.step++;
    },
    blur() {
      blur();
    }
  },
  components: {
    AddressMatching
  }
};
</script>

<style lang="less" scoped>
#add-child {
  height: 100%;
  overflow-y: auto;
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
      letter-spacing: 0px;
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
    .save {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: #fff;
    }
  }
  .step1,
  .step2,
  .step3,
  .step4 {
    .info-box,
    .address-box,
    .live-info,
    .old-school,
    .parent-info,
    .has-house,
    .house-property,
    .house-number,
    .special-circumstances,
    .other-info,
    .commitment {
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
      }
      .value {
        color: #2d3748;
      }
    }
    .info-box {
      .item {
        .value {
          flex: 1;
          line-height: 40px;
          text-align: right;
          input {
            height: 100%;
            width: 90%;
            padding: 0;
            margin: 0;
            font-size: 14px;
            text-align: right;
          }
        }
      }
    }
    .address-box {
      .item {
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
        .domicile-address {
          .item-name {
            text-align: right;
            height: 25px;
            color: rgb(197, 195, 195);
          }
        }
        input {
          height: 35px;
          width: 100%;
        }
      }
    }
    .live-info {
      .item {
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
    }
    .old-school {
      .item {
        .value {
          flex: 1;
          line-height: 40px;
          text-align: right;
          input {
            height: 100%;
            width: 90%;
            padding: 0;
            margin: 0;
            font-size: 14px;
            text-align: right;
          }
        }
      }
    }
  }
  .step2 {
    .parent-info {
      .item {
        .value {
          flex: 1;
          line-height: 40px;
          text-align: right;
          input {
            height: 100%;
            width: 90%;
            padding: 0;
            margin: 0;
            font-size: 14px;
            text-align: right;
          }
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
    }
  }
  .step3 {
    .has-house {
      background-color: #fff;
      .title {
        height: 40px;
        border-bottom: 1px solid #efefef;
        line-height: 40px;
        padding-left: 5px;
        font-weight: bold;
        font-size: 14px;
        color: #222;
      }
      .select-item {
        height: 40px;
        border-bottom: 1px solid #efefef;
        font-size: 14px;
        line-height: 40px;
        padding-left: 15px;
        position: relative;
        .active {
          width: 16px;
          height: 16px;
          background: url("../../assets/image/green-chose.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .house-property {
      .item {
        .value {
          flex: 1;
          line-height: 40px;
          text-align: right;
          input {
            height: 100%;
            width: 90%;
            padding: 0;
            margin: 0;
            font-size: 14px;
            text-align: right;
          }
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
    }
    .house-number {
      .item {
        .name {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
  .step4 {
    .special-circumstances {
      background-color: #fff;
      .title {
        height: 40px;
        border-bottom: 1px solid #efefef;
        line-height: 40px;
        padding-left: 5px;
        font-weight: bold;
        font-size: 14px;
        color: #222;
      }
      .select-item {
        height: 40px;
        border-bottom: 1px solid #efefef;
        font-size: 14px;
        line-height: 40px;
        padding-left: 15px;
        position: relative;
        .active {
          width: 16px;
          height: 16px;
          background: url("../../assets/image/green-chose.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .other-info {
      textarea {
        width: 100%;
        height: 100px;
        resize: none;
        padding-left: 5px;
        border: none;
      }
    }
    .commitment {
      .commit-text {
        padding: 10px 0;
        width: 100%;
      }
    }
    .accept {
      height: 40px;
      border-top: 1px solid #efefef;
      border-bottom: 1px solid #efefef;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/.van-checkbox .van-checkbox__label {
        color: #a0aec0 !important;
      }
    }
    .chosed {
      background-color: #64b3ed;
      color: #fff;
      /deep/.van-checkbox .van-checkbox__label {
        color: #fff !important;
      }
    }
    .commit-button {
      width: 280px;
      height: 40px;
      border-radius: 20px;
      margin: 20px auto;
      line-height: 40px;
      text-align: center;
      color: #fff;
    }
    .enable {
      background-color: #64b3ed;
    }
    .disable {
      background-color: #cbd5e0;
    }
    .commit-affirm {
      width: 260px;
      height: 110px;
      font-weight: 500;
      font-size: 14px;
      .text {
        margin-top: 50px;
        padding: 0 15px;
      }
      .buttons {
        height: 40px;
        display: flex;
        border-top: 1px solid #cbd5e0;
        margin-top: 30px;
        .canncel {
          flex: 1;
          border-right: 1px solid #cbd5e0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #a0aec0;
        }
        .confirm {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #4299e1;
        }
      }
    }
  }
  .step-button {
    width: 280px;
    height: 40px;
    background-color: #64b3ed;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
  .date-time {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
