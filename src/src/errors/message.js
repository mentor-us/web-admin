if (!String.format) {
  String.format = function format(str, ...args) {
    return str.replace(/{(\d+)}/g, function replace(match, number) {
      return typeof args[number] !== "undefined" ? args[number] : match;
    });
  };
}

const messages = {
  100: "Bạn không có quyền thực hiện chức năng này!",
  104: "Tài khoản không tồn tại!",
  107: "Tài khoản đã tồn tại!",
  111: "Vui lòng điền đầy đủ thông tin bắt buộc!",
  204: "Nhóm không tồn tại!",
  207: "Tên nhóm đã tồn tại!",
  208: "Loại nhóm không tồn tại!",
  209: "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc!",
  210: "Không được nhập trùng email {0}!",
  211: "Vui lòng điền đầy đủ thông tin!",
  213: "Không tìm thấy mentee này trong nhóm!",
  214: "Không tìm thấy mentor này trong nhóm!",
  215: "Thời gian kết thúc quá xa so với thời gian bắt đầu!",
  216: "Thời gian bắt đầu quá xa so với thời điểm hiện tại!",
  217: "Thời gian kết thúc phải lớn hơn thời điểm hiện tại!",
  218: "Email không hợp lệ!",
  219: "Email có phần đuôi không hợp lệ!",
  220: "Vai trò không hợp lệ!",
  221: "Tập tin import không hợp lệ!",
  401: "401", // dùng để trả ra thông báo token hết hạn đã config từ interceptor
  404: "Không tìm thấy loại nhóm!",
  407: "Loại nhóm đã tồn tại!",
  701: "Tài khoản này không có quyền admin của hệ thống. Vui lòng đăng nhập tài khoản khác!",
  704: "Tài khoản không tồn tại. Vui lòng đăng nhập tài khoản khác!",
  705: "Tài khoản đã bị khóa. Vui lòng đăng nhập tài khoản khác!",
  706: "Tài khoản không thuộc Google hoặc Microsoft. Vui lòng đăng nhập tài khoản khác!",
  903: "Không tìm thấy thành viên {0}!",
  904: "Dữ liệu cập nhật của thành viên {0} không hợp lệ. Vui lòng kiểm tra lại!"
};

export default function getMessage(code, data) {
  return messages[code]
    ? String.format(messages[code], data)
    : "Có lỗi trong quá trình xử lý. Vui lòng thực hiện lại!";
}
