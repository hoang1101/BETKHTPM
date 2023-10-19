const bcrypt = require("bcrypt");
const authController = require("../services/auth.service");
const db = require("../models");
const speakeasy = require("speakeasy");
const emailExistence = require("email-existence");
const { findOneUser, findOneUserEmail } = require("../dao/customer.dao");
const { findOneStaff } = require("../dao/staff.dao");
const { ReS, ReE, to, ReF } = require("../utils/util.service");
const semail = require("../utils/mailer");
const {
  ContentActiveAccount_vi,
  ContentActiveAccountOTP,
} = require("../template/email");
const config = require("../config/config");
const {
  CheckEmailRegisterStaff,
  CheckPhoneRegisterStaff,
} = require("./until.controller");
const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));

exports.loginCustomer = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if (!phone) return ReF(res, 200, config.message.VALIDATION_PHONE_E001);
    if (!password)
      return ReF(res, 200, config.message.VALIDATION_PASSWORD_E001);
    if (phone.length < 10)
      return ReF(res, 200, config.message.VALIDATION_PHONE_E002);
    if (password.length < 6)
      return ReF(res, 200, config.message.VALIDATION_PASSWORD_E002);

    const customer = await findOneUser(phone);

    const response = await authController.loginService(req.body);
    const token = response.token;
    const mgs = response.msg;
    if (response.success === true) {
      return res.status(200).json({
        success: true,
        token,
        data: customer,
      });
    } else {
      return ReF(res, 200, config.message.LOGIN_E001);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

/// login Staff
exports.loginStaff = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if (!phone) return ReF(res, 200, config.message.VALIDATION_PHONE_E001);
    if (phone.length < 10 && phone.length < 10)
      return ReF(res, 200, config.message.VALIDATION_PHONE_E002);
    if (!password)
      return ReF(res, 200, config.message.VALIDATION_PASSWORD_E001);
    if (password.length < 6 && password.length > 8)
      return ReF(res, 200, config.message.VALIDATION_PASSWORD_E002);

    const customer = await findOneStaff(phone);

    const response = await authController.loginServiceStaff(req.body);
    const token = response.token;
    const mgs = response.msg;
    if (response.success === true) {
      return res.status(200).json({
        message: config.message.LOGIN_SUCCESS,
        success: true,
        token,
        data: customer,
      });
    } else {
      return ReF(res, 200, config.message.LOGIN_E001);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// register Customer
function isValidEmail(email) {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

exports.register = async (req, res) => {
  try {
    // kiểm tra dữ liệu
    const {
      password,
      fullname,
      email,
      phone,

      address,
      gender,
      birthday,
    } = req.body;
    // email
    if (!email) return ReF(res, 200, config.message.VALIDATION_EMAIL_E001);
    if (!isValidEmail(email))
      return ReF(res, 200, config.message.SIGNUP_EMAIL_ERROR);
    // phone
    if (!phone) return ReF(res, 200, config.message.SIGNUP_PHONE_ERROR);
    if (phone.length < 10 && phone.length < 10)
      return ReF(res, 200, config.message.VALIDATION_PHONE_E002);
    // password
    if (!password)
      return ReF(res, 200, config.message.VALIDATION_PASSWORD_E001);
    if (password.length < 6 && password.length > 8)
      return ReF(res, 200, config.message.VALIDATION_PASSWORD_E002);
    // name
    if (!fullname) return ReF(res, 200, config.message.SIGNUP_NAME_ERROR);
    // address
    if (!address) return ReF(res, 200, config.message.SIGNUP_ADDRESS_ERROR);
    // gender
    if (!gender) return ReF(res, 200, config.message.SIGNUP_ADDRESS_ERROR);
    // birthday
    if (!birthday) return ReF(res, 200, config.message.SIGNUP_BIRTHDAY_ERROR);

    const response = await authController.registerService(req.body);
    //check eamil có tồn tại không

    if (response.success === true) {
      if (!email) {
        return res.status(404).json({
          success: false,
          msg: "Not Found",
        });
      } else {
        // check email xem email có thật không
        // emailExistence.check(email, async (error, resmail) => {
        //   if (error) {
        //     return ReE(res, "Email không tồn tại", 200, 1000);
        //   }
        //   if (!resmail) {
        //     return ReE(res, "Email không tồn tại", 200, 1000);
        //   } else {
        //     let [err, da] = await to(
        //       sendMail({
        //         to: email,
        //         subject: "Thông báo hệ thống",
        //         body: ContentActiveAccount_vi(fullname),
        //       })
        //     );
        //     if (err) return ReE(res, err, 200, 1000);
        //   }
        // });
        to(
          semail.sendMail({
            to: email,
            subject: "Thông báo hệ thống",
            body: ContentActiveAccount_vi(fullname),
          })
        );
      }

      return res.status(200).json({
        success: true,
        response,
        message: config.message.REGISTER_SUCCESS_US,
      });
    } else {
      return ReF(res, 200, config.message.REGISTER_E001);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// register Staff

exports.registerStaff = async (req, res) => {
  const {
    password,
    fullname,
    email,
    phone,
    roleId,
    address,
    gender,
    birthday,
  } = req.body;
  try {
    // email
    if (!email) return ReF(res, 200, config.message.VALIDATION_EMAIL_E001);
    if (!isValidEmail(email))
      return ReF(res, 200, config.message.SIGNUP_EMAIL_ERROR);
    // phone
    if (!phone) return ReF(res, 200, config.message.SIGNUP_PHONE_ERROR);
    if (phone.length < 10 && phone.length < 10)
      return ReF(res, 200, config.message.VALIDATION_PHONE_E002);
    // password
    if (!password)
      return ReF(res, 200, config.message.VALIDATION_PASSWORD_E001);
    if (password.length < 6 && password.length > 8)
      return ReF(res, 200, config.message.VALIDATION_PASSWORD_E002);
    // name
    if (!fullname) return ReF(res, 200, config.message.SIGNUP_NAME_ERROR);
    // address
    if (!address) return ReF(res, 200, config.message.SIGNUP_ADDRESS_ERROR);
    // gender
    if (!gender) return ReF(res, 200, config.message.SIGNUP_ADDRESS_ERROR);
    // birthday
    if (!birthday) return ReF(res, 200, config.message.SIGNUP_BIRTHDAY_ERROR);
    // roleId
    if (!roleId) return ReF(res, 200, config.message.SIGNUP_ROLEID_ERROR);

    const checkEmail = await CheckEmailRegisterStaff(email);
    if (checkEmail) {
      return ReF(res, 200, config.message.EMAIL_DUPLICATE);
    }
    const CheckPhone = await CheckPhoneRegisterStaff(phone);
    if (CheckPhone) {
      return ReF(res, 200, config.message.PHONE_DUPLICATE);
    }

    const response = await authController.registerServiceStaff(req.body);

    if (response.success === true) {
      to(
        semail.sendMail({
          to: email,
          subject: "Thông báo hệ thống",
          body: ContentActiveAccount_vi(fullname),
        })
      );
      return res.status(200).json({
        success: true,
        response,
        msg: config.message.REGISTER_SUCCESS_ST,
      });
    } else {
      return ReF(res, 200, config.message.REGISTER_E001);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

exports.sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findOneUserEmail(email);

    if (user) {
      // Tạo một mã OTP ngẫu nhiên sử dụng thư viện speakeasy
      const secret = speakeasy.generateSecret({ length: 6 });
      const token = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
      });
      //check eamil có tồn tại không

      // email
      if (!email) return ReF(res, 200, config.message.VALIDATION_EMAIL_E001);
      else if (!isValidEmail(email)) {
        return ReF(res, 200, config.message.SIGNUP_EMAIL_ERROR);
      } else {
        to(
          semail.sendMail({
            to: email,
            subject: "Kích hoạt tài khoản",
            body: ContentActiveAccountOTP(user.fullname, token),
          })
        );
        return ReS(
          res,
          {
            token: secret.base32,
          },
          200
        );
      }
    } else {
      return ReF(res, 200, SEND_MAIL_OTP);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};

exports.VerifyOTP = (req, res) => {
  const token = req.body.token;
  const otp = req.body.otp;

  // Kiểm tra tính hợp lệ của email và token ở đây

  // Kiểm tra tính hợp lệ của mã OTP
  const verified = speakeasy.totp.verify({
    secret: token,
    encoding: "base32",
    token: otp,
    window: 6,
  });

  if (verified) {
    // Mã OTP đúng, tạo tài khoản mới ở đây
    res.send({ success: true });
  } else {
    // Mã OTP sai
    res.send({ success: false });
  }
};
exports.ResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    //check eamil có tồn tại không

    // email
    if (!email) return ReF(res, 200, config.message.VALIDATION_EMAIL_E001);
    if (!isValidEmail(email))
      return ReF(res, 200, config.message.SIGNUP_EMAIL_ERROR);
    else {
      const checkEmail = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (!checkEmail) {
        return res.status(200).json({
          success: false,
          msg: "Không có tài khoản nào có Email này!",
        });
      }
      const secret = speakeasy.generateSecret({ length: 6 });
      const token = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
      });
      // emailExistence.check(email, async (error, resmail) => {
      //   if (!resmail) {
      //     return ReE(res, "mail không tồn tại", 200, 1000);
      //   } else {
      //     let [err, da] = await to(
      //       sendMail({
      //         to: email,
      //         subject: "Subject Active Account",
      //         body: token,
      //       })
      //     );
      //     if (err) return ReE(res, err, 200, 1000);
      to(
        semail.sendMail({
          to: email,
          subject: "Subject Active Account",
          body: token,
        })
      );
      try {
        const updatePassword = await db.User.update(
          { password: hashPassword(token) },
          {
            where: { email: email },
          }
        );
        if (updatePassword) {
          return ReS(res, 200, config.message.RESET_PASSWORD);
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: -1,
          msg: "Fail at auth controller:" + error,
        });
      }
    }
    // });
    // }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};
