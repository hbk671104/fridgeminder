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

  handleLogin = async () => {
    Taro.showLoading({ title: "正在登录..." });
    try {
      const { userInfo } = await Taro.getUserProfile({
        desc: "用于生成用户画像"
      });
      const user = await AV.User.loginWithMiniApp();

      // set user info
      if (userInfo) {
        const { avatarUrl, nickName } = userInfo;
        user.set("avatarUrl", avatarUrl);
        user.set("nickName", nickName);
        await user.save();
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
          onClick={this.handleLogin}
        >
          微信登录
        </AtButton>
      </View>
    );
  }
}
