export default function getMessage(returnCode, data) {
  switch (returnCode) {
    case 100:
      return "Bạn không có quyền thực hiện chức năng này!";
    case 104:
      return "Tài khoản không tồn tại!";
    case 107:
      return "Tài khoản đã tồn tại!";
    case 111:
      return "Vui lòng điền đầy đủ thông tin bắt buộc!";
    case 204:
      return "Nhóm không tồn tại!";
    case 207:
      return "Tên nhóm đã tồn tại!";
    case 208:
      return "Loại nhóm không tồn tại!";
    case 209:
      return "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc!";
    case 210:
      return `Không được nhập trùng email ${data}!`;
    case 211:
      return "Vui lòng điền đầy đủ thông tin!";
    case 213:
      return "Không tìm thấy mentee này trong nhóm!";
    case 214:
      return "Không tìm thấy mentor này trong nhóm!";
    case 215:
      return "Thời gian kết thúc quá xa so với thời gian bắt đầu!";
    case 216:
      return "Thời gian bắt đầu quá xa so với thời điểm hiện tại!";
    case 217:
      return "Thời gian kết thúc phải lớn hơn thời điểm hiện tại!";
    case 218:
      return "Email không hợp lệ!";
    case 219:
      return "Email có phần đuôi không hợp lệ!";
    case 220:
      return "Vai trò không hợp lệ!";
    case 221:
      return "Tập tin import không hợp lệ!";
    case 401:
      return "401"; // dùng để trả ra thông báo token hết hạn đã config từ interceptor
    case 404:
      return "Không tìm thấy loại nhóm!";
    case 407:
      return "Loại nhóm đã tồn tại!";
    case 701:
      return "Tài khoản này không có quyền admin của hệ thống. Vui lòng đăng nhập tài khoản khác!";
    case 704:
      return "Tài khoản không tồn tại. Vui lòng đăng nhập tài khoản khác!";
    case 705:
      return "Tài khoản đã bị khóa. Vui lòng đăng nhập tài khoản khác!";
    case 706:
      return "Tài khoản không thuộc Google hoặc Microsoft. Vui lòng đăng nhập tài khoản khác!";
    case 903:
      return `Không tìm thấy thành viên ${data}!`;
    case 904:
      return `Dữ liệu cập nhật của thành viên ${data} không hợp lệ. Vui lòng kiểm tra lại!`;
    default:
      return "Có lỗi trong quá trình xử lý. Vui lòng thực hiện lại!";
  }
}
