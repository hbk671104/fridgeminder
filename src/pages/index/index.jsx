import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtFab } from "taro-ui";
import AV from "leancloud-storage/dist/av-weapp.js";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";

export default class Index extends Component {
  state = {
    items: []
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    Taro.hideHomeButton();
  }

  componentDidHide() {}

  onAddClick = e => {
    e.stopPropagation();
    Taro.navigateTo({ url: "../addItem/addItem" });
  };

  render() {
    const { items } = this.state;
    return (
      <View className="page index">
        {items.length == 0 ? (
          <View className="empty at-article__h3">
            冰箱空空如也，点击右下角添加食品
          </View>
        ) : (
          <View></View>
        )}
        <View className="add-button">
          <AtFab onClick={this.onAddClick}>
            <Text className="at-fab__icon at-icon at-icon-add" />
          </AtFab>
        </View>
      </View>
    );
  }
}
