import img1 from "assets/images/app-1.png";
import img2 from "assets/images/app-2.png";
import img6 from "assets/images/app-6.png";
import img7 from "assets/images/app-7.png";
import img8 from "assets/images/app-9.png";
import img9 from "assets/images/app-10.png";
import img10 from "assets/images/app-11.png";
import img11 from "assets/images/app-12.png";
import img12 from "assets/images/app-13.png";
import img13 from "assets/images/app-14.png";
import img14 from "assets/images/app-15.png";
import img15 from "assets/images/app-16.png";
import img16 from "assets/images/app-17.png";
import img17 from "assets/images/app-18.png";

import FullPageLayout from "layouts/FullPageLayout";
import MDBox from "components/MDComponents/MDBox";

import Footer from "../components/Footer";
import Header from "../components/Header";
// import Home from "../components/Home";
import Instruction from "../components/Instruction";

const info = [
  {
    title: "Kiểm tra lời mời qua Gmail/Outlook",
    description:
      "Sau khi nhận thông tin về các địa chỉ email, người quản lý hệ thống sẽ tạo nhóm và gửi một email mời bạn tham gia vào nhóm trên ứng dụng MentorUS.",
    subDescription: `Các email gửi từ tài khoản Google hoặc Microsoft đôi khi có thể bị đưa vào thư rác. Vui lòng kiểm tra trong thư rác để nhận lời mời vào nhóm cũng như các thông báo khác từ ứng dụng. Sau đó, xác nhận rằng email không phải là spam để có thể nhận được email trong hộp thư đến chính.`,
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
    category: "Quản lý thông tin cá nhân",
    title: "Thông tin cá nhân",
    description: "Hiển thị các thông tin cơ bản của cá nhân cùng chức năng cập nhật và upload ảnh.",
    subDescription: "",
    isReverse: false,
    imgWidth: "400px",
    image: img7
  },
  {
    category: "Quản lý thông tin cá nhân",
    title: "Cập nhật thông tin",
    description:
      "Để cập nhật thông tin cá nhân, bạn chỉ cần nhấn nút 'Cập nhật' trên màn hình. Tiếp theo, chỉnh sửa thông tin cần thiết và nhấn vào biểu tượng dấu tick để xác nhận và cập nhật thông tin. Quy trình này giúp bạn cập nhật thông tin 1 cách nhanh chóng..",
    subDescription: "",
    isReverse: false,
    imgWidth: "400px",
    image: img7
  },
  {
    category: "Quản lý thông tin cá nhân",
    title: "Liên kết email",
    description:
      "Để thêm email, bạn chỉ cần nhấn nút 'Thêm email' trên màn hình. Tiếp theo thêm thông tin email cần thêm vào và nhấn vào biểu tượng dấu tick để xác nhận và cập nhật thông tin. Quy trình này giúp bạn thêm thông tin email.",
    subDescription: "",
    isReverse: false,
    imgWidth: "400px",
    image: img8
  },
  {
    category: "Trang chủ",
    title: "Phân loại nhóm",
    description:
      "Trong ứng dụng MentorUs, nhóm được phân thành hai loại chính: Nhóm Quản lý và Nhóm Thành viên. Trong Nhóm Quản lý, người dùng đảm nhận vai trò của Mentor, không chỉ có các chức năng cơ bản mà còn được trang bị một số quyền đặc biệt. Mentor có khả năng tạo kênh chat riêng, tạo FAQ (Câu hỏi Thường gặp), và ghim thành viên để theo dõi hoạt động của họ một cách hiệu quả.",
    subDescription:
      "Để tham gia vào một nhóm cụ thể, người dùng chỉ cần nhấn vào biểu tượng ở góc trái trên cùng bên phải của màn hình. Từ đó, họ có thể lựa chọn giữa Nhóm Quản lý và Nhóm Thành viên, tùy thuộc vào sự quan tâm và mục tiêu của họ trong cộng đồng MentorUs. Chức năng này giúp người dùng dễ dàng tương tác và tham gia vào nhóm phù hợp với mong muốn và nhu cầu cá nhân của họ.",
    isReverse: false,
    imgWidth: false,
    image: img9
  },
  {
    category: "Quản lý nhóm",
    title: "Kênh",
    description:
      "Khi bạn nhấn vào một nhóm cụ thể, bạn sẽ được chuyển đến phần quản lý nhóm. Tại đây, bạn có thể lựa chọn kênh mà bạn muốn tham gia để thực hiện trò chuyện.",
    subDescription:
      "Kênh cũng cung cấp một không gian hiển thị những tin nhắn riêng tư giữa bạn và một đối tượng cụ thể..",
    isReverse: false,
    imgWidth: false,
    image: img10
  },
  {
    category: "Quản lý nhóm",
    title: "Bộ sưu tập ảnh và thông tin đã gửi",
    description:
      "Trong quản lý nhóm, bạn có thể xem lại tất cả ảnh và tập tin đã được gửi, tạo ra sự thuận tiện và quản lý linh hoạt các nội dung chia sẻ trong nhóm của bạn.",
    isReverse: false,
    imgWidth: false,
    image: img11
  },
  {
    category: "Quản lý nhóm",
    title: "Thành viên nhóm",
    description:
      "Phần 'Thành viên nhóm' giúp bạn dễ dàng xem và quản lý thành viên, bao gồm cả xem thông tin và nhắn tin riêng với từng thành viên trong nhóm.",
    isReverse: false,
    imgWidth: false,
    image: img12
  },
  {
    category: "Quản lý nhóm",
    title: "Lich hẹn",
    description:
      "'Lịch hẹn' giúp bạn xem danh sách và chi tiết các lịch hẹn chưa tới cũng như đã qua, đồng thời cho phép bạn tạo mới các lịch hẹn cho nhóm. Điều này giúp quản lý thời gian và tương tác nhóm một cách hiệu quả.    ",
    isReverse: false,
    imgWidth: false,
    image: img13
  },
  {
    category: "Quản lý nhóm",
    title: "Công việc",
    description:
      "Phần 'Công việc' cho phép bạn xem nhanh các công việc đã giao, của bạn, cũng như công việc sắp tới và đã qua. Bạn cũng có thể tạo công việc mới một cách thuận lợi từ phần này.",
    isReverse: false,
    imgWidth: false,
    image: img14
  },
  {
    category: "Quản lý nhóm",
    title: "Bảng tin",
    description:
      "Để thực hiện bình chọn, bạn có thể sử dụng chức năng bình chọn có sẵn trong ứng dụng. Đơn giản chỉ cần chọn tùy chọn hoặc ý kiến mà bạn muốn bình chọn và xác nhận.",
    isReverse: false,
    imgWidth: false,
    image: img15
  },
  {
    category: "Quản lý nhóm",
    title: "FAQ",
    description:
      "Phần 'FAQ' (Câu hỏi Thường gặp) cung cấp thông tin chi tiết về các câu hỏi mà người dùng thường xuyên đặt. Điều này giúp người dùng tự tìm hiểu và giải quyết vấn đề một cách nhanh chóng mà không cần phải liên hệ trực tiếp. Nếu có thêm câu hỏi, bạn cũng có thể tạo mới để nhận được hỗ trợ chi tiết từ cộng đồng hoặc quản trị viên. Thêm vào đó, bạn còn có khả năng chọn câu hỏi từ nhóm khác, mở rộng khối lượng thông tin hữu ích và đa dạng cho người dùng.",
    isReverse: false,
    imgWidth: false,
    image: img16
  },
  {
    category: "Nhắn tin",
    description:
      "Phần 'Nhắn tin' cho phép bạn gửi và nhận tin nhắn, tương tác trực tiếp với thành viên trong nhóm hoặc mentor của mình. Bạn cũng có thể chọn kênh nhắn tin cụ thể và bắt đầu cuộc trò chuyện một cách dễ dàng. ",
    subDescription: `Những tùy chọn để quản lý tin nhắn (Chỉnh sửa, xóa, Pin, Sao chép, Phản hồi, Chuyển tiếp, React)`,
    isReverse: false,
    imgWidth: "400px",
    image: img17
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
  }
];

function MobileUserGuide() {
  return (
    <FullPageLayout>
      <MDBox width="100%" height="100vh" mx="auto">
        <Header isMobile />
        {/* <Home isMobile /> */}
        {info.map((item) => (
          <Instruction
            title={item.title}
            description={item.description}
            subDescription={item.subDescription}
            category={item.category}
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

export default MobileUserGuide;
