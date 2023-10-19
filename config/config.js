module.exports = {
  message: {
    // phần đăng nhập và đăng ký
    LOGIN_SUCCESS: "Đăng nhập thành công",
    REGISTER_SUCCESS_ST: "Tạo tài khoản thành công cho nhân viên",
    REGISTER_SUCCESS_US:
      "Tạo tài khoản thành công, bạn kiểm tra email để nhận thông tin",
    LOGIN_E001:
      "Đăng nhập không thành công, kiểm tra lại số điện thoại và password",
    REGISTER_E001:
      "Tạo tài khoản không thành công, vui lòng kiểm tra thông tin nhập vào",
    VALIDATION_PHONE_E001: "Vui lòng nhập số điện thoại",
    VALIDATION_PASSWORD_E001: "Vui lòng nhập mật khẩu",
    VALIDATION_PHONE_E002: "Số điện thoại không đúng định dạng",
    VALIDATION_PASSWORD_E002: "Vui lòng nhập mật khẩu có độ dài từ 6-8 ký tự",

    VALIDATION_EMAIL_E001: "Vui lòng nhập email của bạn",
    SIGNUP_NAME_ERROR: "Vui lòng nhập họ tên của bạn",
    SIGNUP_EMAIL_ERROR: "Vui lòng nhập đúng định dạng email",
    SIGNUP_PHONE_ERROR: "Vui lòng nhập số điện thoại của bạn",
    SIGNUP_ADDRESS_ERROR: "Vui lòng nhập địa chỉ của bạn",
    SIGNUP_BIRTHDAY_ERROR: "Vui lòng nhập ngày sinh của bạn",
    SIGNUP_ROLEID_ERROR: "Vui lòng nhập quyền cho nhân viên",
    LOCK_LOGIN:
      "Tài khoản của bạn đã bị khóa vui lòng liên hệ tổng đài để được hỗ trợ",
    SEND_MAIL_OTP: "Gửi OTP không thành công cho người dùng",
    RESET_PASSWORD: "Mật khẩu mới đã được gửi về mail của bạn",
    // admin controller
    PHONE_DUPLICATE: "Số điện thoại của bạn đã bị trùng, vui lòng thay đổi.",
    EMAIL_DUPLICATE: "Email của bạn đã bị trùng, vui lòng thay đổi.",
    UPDATE_SUCCESS: "Cập nhật dữ liệu thành công.",
    UPDATE_FALSE: "Cập nhật dữ liệu không thành công.",
    MISSING_DATA_INPUT:
      "Trường dữ liệu bị thiếu. Vui lòng điền đầy đủ thông tin.",
    // customer controller
    ORDER_SUCCESS: "Bạn đã đặt đơn hàng thành công",
    ORDER_FALSE: "Bạn đã đặt đơn hàng không thành công",
    CHECK_PASS: "Mật khẩu mới của bạn không hợp lệ.",
    VALIDATION_ERROR_E002: "Sản phẩm không còn đủ nguyên liệu",
    VALIDATION_SUCCES_E001: "Thêm sản phẩm vào giỏ hàng thành công.",
    // ingredient
    INGREDIENT_QUANTITY:
      "Số lượng nguyên liệu trong kho đã sử dụng không thể hủy hóa đơn.",
    INGREDIENT_DUPLICATE: "Nguyên liệu này đã tồn tại.",
    DELETE_ERROR: "Xóa không thành công, đã tồn tại hóa đơn.",
    // measure
    MEASURE_DUPLICATE: "Tên đơn vị nguyên liệu này đã tồn tại.",
    DELETE_MEASURE: "Xóa không thành công, đã tồn tại.",
    // promotion
    PROMOTION_DUPLICATE: "Mã khuyến mãi này đã được sử dụng.",
    // role
    ROLE_ERROR: "Thực hiện không thành công. Vui lòng kiểm tra thông tin.",
    // product
    PRODUCT_DUPLICATE: "Tên sản phẩm này đã tồn tại.",
    PRODUCT_NONAME: "Sản phẩm này không tồn tại.",
    PRODUCT_BUY: "Sản phẩm này đã được đặt hàng.",
    //staff
    STAFF_ORDER: "Tài khoản này đã duyệt đơn hàng.",
  },
};
