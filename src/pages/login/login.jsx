import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import AV from "leancloud-storage/dist/av-weapp.js";

import "./login.scss";

export default class Login extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    Taro.hideHomeButton();
  }

  componentDidHide() {}

  onGetUserInfo = async ({ detail }) => {
    Taro.showLoading({ title: "正在登录..." });
    try {
      let user = await AV.User.loginWithMiniApp();

      // set user info
      const { userInfo } = detail;
      if (userInfo) {
        const { avatarUrl, nickName } = userInfo;
        user.set("avatarUrl", avatarUrl);
        user.set("nickName", nickName);
        user = await user.save();
      }

      // jump to index page
      Taro.reLaunch({ url: "../index/index" });
    } catch (error) {
      console.error(error);
    } finally {
      Taro.hideLoading();
    }
  };

  render() {
    return (
      <View className="page login">
        <View className="group">
          <Image className="logo" src={require("../../assets/fridge.png")} />
        </View>
        <AtButton
          className="login-button"
          type="primary"
          openType="getUserInfo"
          onGetUserInfo={this.onGetUserInfo}
        >
          微信登录
        </AtButton>
      </View>
    );
  }
}
