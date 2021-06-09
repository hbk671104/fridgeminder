import AV from "leancloud-storage/dist/av-weapp.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

AV.init({
  appId: "IUGS6gHLEFw6EBOOLrSvP8r3-gzGzoHsz",
  appKey: "oSk4B0ODC9kN2xlOQylwugOO",
  serverURL: "https://iugs6ghl.lc-cn-n1-shared.com"
});
