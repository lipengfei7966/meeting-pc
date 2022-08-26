/**
 * 线上环境
 */
export let ONLINEHOST = "https://b.ctgbs.com";
//export const ONLINEHOST = "http://47.92.123.194:8999";

// H5 问卷反馈地址
export let meetingH5 = "https://meeting-survey-test.ctgbs.com";

if(window.location.host == 'tmc.ctgbs.com' || window.location.host == 'tmc.ctgbs.cn'){
  ONLINEHOST = "https://tmc.ctgbs.com";
  meetingH5 = "https://meeting-survey.ctgbs.com";
}else {
  //ONLINEHOST = "https://b.ctgbs.com";
  ONLINEHOST = "https://tmc-test-meeting.ctgbs.com";
  // ONLINEHOST = "http://localhost:52073";
  meetingH5 = "https://meeting-survey-test.ctgbs.com";
}
/**
 * 测试环境
 */
 //export const QAHOST = "http://47.92.123.194:8999";
//  export const QAHOST = "http://localhost:52073";
// export const QAHOST = "http://localhost:52773";
// export const QAHOST = "https://b.ctgbs.com";
export const QAHOST = "https://tmc-test-meeting.ctgbs.com";
// export const QAHOST = "https://tmc-testmeeting.ctgbs.com";



/**
 * 线上环境 socket
 */
export const SOKECTONLINEHOST = "wss://";

/**
 * 测试环境 socket
 */
export const SOKECTQAHOST = "wss://";

/**
 * 线上mock
 */
export const MOCKHOST = "http://xxx.com";

/**
 * 是否mock
 */
export const ISMOCK = false;

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST = ONLINEHOST;

/**
 * 忽略token的地址
 */
export const ignoreToken = {
  "/adminAccount/adminLogin": null,
  "/code/getMobileCode": null,
};

/**
 * 请求的公共参数
 */
export const conmomPrams = {};

/**
 * oss 图片配置
 */
export const oss = {};

/**
 * @description token在Cookie中存储的天数，默认1天
 */
export const cookieExpires = 7;
