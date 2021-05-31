import { Component } from "react";
import "./app.scss";
import AV from "leancloud-storage/dist/av-weapp.js";

class App extends Component {
  componentDidMount() {
    AV.init({
      appId: "IUGS6gHLEFw6EBOOLrSvP8r3-gzGzoHsz",
      appKey: "oSk4B0ODC9kN2xlOQylwugOO",
      serverURL: "https://iugs6ghl.lc-cn-n1-shared.com"
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
