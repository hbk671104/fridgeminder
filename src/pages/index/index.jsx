import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtFab, AtList, AtListItem } from "taro-ui";
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
    this.queryItems();
  }

  componentDidHide() {}

  queryItems = async () => {
    const user = AV.User.current();
    const query = new AV.Query("Items");
    query.equalTo("user", user);
    query.descending("createdAt");

    Taro.showLoading({ title: "正在加载..." });
    try {
      const items = await query.find();
      this.setState({ items });
    } catch (error) {
      console.error(error);
    } finally {
      Taro.hideLoading();
    }
  };

  onAddClick = () => {
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
          <AtList>
            {items.map(i => {
              const item = i.toJSON();
              return (
                <AtListItem
                  key={item.objectId}
                  title={item.name}
                  note={`${item.guarantee_period} 天后过期`}
                />
              );
            })}
          </AtList>
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
