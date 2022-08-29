/*是否合法IP地址*/
export function validateIP(rule, value,callback) {
    if(value==''||value==undefined||value==null){
      callback();
    }else {
      const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if ((!reg.test(value)) && value != '') {
        callback(new Error('请输入正确的IP地址'));
      } else {
        callback();
      }
    }
  }

  /* 是否手机号码或者固话*/
  export function validatePhoneTwo(rule, value, callback) {
    const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;;
    if (value == '' || value == undefined || value == null) {
      callback();
    } else {
      if ((!reg.test(value)) && value != '') {
        callback(new Error('请输入正确的电话号码或者固话号码'));
      } else {
        callback();
      }
    }
  }
  /* 是否固话*/
  export function validateTelphone(rule, value,callback) {
    const reg =/0\d{2}-\d{7,8}/;
    if(value==''||value==undefined||value==null){
      callback();
    }else {
      if ((!reg.test(value)) && value != '') {
        callback(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'));
      } else {
        callback();
      }
    }
  }
  /* 是否手机号码*/
  export function validatePhone(rule, value,callback) {
    const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
    if(value==''||value==undefined||value==null){
      callback();
    }else {
      if ((!reg.test(value)) && value != '') {
        callback(new Error('请输入正确的电话号码'));
      } else {
        callback();
      }
    }
  }
  /* 是否身份证号码*/
  export function validateIdNo(rule, value,callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(value==''||value==undefined||value==null){
      callback();
    }else {
      if ((!reg.test(value)) && value != '') {
        callback(new Error('请输入正确的身份证号码'));
      } else {
        callback();
      }
    }
  }
  /* 是否邮箱*/
  export function validateEMail(rule, value,callback) {
    const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(value==''||value==undefined||value==null){
      callback();
    }else{
      if (!reg.test(value)){
        callback(new Error('请输入正确的邮箱地址'));
      } else {
        callback();
      }
    }
  }
  /* 合法uri*/
  export function validateURL(rule,textval,callback) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    if(textval==''||textval==undefined||textval==null){
        callback();
    }
    else {
        if (!urlregex.test(textval)){
          callback(new Error('请输入正确的URL'));
        } else {
          callback();
        }
      }
  }

  /*验证内容是否英文数字以及下划线*/
  export function isPassword(rule, value, callback) {
    const reg =/^[_a-zA-Z0-9]+$/;
    if(value==''||value==undefined||value==null){
      callback();
    } else {
      if (!reg.test(value)){
        callback(new Error('密码仅由英文字母，数字以及下划线组成'));
      } else {
        callback();
      }
    }
  }

  /*自动检验数值的范围*/
  export function checkMax20000(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
      callback();
    } else if (!Number(value)) {
      callback(new Error('请输入[1,20000]之间的数字'));
    } else if (value < 1 || value > 20000) {
      callback(new Error('请输入[1,20000]之间的数字'));
    } else {
      callback();
    }
  }

  //验证数字输入框最大数值,32767
  export function checkMaxVal(rule, value,callback) {
    if (value < 0 || value > 32767) {
      callback(new Error('请输入[0,32767]之间的数字'));
    } else {
      callback();
    }
  }
  //验证是否1-99之间
  export function isOneToNinetyNine(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入正整数'));
      } else {
        const re = /^[1-9][0-9]{0,1}$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
          callback(new Error('请输入正整数，值为【1,99】'));
        } else {
          callback();
        }
      }
    }, 0);
  }

  // 验证是否整数
  export function isInteger(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入正整数'));
      } else {
        const re = /^[0-9]*[1-9][0-9]*$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
          callback(new Error('请输入正整数'));
        } else {
          callback();
        }
      }
    }, 0);
  }
  // 验证是否整数,非必填
  export function isIntegerNotMust(rule, value, callback) {
    if (!value) {
      callback();
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入正整数'));
      } else {
        const re = /^[0-9]*[1-9][0-9]*$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
          callback(new Error('请输入正整数'));
        } else {
          callback();
        }
      }
    }, 1000);
  }

  // 验证是否是[0-1]的小数
  export function isDecimal(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入[0,1]之间的数字'));
      } else {
        if (value < 0 || value > 1) {
          callback(new Error('请输入[0,1]之间的数字'));
        } else {
          callback();
        }
      }
    }, 100);
  }

  // 验证是否是[1-10]的小数,即不可以等于0
  export function isBtnOneToTen(rule, value, callback) {
    if (typeof value == 'undefined') {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入正整数，值为[1,10]'));
      } else {
        if (!(value == '1' || value == '2' || value == '3' || value == '4' || value == '5' || value == '6' || value == '7' || value == '8' || value == '9' || value == '10')) {
          callback(new Error('请输入正整数，值为[1,10]'));
        } else {
          callback();
        }
      }
    }, 100);
  }
  // 验证是否是[1-100]的小数,即不可以等于0
  export function isBtnOneToHundred(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入整数，值为[1,100]'));
      } else {
        if (value < 1 || value > 100) {
          callback(new Error('请输入整数，值为[1,100]'));
        } else {
          callback();
        }
      }
    }, 100);
  }
  // 验证是否是[0-100]的小数
  export function isBtnZeroToHundred(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入[1,100]之间的数字'));
      } else {
        if (value < 0 || value > 100) {
          callback(new Error('请输入[1,100]之间的数字'));
        } else {
          callback();
        }
      }
    }, 100);
  }

  // 验证端口是否在[0,65535]之间
  export function isPort(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
      if (value == '' || typeof(value) == undefined) {
        callback(new Error('请输入端口值'));
      } else {
        const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
          callback(new Error('请输入在[0-65535]之间的端口值'));
        } else {
          callback();
        }
      }
    }, 100);
  }
  // 验证端口是否在[0,65535]之间，非必填,isMust表示是否必填
  export function isCheckPort(rule, value, callback) {
    if (!value) {
      callback();
    }
    setTimeout(() => {
      if (value == '' || typeof(value) == undefined) {
        //callback(new Error('请输入端口值'));
      } else {
        const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
          callback(new Error('请输入在[0-65535]之间的端口值'));
        } else {
          callback();
        }
      }
    }, 100);
  }

  /* 小写字母*/
  export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
  }
  /*保留2为小数*/
  export function validatetoFixedNew(str) {
    return str ;
  }
  /* 验证key*/
  // export function validateKey(str) {
  //     var reg = /^[a-z_\-:]+$/;
  //     return reg.test(str);
  // }

  /* 大写字母*/
  export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
  }

  /* 大小写字母*/
  export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  }

