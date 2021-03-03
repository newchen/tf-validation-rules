## 常用校验规则(废弃, 请使用tf-reg)

```javascript
// 引入
import {
  patternPhone, //手机
  patternTel, // 固话
  patternVolume, // 体积
  patternBankCard, // 银行卡

  isPhone, // 手机
  isTel, // 固话
  isPhoneAndTel, // 手机或固话
  isDrivingLicenseNumber, // 驾照证号
  isVolume, // 体积
  isAmount, // 金额
  isBankCard, // 银行卡
  isIdentityCodeValid // 身份证
} from "tf-validation-rules";

// 或
import * as ValidationRules from "tf-validation-rules";
// let isPhone = ValidationRules.isPhone;

// 说明: 以pattern开头的是正则表达式, 以is开头的是方法
patternPhone.test('123')
isPhone('123')
```
