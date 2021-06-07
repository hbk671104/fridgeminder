import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtFab } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./addItem.scss";

export default class Additem extends Component {
  state = {
    name: null,
    guarantee_period: null
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleSubmit = () => {
    const { name, guarantee_period } = this.state;
    console.log(name, guarantee_period);
  };

  handleOnChange = key => value => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { name, guarantee_period } = this.state;
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
            required
            border={false}
            name="guarantee_period"
            title="保质期"
            type="number"
            placeholder="请输入保质期"
            value={guarantee_period}
            onChange={this.handleOnChange("guarantee_period")}
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
