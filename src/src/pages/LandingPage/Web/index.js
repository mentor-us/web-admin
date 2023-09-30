import React from "react";
import FullPageLayout from "layouts/FullPageLayout";
import MDBox from "components/MDComponents/MDBox";

import img1 from "assets/images/1.png";
import img2 from "assets/images/2.png";
import img3 from "assets/images/3.png";
import img4 from "assets/images/4.png";
import img5 from "assets/images/5.png";
import img6 from "assets/images/6.png";
import img7 from "assets/images/7.png";
import img8 from "assets/images/8.png";
import img9 from "assets/images/9.png";
import flow from "assets/images/flow.png";

import Header from "../components/Header";
import Home from "../components/Home";
import Instruction from "../components/Instruction";
import Footer from "../components/Footer";

const info = [
  {
    title: "Đăng nhập trang web dành cho quản trị viên",
    description:
      "Sử dụng tài khoản email đã điền trong form để đăng nhập vào ứng dụng web dành cho quản trị viên.",
    subDescription: "",
    isReverse: false,
    imgWidth: false,
    image: img1
  },
  {
    title: "Màn hình Quản lý Nhóm",
    description:
      "Trang Quản lý Nhóm cho phép bạn quản lý danh sách nhóm mà bạn đã tạo. Giao diện này cung cấp các chức năng cơ bản sau: tìm kiếm nhóm, xuất danh sách dưới dạng tệp Excel, thêm một hoặc nhiều nhóm (sử dụng tệp Excel), chỉnh sửa, xóa và xem thông tin chi tiết của một nhóm (bằng cách nhấp vào tên nhóm tương ứng).",
    subDescription: `Trong phần nhập Email mentor, mentee của chức năng "Thêm nhóm mới", bạn không chỉ có thể chọn từ những email được đề xuất có sẵn trên hệ thống, mà còn có thể thêm những email không có sẵn hoặc nhập danh sách email bằng cách sử dụng nút "Tải lên" bên cạnh.
      `,
    isReverse: true,
    imgWidth: false,
    image: img2
  },
  {
    title: "Quá trình tạo nhóm trong hệ thống",
    description:
      "Sau khi quản trị viên tạo một hoặc nhiều nhóm, hệ thống sẽ tự động gửi email mời tham gia đến các tài khoản đã được thêm vào (các tài khoản trong phần Email Mentor/Mentee), nhằm mời họ tham gia vào các nhóm đã được tạo. Sau khi đăng nhập vào ứng dụng MentorUS, những tài khoản này sẽ thấy các nhóm hiển thị trong mục Home.",
    subDescription: `Khi tạo nhóm mới, quản trị viên bắt buộc phải chọn một loại nhóm đang có trạng thái "Hoạt động" trong hệ thống. Nếu không có loại nhóm mong muốn, quản trị viên có thể tạo một loại nhóm mới và tiếp tục quá trình tạo nhóm.`,
    isReverse: false,
    imgWidth: false,
    image: flow
  },
  {
    title: "Màn hình Chi tiết nhóm",
    description:
      "Hiển thị thông tin chính của nhóm cùng danh sách Mentor, Mentee. Ngoài ra, có thể thực hiện xuất excel danh sách, thêm mới/xóa mentor, mentee hoặc chuyển mentor thành mentee và ngược lại.",
    subDescription: "",
    isReverse: true,
    imgWidth: false,
    image: img3
  },
  {
    title: "Màn hình Quản lý loại nhóm",
    description:
      "Hiển thị thông tin về loại nhóm và cung cấp các chức năng tìm kiếm, thêm, xóa, sửa loại nhóm và xuất danh sách dưới dạng Excel.",
    subDescription:
      "Mỗi loại nhóm cung cấp các quyền cơ bản của ứng dụng di động như nhắn tin, gửi ảnh, lên lịch hẹn, ... và có thể được chọn thêm các quyền ứng dụng như quản lý công việc và gửi file tùy theo nhu cầu trong chức năng Thêm và Sửa.",
    isReverse: false,
    imgWidth: false,
    image: img4
  },
  {
    title: "Màn hình Quản lý tài khoản",
    description:
      "Hiển thị thông tin về các tài khoản đang có trên hệ thống. Màn hình cung cấp chức năng thêm mới để thêm động một hay nhiều tài khoản gồm 1 trong 3 vai trò: Quản trị viên cấp cao, Quản trị viên, Người dùng ứng dụng. Các tài khoản được thêm mới từ việc tạo nhóm mới cũng sẽ được thêm tự động vào danh sách tài khoản hệ thống này.",
    subDescription:
      "Vai trò Quản trị viên cấp cao sẽ quản lý chung tất cả các nhóm và tài khoản có trên hệ thống. Vai trò Quản trị viên chỉ quản lý các nhóm do mình tạo ra và các tài khoản cấp Quản trị viên và Người dùng.",
    isReverse: true,
    imgWidth: false,
    image: img5
  },
  {
    title: "Màn hình Chi tiết tài khoản",
    description:
      "Cung cấp thông tin cơ bản về một tài khoản trên hệ thống. Bên cạnh đó, màn hình cung cấp các thông tin về danh sách nhóm do người đó tham gia làm mentor (nhóm quản lý) và làm mentee (nhóm thành viên)",
    subDescription: "",
    isReverse: false,
    imgWidth: false,
    image: img6
  },
  {
    title: "Màn hình Hoạt động",
    description:
      "Hiển thị số liệu thống kê tổng quát về các nhóm của hệ thống. Hệ thống hiển thị biểu đồ trực quan về số liệu tổng số nhóm, tài khoản, tin nhắn, cuộc hẹn, công việc theo 12 tháng trong năm cùng danh sách các nhóm với số liệu thống kê tương ứng.",
    subDescription:
      "Với chức năng lọc theo loại nhóm, ta có thể thống kê được số liệu của các nhóm thuộc loại nhóm đó. Để xem chi tiết về các hoạt động của các thành viên trong nhóm, nhấn vào Tên nhóm tương ứng.",
    isReverse: true,
    imgWidth: false,
    image: img7
  },
  {
    title: "Màn hình Chi tiết Hoạt động",
    description:
      "Cung cấp thông tin về số liệu thống kê được từ ứng dụng mobile của MentorUS. Màn hình sẽ hiển thị trực quan các số liệu về trạng thái hoạt động của các thành viên trong nhóm, từ đó đưa ra cơ sở đánh giá về mức độ năng nổ.",
    subDescription:
      "Màn hình cung cấp 2 chức năng xuất excel: một là xuất danh sách thống kê các thành viên trong nhóm, hai là xuất báo cáo số liệu và xuất nội dung về tất cả các cuộc hẹn, tất cả công việc, tất cả tin nhắn đã có trong nhóm.",
    isReverse: false,
    imgWidth: false,
    image: img8
  },
  {
    title: "Cấu hình thông số",
    description: "Thông số cấu hình về thời gian tối đa của một nhóm.",
    subDescription:
      "Được tính từ lúc chọn thời gian bắt đầu đến khi thời gian kết thúc của nhóm phải không được vượt quá thời gian của thông số cấu hình.",
    isReverse: true,
    imgWidth: false,
    image: img9
  }
];

function WebLandingPage() {
  return (
    <FullPageLayout>
      <MDBox width="100%" height="100vh" mx="auto">
        <Header isMobile={false} />
        <Home />
        {info.map((item) => (
          <Instruction
            title={item.title}
            description={item.description}
            subDescription={item.subDescription}
            img={item.image}
            isReverse={item.isReverse}
            key={item.title}
          />
        ))}
        <Footer />
      </MDBox>
    </FullPageLayout>
  );
}

export default WebLandingPage;
