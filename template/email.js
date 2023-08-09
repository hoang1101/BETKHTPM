exports.ContentActiveAccount_vi = (fullname) => {
  return (
    " <p>Email này được gửi đến cho " +
    fullname +
    "</p>" +
    "<p>Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập vào để sử dụng dịch vụ" +
    "</a>.</p>" +
    '<p>Nếu bạn có thắc mắc, vui lòng liên hệ với chúng tôi qua địa chỉ email <a href="support.phuclong@gmail.com">support.phuclong@gmail.com</a>' +
    "</p>Trân Trọng,<br>" +
    "Phúc Long" +
    "."
  );
};
exports.ContentActiveAccountOTP = (fullname, token) => {
  return (
    "<p>Xin chào " +
    fullname +
    "</p>" +
    "<p>Mã OTP của bạn là " +
    token +
    ", vui lòng nhập mã OTP vào ứng dụng để hoàn tất quá trình đăng ký tài khoản.</p>" +
    "<p>Xin cảm ơn và chào mừng bạn đến với hệ thống của hàng trực tuyến của Phúc Long.</p>" +
    "Trân Trọng,<br>Phúc Long."
  );
};
// huy nhan don hang
exports.ContentOrderFalse = (fullname, id) => {
  return (
    "<p>Xin chào " +
    fullname +
    "</p>" +
    "<p>Đơn hàng với mã số " +
    id +
    ", đã bị hủy vì số lượng nguyên liệu bên cửa hàng không còn đủ để hoàn thành.</p>" +
    "<p>Xin lỗi bạn vì vẫn đề gặp phải và mong bạn đến với hệ thống của hàng trực tuyến của Phúc Long để đặt đơn hàng mới.</p>" +
    "Trân Trọng,<br>Phúc Long."
  );
};
//  nhan don hang
exports.ContentOrderTrue = (fullname, id) => {
  return (
    "<p>Xin chào " +
    fullname +
    "</p>" +
    "<p>Đơn hàng với mã số " +
    id +
    ", đã hoàn thành.</p>" +
    "<p>Xin cảm ơn bạn đã mua hàng và mong bạn đến với hệ thống của hàng trực tuyến của Phúc Long để đặt đơn hàng mới.</p>" +
    "Trân Trọng,<br>Phúc Long."
  );
};