export function classify(arr, hasUnitPrice){
  let map = {};
  let myArr = [];
  arr = Array.isArray(arr)?arr:[]
  if(hasUnitPrice){
    for(let i = 0; i < arr.length; i++){
      // debugger
      if(!map[arr[i].date]){
        myArr.push({
          date: arr[i].date,
          settlement: Number(typeof arr[i].settlement_total_price == 'object'?arr[i].settlement_total_price.value:arr[i].settlement_total_price),
          orgSettlement: Number(typeof arr[i].total_price == 'object'?arr[i].total_price.value:arr[i].total_price),
          data: [arr[i]]
        });
        map[arr[i].date] = arr[i]
      } else {
        for(let j = 0; j < myArr.length; j++){
          if(arr[i].date === myArr[j].date){
            myArr[j].settlement += Number(typeof arr[i].settlement_total_price == 'object'?arr[i].settlement_total_price.value:arr[i].settlement_total_price);
            myArr[j].orgSettlement += Number(typeof arr[i].total_price == 'object'?arr[i].total_price.value:arr[i].total_price);
            myArr[j].data.push(arr[i]);
            break
          }
        }
      }
    }
  }else{
    for(let i = 0; i < arr.length; i++){
      if(!map[arr[i].date]){
        myArr.push({
          date: arr[i].date,
          settlement: typeof arr[i].settlement_price == 'object'?arr[i].settlement_price.value:arr[i].settlement_price,
          orgSettlement: typeof arr[i].price == 'object'?arr[i].price.value:arr[i].price,
          data: [arr[i]]
        });
        map[arr[i].date] = arr[i]
      } else {
        for(let j = 0; j < myArr.length; j++){
          if(arr[i].date === myArr[j].date){
            myArr[j].settlement += typeof arr[i].settlement_price == 'object'?arr[i].settlement_price.value:arr[i].settlement_price;
            myArr[j].orgSettlement += typeof arr[i].price == 'object'?arr[i].price.value:arr[i].price;
            myArr[j].data.push(arr[i]);
            break
          }
        }
      }
    }
  }
  return myArr
}
export function needDataifyBydate(arr){
  let map = {};
  let myArr = [];
  // debugger
  arr = Array.isArray(arr)?arr:[]
  for(let i = 0; i < arr.length; i++){
    if(!map[arr[i].checkindate]){
      arr[i].bigBedNum = 0;
      arr[i].doubleBedNum = 0;
      arr[i].suiteNum = 0;
      arr[i].totalNum = 0;
      if(arr[i].roomtype == '大床房'){
        arr[i].bigBedNum = arr[i].roomcount;
        arr[i].totalNum += arr[i].roomcount;
      }else if(arr[i].roomtype == '双床房'){
        arr[i].doubleBedNum = arr[i].roomcount;
        arr[i].totalNum += arr[i].roomcount;
      }else {
        arr[i].suiteNum = arr[i].roomcount;
        arr[i].totalNum += arr[i].roomcount;
      }
      myArr.push(arr[i]);
      map[arr[i].checkindate] = arr[i]
    } else {
      for(let j = 0; j < myArr.length; j++){
        // debugger
        if(arr[i].checkindate === myArr[j].checkindate){
          if(arr[i].roomtype == '大床房'){
            myArr[j].bigBedNum = arr[i].roomcount;
            myArr[j].totalNum += arr[i].roomcount;
          }else if(arr[i].roomtype == '双床房'){
            myArr[j].doubleBedNum = arr[i].roomcount;
            myArr[j].totalNum += arr[i].roomcount;
          }else {
            myArr[j].suiteNum = arr[i].roomcount;
            myArr[j].totalNum += arr[i].roomcount;
          }
          break
        }
      }
    }
  }
  return myArr
}
export function EventClassifyByTime(arr){
  let map = {};
  let myArr = [];
  arr = arr?arr:[];
  for(let i = 0; i < arr.length; i++){
    // debugger
    let totalPrice = (arr[i].build?arr[i].build.price:0) 
                  + (arr[i].rentalCosts?arr[i].rentalCosts.price:0) 
                  // + (arr[i].equipment?arr[i].equipment.price:0);
    if(arr[i].equipment){
      arr[i].equipment.forEach(element => {
        totalPrice += (element.price || 0)
      });
    }
    if(!map[arr[i].rentalCosts.time]){
      myArr.push({
        time: arr[i].rentalCosts.time,
        totalPrice: totalPrice,
        data: [arr[i]]
      });
      map[arr[i].rentalCosts.time] = arr[i]
    } else {
      for(let j = 0; j < myArr.length; j++){
        if(arr[i].rentalCosts.time === myArr[j].time){
          myArr[j].totalPrice += (arr[i].build?arr[i].build.price:0) 
                              + (arr[i].rentalCosts?arr[i].rentalCosts.price:0)
                              // + (arr[i].equipment?arr[i].equipment.price:0);
          if(arr[i].equipment){
            arr[i].equipment.forEach(element => {
              myArr[j].totalPrice += (element.price || 0)
            });
          }                   
          myArr[j].data.push(arr[i]);
          break
        }
      }
    }
  }
  return myArr
}

