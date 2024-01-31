import { SUPPORT_EMAIL } from "config";
import img1 from "assets/images/app-1.png";
import img2 from "assets/images/app-2.png";
import img3 from "assets/images/app-3.png";
import img4 from "assets/images/app-4.png";
import img5 from "assets/images/app-5.png";
import img6 from "assets/images/app-6.png";
import img7 from "assets/images/app-7.png";

import FullPageLayout from "layouts/FullPageLayout";
import MDBox from "components/MDComponents/MDBox";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";
import Instruction from "../components/Instruction";

const info = [
  {
    title: "Kiểm tra lời mời qua Gmail/Outlook",
    description:
      "Sau khi có thông tin về các tài khoản email, nhóm sẽ được tạo lập bởi người quản lý của hệ thống, ta sẽ nhận được mail mời vào nhóm trong ứng dụng MentorUS.",
    subDescription: `Các mail được gửi bởi tài khoản ${SUPPORT_EMAIL} sẽ có lúc được đưa vào Thư rác (Email rác). Bạn vui lòng kiểm tra trong mục này để nhận được lời mời vào nhóm cùng các thông báo khác sau này của ứng dụng và xác nhận không phải spam để email được chuyển đến hộp thư đến.`,
    isReverse: false,
    imgWidth: false,
    image: img1
  },
  {
    title: "Đăng nhập ứng dụng",
    description:
      "Sử dụng tài khoản email (thường là email sinh viên, giảng viên, cán bộ do trường cấp) đã được gửi lời mời tham gia ứng dụng qua Gmail/Outlook để đăng nhập.",
    subDescription: "",
    isReverse: true,
    imgWidth: false,
    image: img2
  },
  {
    title: "Trang chủ ứng dụng",
    description:
      "Hiển thị danh sách các nhóm mà tài khoản tham gia làm quản lý (mentor) và làm thành viên (mentee). Bên cạnh đó, màn hình hỗ trợ tìm kiếm nhóm, hiển thị danh sách thông báo về lịch hẹn và công việc của các nhóm mình tham gia.",
    subDescription:
      "Dưới mục sự kiện sắp tới sẽ hiển thị danh sách các sự kiện về lịch hẹn, công việc gần thời điểm diễn ra hoặc kết thúc (hiển thị tối đa 5 sự kiện).",
    isReverse: false,
    imgWidth: false,
    image: img3
  },
  {
    title: "Nhắn tin, trao đổi, lịch hẹn, công việc,...",
    description:
      "Màn hình hiển thị các tin nhắn của nhóm. Bên cạnh đó cung cấp các chức năng cơ bản khác như gửi ảnh, lên lịch hẹn, tạo bình chọn, tạo định dạng cho tin nhắn, hỗ trợ xóa, sửa, thả biểu cảm,...",
    subDescription: "",
    isReverse: true,
    imgWidth: false,
    image: img4
  },
  {
    title: "Chi tiết nhóm",
    description:
      "Hiển thị các thông tin liên quan đến nhóm bao gồm tất cả hình ảnh, tệp tin, tin nhắn đã ghim, các bình chọn,... cùng danh sách thành viên, các công việc, lịch hẹn đã và đang xảy ra.",
    subDescription:
      "Ngoài ra, FAQ là nơi để các thành viên có thể tạo câu hỏi và câu trả lời chung, có thể tạo mới, cập nhật hoặc import FAQ từ nơi khác.",
    isReverse: false,
    imgWidth: false,
    image: img5
  },
  {
    title: "Màn hình lịch",
    description:
      "Hiển thị thông tin về các lịch hẹn, công việc trong ngày theo các múi giờ. Màn hình cung cấp các chức năng xem chi tiết trong 1 ngày, xem trong 3 ngày và xem trong 1 tuần của tháng.",
    subDescription:
      "Với nút Thêm ở góc cuối bên phải màn hình, ta có thể chọn tạo công việc hoặc tạo lịch hẹn cùng việc chọn nhóm để lên lịch.",
    isReverse: true,
    imgWidth: false,
    image: img6
  },
  {
    title: "Thông tin cá nhân",
    description: "Hiển thị các thông tin cơ bản của cá nhân cùng chức năng cập nhật và upload ảnh.",
    subDescription: "",
    isReverse: false,
    imgWidth: "400px",
    image: img7
  }
];

function MobileLandingPage() {
  return (
    <FullPageLayout>
      <MDBox width="100%" height="100vh" mx="auto">
        <Header isMobile />
        <Home isMobile />
        {info.map((item) => (
          <Instruction
            title={item.title}
            description={item.description}
            subDescription={item.subDescription}
            img={item.image}
            isReverse={item.isReverse}
            imgWidth={item.imgWidth}
            key={item.title}
          />
        ))}
        <Footer />
      </MDBox>
    </FullPageLayout>
  );
}

export default MobileLandingPage;
