import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtFab } from "taro-ui";
import AV from "leancloud-storage/dist/av-weapp.js";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./addItem.scss";

export default class Additem extends Component {
  state = {
    name: null,
    quantity: null,
    shelf_life: null
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleOnChange = key => value => {
    this.setState({
      [key]: value
    });
  };

  handleSubmit = async () => {
    const { name, quantity, shelf_life } = this.state;
    if (!name || !shelf_life) {
      return;
    }

    Taro.showLoading({ title: "正在保存..." });
    try {
      // set item properties
      const user = AV.User.current();
      const item = new AV.Object("Items");
      item.set("user", user);
      item.set("name", name);
      if (quantity) {
        item.set("quantity", parseInt(quantity, 10));
      }
      item.set("shelf_life", parseInt(shelf_life, 10));

      await item.save();

      // add subscription
      // const res = await Taro.requestSubscribeMessage({
      //   tmplIds: ["xChbR4kkhzuSOe2jPqiEVvmF-Sv_46tnREWnyLvwWik"]
      // });
      // console.log(res);

      Taro.navigateBack();
    } catch (error) {
      console.error(error);
    } finally {
      Taro.hideLoading();
    }
  };

  render() {
    const { name, quantity, shelf_life } = this.state;
    return (
      <View className="page addItem">
        <AtForm>
          <AtInput
            required
            autoFocus
            name="name"
            title="名称"
            type="text"
            placeholder="请输入食品名称"
            value={name}
            onChange={this.handleOnChange("name")}
          />
          <AtInput
            name="quantity"
            title="数量"
            type="number"
            placeholder="请输入数量，默认为1"
            value={quantity}
            onChange={this.handleOnChange("quantity")}
          />
          <AtInput
            required
            border={false}
            name="shelf_life"
            title="保质期"
            type="number"
            placeholder="请输入保质期"
            value={shelf_life}
            onChange={this.handleOnChange("shelf_life")}
          >
            <View className="at-article__h3">天</View>
          </AtInput>
        </AtForm>
        <View className="submit-button">
          <AtFab onClick={this.handleSubmit}>
            <Text className="at-fab__icon at-icon at-icon-check" />
          </AtFab>
        </View>
      </View>
    );
  }
}
