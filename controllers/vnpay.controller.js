const querystring = require("qs");
const crypto = require("crypto");
var config = require("config");
const moment = require("moment");

exports.vnpay = async (req, res) => {
  var date = new Date();
  const amount = 10000;
  const createDate = moment(date).format("YYYYMMDDHHmmss");
  const bill_id = moment(date).format("DDHHmmss");

  var ipAddr =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;

  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");
  var vnpUrl = config.get("vnp_Url");

  //var createDate = formatDate(billDoc.createdAt);
  //var amount = total - reduce + ship;

  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = "VND";
  vnp_Params["vnp_TxnRef"] = bill_id;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan bill " + bill_id;
  vnp_Params["vnp_OrderType"] = 110000;
  vnp_Params["vnp_Amount"] = amount * 100;
  // vnp_Params['vnp_ReturnUrl'] = `${req.protocol}://${req.hostname}/api/bill/vnpay_ipn`;
  vnp_Params["vnp_ReturnUrl"] = `http://localhost:3000/api/v1/customer/return`;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  return res.status(200).json({
    success: true,
    msg: "hihi !",
    data: vnpUrl,
  });
  // res.status(200).send({ status: 200, msg: "hihi", data: vnpUrl });
};
// su ly giao hang tiet kiem
const fromObject = function (params, skipobjects, prefix) {
  if (skipobjects === void 0) {
    skipobjects = false;
  }
  if (prefix === void 0) {
    prefix = "";
  }
  var result = "";
  if (typeof params != "object") {
    return prefix + "=" + encodeURIComponent(params) + "&";
  }
  // @ts-ignore
  for (var param in params) {
    var c = "" + prefix + _st(param, prefix);
    if (isObj(params[param]) && !skipobjects) {
      result += fromObject(params[param], false, "" + c);
    } else if (Array.isArray(params[param]) && !skipobjects) {
      // @ts-ignore
      params[param].forEach(function (item, ind) {
        result += fromObject(item, false, c + "[" + ind + "]");
      });
    } else {
      result += c + "=" + encodeURIComponent(params[param]) + "&";
    }
  }
  return result;
};

exports.vnpay_return = async (req, res) => {
  try {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    var secretKey = config.get("vnp_HashSecret");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      var orderId = vnp_Params["vnp_TxnRef"];
      var rspCode = vnp_Params["vnp_ResponseCode"];
      res.status(301).redirect("http://localhost:3001/ThanhCong");
      res.status(200).json({ RspCode: "00", Message: "success" });
    } else {
      res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
    }
  } catch (err) {
    console.log(err);
  }
};

function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
