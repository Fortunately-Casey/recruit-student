<template>
  <div id="add-child" :style="{ height: bodyHeight ? bodyHeight + 'px' : '100%' }">
    <div class="header">
      {{ returnHeaderInfo() }}
      <div class="back" @click="topStep">
        {{ step === 1 ? "首页" : "上一步" }}
        <div class="back-icon"></div>
      </div>
      <div class="save" @click="save" v-if="!isDisabled">保存</div>
    </div>
    <div class="step1" v-show="step === 1">
      <div class="info-box">
        <div class="item">
          <div class="name space">姓名</div>
          <div class="value">
            <input type="text" v-model="name" @blur="blur" maxlength="15" :disabled="isDisabled" />
          </div>
        </div>
        <div class="item">
          <div class="name">身份证号</div>
          <div class="value">
            <input type="text" v-model="idCard" @blur="blur" :disabled="isDisabled" />
          </div>
        </div>
        <div class="item">
          <div class="name space">性别</div>
          <div class="value">
            <van-dropdown-menu :style="'width:100px;height:40px;float:right'">
              <van-dropdown-item v-model="sex" :options="sexOption" :disabled="isDisabled" />
            </van-dropdown-menu>
          </div>
        </div>
        <div class="item">
          <div class="name">出生日期</div>
          <div class="value" @click="showBirthday">
            <span>{{ todate(birthday) }}</span>
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
            v-model="detailAddress"
            :disabled="isDisabled"
          />
        </div>
      </div>
      <div class="live-info">
        <div class="item">
          <div class="name">现居住小区</div>
          <div class="value" @click="selectHouse">
            <div class="icon" v-if="smallCommunityName ? false : true"></div>
            <span v-else>{{ smallCommunityName }}</span>
          </div>
        </div>
        <div class="item">
          <div class="name">预报名学校</div>
          <div class="value">{{ registrationSchool.schoolName }}</div>
        </div>
        <div class="item" v-if="isShowAlternativeSchool">
          <div class="name">备选学校</div>
          <div class="value">
            <van-dropdown-menu direction="up" :style="'width:180px;height:40px;float:right'">
              <van-dropdown-item
                v-model="alternativeSchoolID"
                :options="alternativeOption"
                :disabled="isDisabled"
                @change="alternativeChange"
              />
            </van-dropdown-menu>
          </div>
        </div>
      </div>
      <div class="old-school" v-if="registrationSchool.label">
        <div class="item">
          <div class="name">{{ registrationSchool.label === 1 ? "幼儿园名称" : "小学名称" }}</div>
          <div class="value">
            <input
              type="text"
              v-model="lastSchoolName"
              :disabled="isDisabled"
              :placeholder="
                registrationSchool.label === 1
                  ? '请填写幼儿园名称'
                  : '请填写小学名称'
              "
              @blur="blur"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="step2" v-show="step === 2">
      <div class="parent-info">
        <div class="item">
          <div class="name">姓名</div>
          <div class="value">
            <input type="text" @blur="blur" v-model="parents[0].name" :disabled="isDisabled" />
          </div>
        </div>
        <div class="item">
          <div class="name">关系</div>
          <div class="value">
            <van-dropdown-menu :style="'width:100px;height:40px;float:right'">
              <van-dropdown-item
                v-model="parents[0].relation"
                :options="parentOption"
                :disabled="isDisabled"
              />
            </van-dropdown-menu>
          </div>
        </div>
        <div class="item">
          <div class="name">身份证号</div>
          <div class="value">
            <input type="text" v-model="parents[0].idCard" @blur="blur" :disabled="isDisabled" />
          </div>
        </div>
        <div class="item">
          <div class="name">联系电话</div>
          <div class="value">
            <input type="number" v-model="parents[0].linkPhone" @blur="blur" :disabled="isDisabled" />
          </div>
        </div>
        <div class="item">
          <div class="name">工作单位</div>
          <div class="value">
            <input type="text" v-model="parents[0].workAddress" @blur="blur" :disabled="isDisabled" />
          </div>
        </div>
      </div>
      <div class="parent-info">
        <div class="item">
          <div class="name">姓名</div>
          <div class="value">
            <input
              type="text"
              maxlength="10"
              v-model="parents[1].name"
              @blur="blur"
              :disabled="isDisabled"
            />
          </div>
        </div>
        <div class="item">
          <div class="name">关系</div>
          <div class="value">
            <van-dropdown-menu :style="'width:100px;height:40px;float:right'">
              <van-dropdown-item
                :disabled="isDisabled"
                v-model="parents[1].relation"
                :options="parentOption"
              />
            </van-dropdown-menu>
          </div>
        </div>
        <div class="item">
          <div class="name">身份证号</div>
          <div class="value">
            <input type="text" @blur="blur" v-model="parents[1].idCard" :disabled="isDisabled" />
          </div>
        </div>
        <div class="item">
          <div class="name">联系电话</div>
          <div class="value">
            <input type="number" @blur="blur" v-model="parents[1].linkPhone" :disabled="isDisabled" />
          </div>
        </div>
        <div class="item">
          <div class="name">工作单位</div>
          <div class="value">
            <input type="text" @blur="blur" v-model="parents[1].workAddress" :disabled="isDisabled" />
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
      <div class="house-property" v-if="chosedHouseIndex === 0">
        <div class="item">
          <div class="name">房产性质</div>
          <div class="value">
            <van-dropdown-menu :style="'width:100px;height:40px;float:right'">
              <van-dropdown-item
                v-model="houseNature"
                :disabled="isDisabled"
                :options="propertyoption"
              />
            </van-dropdown-menu>
          </div>
        </div>
        <div class="item">
          <div class="name">房产所有人</div>
          <div class="value">
            <input type="text" @blur="blur" v-model="houseOwner" :disabled="isDisabled" />
          </div>
        </div>
        <div class="item">
          <div class="name">取得/购买时间</div>
          <div class="value" @click="choseGetHouseTime">{{ todate(buyDate) }}</div>
        </div>
      </div>
      <div class="house-property" v-if="chosedHouseIndex === 1">
        <div class="item">
          <div class="name">居住证有效期</div>
          <div class="value">
            <div class="value" @click="showResidence">{{ todate(permitResidencePeriod) }}</div>
          </div>
        </div>
        <div class="item">
          <div class="name">劳务合同期限</div>
          <div class="value">
            <div class="value" @click="showLaborContractPeriod">{{ todate(laborContractPeriod) }}</div>
          </div>
        </div>
      </div>
      <div class="house-number" v-if="chosedHouseIndex === 0">
        <div class="item">
          <div class="name">房产登记号/房产发票号</div>
        </div>
        <div class="item">
          <input type="text" @blur="blur" v-model="houseNumbers" :disabled="isDisabled" />
        </div>
      </div>
      <div class="house-number" v-if="chosedHouseIndex === 1">
        <div class="item">
          <div class="name">养老保险单位所在地</div>
        </div>
        <div class="item">
          <input type="text" @blur="blur" v-model="pensionUnitsAddress" :disabled="isDisabled" />
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
          <div class="active" v-if="specialCondition === index"></div>
        </div>
      </div>
      <div class="other-info">
        <div class="item">
          <div class="name">其他备注</div>
        </div>
        <textarea
          placeholder="填写备注信息"
          v-model="otherRemark"
          :disabled="isDisabled"
          maxlength="100"
          @blur="blur"
        ></textarea>
      </div>
      <div class="commitment" style="margin-bottom:0" v-if="!isDisabled">
        <div class="item">
          <div class="name">报名承诺书</div>
        </div>
        <div class="commit-text">本人承诺：如有弄虚作假，提供虚假材料的，一经发现，对其已入学子女作退学或转学处理，由此产生的不良影响，本人愿意承担一切后果</div>
      </div>
      <div class="accept" :class="accept ? 'chosed' : ''" v-if="!isDisabled">
        <van-checkbox v-model="accept" shape="square">我已阅读并接受</van-checkbox>
      </div>
      <div
        class="commit-button"
        :class="accept ? 'enable' : 'disable'"
        v-if="!isDisabled && step === 4"
        @click="confirm"
      >提交（{{ step }}/4）</div>
      <van-popup v-model="isShowAffirm" round closeable>
        <div class="commit-affirm">
          <div class="text">
            预报名申请提交后信息
            <span style="color:#ff3636">不可修改</span>，请仔细核对填报信息后提交！
          </div>
          <div class="buttons">
            <div class="canncel" @click="isShowAffirm = false">再想想</div>
            <div class="confirm" @click="comfirmCommit">确认</div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="step-button" v-if="step !== 4" @click="nextStep">下一步（{{ step }}/4）</div>
    <address-matching
      :isShow="isShowAddress"
      @choseAddress="choseAddress"
      @closeAddress="closeAddress"
    ></address-matching>
    <house-estate :isShow="isShowHouse" @choseHouse="choseHouse" @closeHouse="closeHouse"></house-estate>
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
    <div class="date-time" v-if="isShowBirthday">
      <van-datetime-picker
        v-model="selectBirthday"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmBirthday"
        @cancel="canncelBirthday"
      />
    </div>
    <div class="date-time" v-if="isShowResidence">
      <van-datetime-picker
        v-model="selectResidence"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmResidence"
        @cancel="canncelResidence"
      />
    </div>
    <div class="date-time" v-if="isShowLaborContract">
      <van-datetime-picker
        v-model="selectLaborContract"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmLaborContract"
        @cancel="canncelLaborContract"
      />
    </div>
  </div>
