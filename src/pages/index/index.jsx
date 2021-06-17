import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtFab,
  AtList,
  AtListItem,
  AtActionSheet,
  AtActionSheetItem
} from "taro-ui";
import AV from "leancloud-storage/dist/av-weapp.js";
import dayjs from "dayjs";

import "./index.scss";

export default class Index extends Component {
  state = {
    items: [],
    optionVisible: false
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
    query.ascending("shelf_life");

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

  deleteItem = async id => {
    const item = AV.Object.createWithoutData("Items", id);
    try {
      await item.destroy();
      this.queryItems();
    } catch (error) {
      console.error(error);
    }
  };

  onAddClick = () => {
    Taro.navigateTo({ url: "../addItem/addItem" });
  };

  onItemClick = objectId => () => {
    this.tempItemId = objectId;
    this.setState({ optionVisible: true });
  };

  onDeleteClick = () => {
    this.setState({ optionVisible: false }, () =>
      this.deleteItem(this.tempItemId)
    );
  };

  render() {
    const { items, optionVisible } = this.state;
    return (
      <View className="page index">
        {items.length == 0 ? (
          <View className="empty at-article__h3">
            冰箱空空如也，点击右下角添加食品
          </View>
        ) : (
          <AtList>
            {items.map((i, index) => {
              const {
                objectId,
                name,
                shelf_life,
                quantity,
                createdAt
              } = i.toJSON();
              const expired_at = dayjs(createdAt).add(shelf_life, "day");
              const isExpired = dayjs().isAfter(expired_at);
              return (
                <AtListItem
                  hasBorder={index !== items.length - 1}
                  disabled={isExpired}
                  key={objectId}
                  title={`${name}（${quantity}）`}
                  extraText={
                    isExpired ? "已过期" : `${expired_at.fromNow(true)}后过期`
                  }
                  onClick={this.onItemClick(objectId)}
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
        <AtActionSheet
          isOpened={optionVisible}
          onClose={() => this.setState({ optionVisible: false })}
          cancelText="取消"
        >
          <AtActionSheetItem onClick={this.onDeleteClick}>
            <Text style="color: red;">删除</Text>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}