export function classifyByTime(arr,type = 'time'){
  let map = {};
  let myArr = [];
  arr = arr?arr:[];
  for(let i = 0; i < arr.length; i++){
    // debugger
    if(!map[arr[i][type]]){
      myArr.push({
        time: arr[i][type],
        car_date: arr[i][type].substring(0, 10),
        breakfast: arr[i].breakfast,
        networks: arr[i].networks,
        describe: arr[i].describe,
        otherrequirements: arr[i].otherrequirements,
        type: arr[i].type,
        room_budget: arr[i].room_budget,
        purpose: arr[i].purpose,
        offer_remarks: arr[i].offer_remarks,
        comments: arr[i].comments,
        data: [arr[i]],
        car: [arr[i]],
      });
      map[arr[i][type]] = arr[i]
    } else {
      for(let j = 0; j < myArr.length; j++){
        if(arr[i][type] === myArr[j].time){
          myArr[j].data.push(arr[i]);
          myArr[j].car.push(arr[i]);
          break
        }
      }
    }
  }
  return myArr
}

export function eventifyByTime(arr,type = 'time'){
  let map = {};
  let myArr = [];
  arr = arr?arr:[];
  for(let i = 0; i < arr.length; i++){
    // if(!map[arr[i][type]]){
      myArr.push({
        time: arr[i][type],
        car_date: arr[i][type].substring(0, 10),
        breakfast: arr[i].breakfast,
        networks: arr[i].networks,
        describe: arr[i].describe,
        otherrequirements: arr[i].otherrequirements,
        type: arr[i].type,
        room_budget: arr[i].room_budget,
        purpose: arr[i].purpose,
        offer_remarks: arr[i].offer_remarks,
        comments: arr[i].comments,
        data: [arr[i]],
        car: [arr[i]],
      });
      map[arr[i][type]] = arr[i]
    // } 
  }
  return myArr
}

export function SortByTimeUp(name){
  return function(o,p){
    var a,b;
    if(typeof o==="object"&&typeof p==="object"&&o&&p){
      a=o[name];
      b=p[name];
      if(a===b){
        return 0;
      }if(typeof a===typeof b){
        return a > b?-1: 1;
      }return typeof a > typeof b?-1: 1;
    }else{
      throw("error");
    }
  }
}