</template>
<script>
import { blur, Todate } from "@/common/tool/tool";
import { Notify, Dialog } from "vant";
import { Indicator } from "mint-ui";
import AddressMatching from "@/components/AddressMatching.vue";
import HouseEstate from "@/components/HouseEstate.vue";
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      ID: "",
      isDisableHasHouse: false,
      isDisabled: false,
      isShowAddress: false,
      isShowHouse: false,
      isShowBirthday: false,
      name: "",
      idCard: "",
      sex: 1,
      birthday: "",
      domicileAddress: {
        province: "",
        city: "",
        town: "",
        provinceID: 0,
        cityID: 0,
        areaID: 0
      },
      alternativeSchoolID: "",
      alternativeSchoolName: "",
      alternativeOption: [],
      detailAddress: "",
      smallCommunityName: "",
      smallCommunityID: "",
      registrationSchool: {
        schoolName: "",
        schoolID: 0
      },
      lastSchoolName: "",
      parents: [
        {
          sort: 1,
          idCard: "",
          linkPhone: "",
          name: "",
          relation: 1,
          workAddress: ""
        },
        {
          sort: 2,
          idCard: "",
          linkPhone: "",
          name: "",
          relation: 2,
          workAddress: ""
        }
      ],
      chosedHouseIndex: 0,
      houseNature: 1,
      houseOwner: "",
      houseNumbers: "",
      pensionUnitsAddress: "",
      otherRemark: "",
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
      accept: false,
      specialCondition: 0,
      buyDate: new Date(),
      purchaseDate: new Date(),
      selectBirthday: new Date(),
      minDate: new Date(2000, 1, 1),
      maxDate: new Date(2055, 1, 1),
      isShowAffirm: false,
      isShowPurchaseDate: false,
      sexOption: [
        {
          text: "男",
          value: 1
        },
        {
          text: "女",
          value: 2
        }
      ],
      propertyoption: [
        {
          text: "父母房产",
          value: 1
        },
        {
          text: "祖父母房产",
          value: 2
        },
        {
          text: "期房",
          value: 3
        }
      ],
      parentOption: [
        {
          text: "父亲",
          value: 1
        },
        {
          text: "母亲",
          value: 2
        },
        {
          text: "爷爷",
          value: 3
        },
        {
          text: "奶奶",
          value: 4
        },
        {
          text: "外公",
          value: 5
        },
        {
          text: "外婆",
          value: 6
        },
        {
          text: "其他监护人",
          value: 7
        }
      ],
      permitResidencePeriod: new Date(),
      laborContractPeriod: new Date(),
      selectResidence: new Date(),
      selectLaborContract: new Date(),
      isShowResidence: false,
      isShowLaborContract: false,
      isShowAlternativeSchool: false,
      bodyHeight: ""
    };
  },
  mounted() {
    this.bodyHeight = document.documentElement.clientHeight;
    this.$nextTick(function() {
      this.getSchoolList();
      if (this.$route.query.id) {
        this.getStudentDetail(this.$route.query.id);
      }
    });
  },
  methods: {
    // 获取备选学校
    getSchoolList() {
      let vm = this;
      http.get(api.GETSCHOOLLIST, {}, this).then(resp => {
        let schoolList = [];
        resp.data.data.map(v => {
          schoolList.push({
            text: v.schoolName,
            value: v.schoolID
          });
        });
        vm.alternativeSchoolID = schoolList[0].value;
        vm.alternativeSchoolName = schoolList[0].text;
        vm.alternativeOption = schoolList;
      });
    },
    alternativeChange(id) {
      let vm = this;
      let select = vm.alternativeOption.filter(v => {
        return v.value == id;
      });
      this.alternativeSchoolName = select[0].text;
    },
    getStudentDetail(id) {
      let vm = this;
      http
        .get(
          api.GETSTUDENTDETAIL,
          {
            ID: id
          },
          {},
          this
        )
        .then(resp => {
          let res = resp.data.data;
          if (res.forecastCode) {
            vm.isDisabled = true;
          } else {
            vm.isDisabled = false;
          }
          vm.ID = res.id;
          vm.name = res.name;
          vm.sex = res.sex;
          vm.idCard = res.idCard;
          vm.birthday = res.birthday ? new Date(res.birthday) : "";
          vm.domicileAddress.provinceID = res.provinceID;
          vm.domicileAddress.cityID = res.cityID;
          vm.domicileAddress.areaID = res.areaID;
          vm.domicileAddress.city = res.cityName;
          vm.domicileAddress.province = res.provincesName;
          vm.domicileAddress.town = res.areaName;
          vm.detailAddress = res.detailAddress;
          vm.smallCommunityName = res.smallCommunityName;
          vm.smallCommunityID = res.smallCommunityID;
          vm.registrationSchool.schoolName = res.schoolName;
          vm.registrationSchool.schoolID = res.schoolID;
          vm.lastSchoolName = res.preSchoolInformation
            ? res.preSchoolInformation
            : res.primarySchoolName;
          vm.registrationSchool.label = res.school ? res.school.label : "";
          vm.parents = res.parents;
          vm.chosedHouseIndex = res.property ? 0 : 1;
          vm.houseNature = res.houseNature;
          vm.houseOwner = res.houseOwner;
          vm.buyDate = res.buyDate ? new Date(res.buyDate) : new Date();
          vm.houseNumbers = res.houseNumbers;
          vm.permitResidencePeriod = res.permitResidencePeriod
            ? new Date(res.permitResidencePeriod)
            : new Date();
          vm.laborContractPeriod = res.laborContractPeriod
            ? new Date(res.laborContractPeriod)
            : new Date();
          vm.pensionUnitsAddress = res.pensionUnitsAddress;
          vm.specialCondition = res.specialCondition - 1;
          vm.otherRemark = res.otherRemark;
          vm.alternativeSchoolID = Number(res.alternativeSchoolID);
          vm.alternativeSchoolName = res.alternativeSchoolName;
          // console.log(vm.alternativeSchoolID,vm.alternativeSchoolName)
          if (res.school.schoolCode == "0401") {
            this.isDisableHasHouse = true;
            this.chosedHouseIndex = 0;
            this.isShowAlternativeSchool = true;
          } else if (res.school.schoolCode == "01") {
            this.isDisableHasHouse = true;
            this.chosedHouseIndex = 0;
            this.isShowAlternativeSchool = false;
          } else {
            this.isDisableHasHouse = false;
            this.chosedHouseIndex = 1;
            this.isShowAlternativeSchool = false;
          }
        });
    },
    choseGetHouseTime() {
      if (this.isDisabled) {
        return;
      }
      this.isShowPurchaseDate = true;
    },
    returnHeaderInfo() {
      if (this.step === 1) {
        return "学生信息";
      } else if (this.step === 2) {
        return "家长信息";
      } else if (this.step === 3) {
        return "房产/居住信息";
      } else {
        return "其他信息";
      }
    },
    confirmPurchaseDate(date) {
      this.buyDate = this.todate(date);
      this.isShowPurchaseDate = false;
    },
    canncelPurchaseDate() {
      this.isShowPurchaseDate = false;
    },
    confirmBirthday(date) {
      let vm = this;
      this.birthday = this.todate(date);
      this.isShowBirthday = false;
      if (!vm.smallCommunityName) {
        return;
      }
      let params = {
        smallCommunityID: this.smallCommunityID,
        birthday: this.todate(this.birthday)
      };
      Indicator.open();
      http.get(api.GETSCHOOLBYSMALLCOMMUNITYID, params, this).then(resp => {
        if (resp.data.data) {
          this.registrationSchool = resp.data.data;
          if (this.registrationSchool.schoolCode == "0401") {
            this.isDisableHasHouse = true;
            this.chosedHouseIndex = 0;
            this.isShowAlternativeSchool = true;
          } else if (this.registrationSchool.schoolCode == "01") {
            this.isDisableHasHouse = true;
            this.chosedHouseIndex = 0;
            this.isShowAlternativeSchool = false;
          } else {
            this.isDisableHasHouse = false;
            this.chosedHouseIndex = 1;
            this.isShowAlternativeSchool = false;
          }
        } else {
          Notify({ type: "warning", message: resp.data.message });
          this.registrationSchool = {
            schoolName: "",
            label: ""
          };
        }
        Indicator.close();
      });
    },
    canncelBirthday() {
      this.isShowBirthday = false;
    },
    confirmResidence(date) {
      this.permitResidencePeriod = this.todate(date);
      this.isShowResidence = false;
    },
    canncelResidence() {
      this.isShowResidence = false;
    },
    confirmLaborContract(date) {
      this.laborContractPeriod = this.todate(date);
      this.isShowLaborContract = false;
    },
    canncelLaborContract() {
      this.isShowLaborContract = false;
    },
    choseAddress(address) {
      this.isShowAddress = address.isShow;
      this.domicileAddress = address.chosedValue;
    },
    choseHouse(house) {
      this.isShowHouse = house.isShow;
      this.smallCommunityName = house.chosedValue.houseEstate;
      this.smallCommunityID = house.chosedValue.id;
      let params = {
        smallCommunityID: this.smallCommunityID,
        birthday: this.todate(this.birthday)
      };
      Indicator.open();
      http.get(api.GETSCHOOLBYSMALLCOMMUNITYID, params, this).then(resp => {
        if (resp.data.data) {
          this.registrationSchool = resp.data.data;
          if (this.registrationSchool.schoolCode == "0401") {
            this.isDisableHasHouse = true;
            this.chosedHouseIndex = 0;
            this.isShowAlternativeSchool = true;
          } else if (this.registrationSchool.schoolCode == "01") {
            this.isDisableHasHouse = true;
            this.chosedHouseIndex = 0;
            this.isShowAlternativeSchool = false;
          } else {
            this.isDisableHasHouse = false;
            this.chosedHouseIndex = 1;
            this.isShowAlternativeSchool = false;
          }
        } else {
          Notify({ type: "warning", message: resp.data.message });
          this.registrationSchool = {
            schoolName: "",
            label: ""
          };
        }
        Indicator.close();
      });
    },
    closeAddress() {
      this.isShowAddress = false;
    },
    closeHouse() {
      this.isShowHouse = false;
    },
    selectHouse() {
      if (this.isDisabled) {
        return;
      }
      if (!this.birthday) {
        Notify({ type: "warning", message: "请选择生日后进行学校匹配" });
        return;
      }
      this.isShowHouse = true;
    },
    showBirthday() {
      if (this.isDisabled) {
        return;
      }
      this.isShowBirthday = true;
    },
    showLaborContractPeriod() {
      if (this.isDisabled) {
        return;
      }
      this.isShowLaborContract = true;
    },
    showResidence() {
      if (this.isDisabled) {
        return;
      }
      this.isShowResidence = true;
    },
    selectAddress() {
      if (this.isDisabled) {
        return;
      }
      this.isShowAddress = true;
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
      if (this.isDisabled || this.isDisableHasHouse) {
        if (index === 1) {
          Notify({ type: "warning", message: "该学校必须有房产!" });
        }
        return;
      }
      this.chosedHouseIndex = index;
    },
    // 选择特殊情况
    choseSpecial(index) {
      if (this.isDisabled) {
        return;
      }
      this.specialCondition = index;
    },
    // 提交
    confirm() {
      let vm = this;
      // if (!vm.otherRemark) {
      //   Notify({ type: "warning", message: "请填写其他备注信息!" });
      //   return;
      // }
      if (!vm.accept) {
        Notify({ type: "warning", message: "请阅读并勾选承诺书!" });
        return;
      }
      this.isShowAffirm = true;
    },
    // 下一步
    nextStep() {
      let vm = this;
      if (this.step === 1) {
        if (
          !vm.name ||
          !vm.idCard ||
          !vm.sex ||
          !vm.birthday ||
          !vm.domicileAddress.province ||
          !vm.detailAddress ||
          !vm.smallCommunityName ||
          !vm.registrationSchool.schoolName ||
          !vm.lastSchoolName
        ) {
          Notify({ type: "warning", message: "请填写完整信息再点击下一步!" });
        } else {
          this.step++;
        }
      } else if (this.step === 2) {
        let vm = this;
        var phoneReg = /^1[3456789]\d{9}$/;
        if (
          vm.parents[0].linkPhone &&
          !phoneReg.test(Number(vm.parents[0].linkPhone))
        ) {
          Notify({ type: "warning", message: "请填写合法手机号再点击下一步!" });
          return;
        }
        if (
          vm.parents[1].linkPhone &&
          !phoneReg.test(Number(vm.parents[1].linkPhone))
        ) {
          Notify({ type: "warning", message: "请填写合法手机号再点击下一步!" });
          return;
        }
        if (
          (!vm.parents[0].idCard ||
            !vm.parents[0].linkPhone ||
            !vm.parents[0].name ||
            !vm.parents[0].workAddress) &&
          (!vm.parents[1].idCard ||
            !vm.parents[1].linkPhone ||
            !vm.parents[1].name ||
            !vm.parents[1].workAddress)
        ) {
          Notify({
            type: "warning",
            message: "请填写完整家长信息再点击下一步!"
          });
        } else {
          this.step++;
        }
      } else if (this.step === 3) {
        if (vm.chosedHouseIndex === 0) {
          if (!vm.houseOwner || !vm.houseNumbers) {
            Notify({ type: "warning", message: "请填写完整信息再点击下一步!" });
          } else {
            this.step++;
          }
        } else {
          if (!vm.pensionUnitsAddress) {
            Notify({ type: "warning", message: "请填写完整信息再点击下一步!" });
          } else {
            this.step++;
          }
        }
      }
    },
    blur() {
      blur();
    },
    save() {
      let vm = this;
      Dialog.confirm({
        title: "保存",
        message: "确认要保存该学生信息吗？"
      })
        .then(() => {
          vm.saveConfirm(false);
        })
        .catch(() => {
          // on cancel
        });
    },
    comfirmCommit() {
      this.saveConfirm(true);
    },
    saveConfirm(commit) {
      let vm = this;
      let params = {
        id: vm.ID,
        name: vm.name,
        idCard: vm.idCard,
        sex: vm.sex,
        birthday: vm.todate(vm.birthday),
        provinceID: vm.domicileAddress.provinceID,
        provincesName: vm.domicileAddress.province,
        cityID: vm.domicileAddress.cityID,
        cityName: vm.domicileAddress.city,
        areaID: vm.domicileAddress.areaID,
        areaName: vm.domicileAddress.town,
        detailAddress: vm.detailAddress,
        smallCommunityName: vm.smallCommunityName,
        smallCommunityID: vm.smallCommunityID,
        schoolID: vm.registrationSchool.schoolID,
        schoolName: vm.registrationSchool.schoolName,
        preSchoolInformation:
          vm.registrationSchool.label === 1 ? vm.lastSchoolName : "",
        primarySchoolName:
          vm.registrationSchool.label === 2 ? vm.lastSchoolName : "",
        parents: vm.parents,
        property: vm.chosedHouseIndex === 0 ? true : false,
        houseNature: vm.chosedHouseIndex === 0 ? vm.houseNature : "",
        houseOwner: vm.chosedHouseIndex === 0 ? vm.houseOwner : "",
        buyDate: vm.chosedHouseIndex === 0 ? vm.todate(vm.buyDate) : "",
        houseNumbers: vm.chosedHouseIndex === 0 ? vm.houseNumbers : "",
        permitResidencePeriod:
          vm.chosedHouseIndex === 1 ? vm.todate(vm.permitResidencePeriod) : "",
        laborContractPeriod:
          vm.chosedHouseIndex === 1 ? vm.todate(vm.laborContractPeriod) : "",
        pensionUnitsAddress:
          vm.chosedHouseIndex === 1 ? vm.pensionUnitsAddress : "",
        specialCondition: vm.specialCondition + 1,
        otherRemark: vm.otherRemark,
        operateCommit: commit,
        auditStatus: 0,
        alternativeSchoolID:
          vm.registrationSchool.schoolCode == "0401"
            ? vm.alternativeSchoolID
            : "",
        alternativeSchoolName:
          vm.registrationSchool.schoolCode == "0401"
            ? vm.alternativeSchoolName
            : ""
      };
      http.post(api.SAVEANDCOMMIT, params, this).then(resp => {
        if (resp.data.success) {
          Notify({
            type: "success",
            message: commit ? "提交成功" : "保存成功"
          });
          vm.$router.push({
            path: "/index"
          });
        } else {
          Notify({ type: "danger", message: resp.data.message });
        }
      });
    }
  },
  components: {
    AddressMatching,
    HouseEstate
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
      font-size: 14px;
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
    // position: absolute;
    // left: 50%;
    // bottom: 10px;
    // transform: translateX(-50%);
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
  }
  .date-time {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  /deep/.van-dropdown-menu .van-dropdown-menu__bar {
    height: 39px;
    box-shadow: none;
    background-color: none !important;
  }
}
</style>
