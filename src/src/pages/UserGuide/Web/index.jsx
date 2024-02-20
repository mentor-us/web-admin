import img1 from "assets/images/1.png";
import img2 from "assets/images/2.png";
import img4 from "assets/images/4.png";
import img5 from "assets/images/5.png";
import img6 from "assets/images/6.png";
import img7 from "assets/images/7.png";
import img8 from "assets/images/8.png";
import img9 from "assets/images/9.png";
import EditAccount from "assets/images/EditAccount.png";
import exportAccount from "assets/images/exportAccount.png";
import exportGroupActivities from "assets/images/exportGroupActivities.png";
import flow from "assets/images/flow.png";
import groupSearch from "assets/images/groupSearch.png";
import grouptypeSearch from "assets/images/grouptypeSearch.png";
import ImportAccount from "assets/images/ImportAccount.png";
import managerAccountOption from "assets/images/managerAccountOption.png";
import managerGroup from "assets/images/managerGroup.png";
import managerMemberGroup from "assets/images/managerMemberGroup.png";
import optionGroupType from "assets/images/optionGroupType.png";

import FullPageLayout from "layouts/FullPageLayout";
import Instruction from "pages/LandingPage/components/Instruction";
import MDBox from "components/MDComponents/MDBox";

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
    title: "Tìm Kiếm Nhóm",
    description:
      "Ta có thể tìm kiếm nhóm bằng tên nhóm, loại nhóm, email thành viên, trang thái, thời gian bắt đầu và thời gian kết thúc.",
    subDescription: ``,
    isReverse: false,
    imgWidth: false,
    image: groupSearch
  },
  {
    title: "Quá trình tạo nhóm trong hệ thống",
    description:
      "Sau khi quản trị viên tạo một hoặc nhiều nhóm, hệ thống sẽ tự động gửi email mời tham gia đến các tài khoản đã được thêm vào (các tài khoản trong phần Email Mentor/Mentee), nhằm mời họ tham gia vào các nhóm đã được tạo. Sau khi đăng nhập vào ứng dụng MentorUS, những tài khoản này sẽ thấy các nhóm hiển thị trong mục Home.",
    subDescription: `Khi tạo nhóm mới, quản trị viên bắt buộc phải chọn một loại nhóm đang có trạng thái "Hoạt động" trong hệ thống. Nếu không có loại nhóm mong muốn, quản trị viên có thể tạo một loại nhóm mới và tiếp tục quá trình tạo nhóm.`,
    isReverse: true,
    imgWidth: false,
    image: flow
  },
  {
    title: "Màn hình Chi tiết nhóm",
    description:
      "Hiển thị thông tin chính của nhóm cùng danh sách Mentor, Mentee. Ngoài ra, có thể thực hiện xuất excel danh sách, thêm mới/xóa mentor.",
    subDescription:
      "Nhấn vào nút có biểu tượng cây bút để sửa thông tin một nhóm. Để khoá một nhóm, bạn phải truy cập vào trang chi tiết của nhóm. Các nhóm bị khoá thì sẽ bị chặn không truy cập được. Nhấn vào nút có biểu tượng ổ khoá màu vàng. Để xoá một nhóm nhấn nút có biểu tượng thùng rác màu đỏ.",
    isReverse: false,
    imgWidth: false,
    image: managerGroup
  },
  {
    title: "Quản lý thành viên nhóm",
    description:
      "Đầu tiên là nhấn vào dấu ba chấm dọc trên dòng thành viên bạn muốn đổi vai trò. Sau đó sẽ có nút “Chuyển thành Mentee” xuất hiện. Nếu vai trò đang là Mentor thì sẽ được sang Mentee. Để đổi sang Mentor thì làm tương tụ.",
    subDescription:
      "Để xoá thành viên ra khỏi nhóm, cần phải nhấn vào dấu ba chấm dọc tại dòng thành viên bạn muốn xoá. Sau đó nhấn nút “Xoá” màu đỏ. Xem hình bên dưới.",
    isReverse: true,
    imgWidth: false,
    image: managerMemberGroup
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
    title: "Tìm kiếm loại nhóm",
    description: "Có thể tìm kiếm loại nhóm bằng tên và trạng thái loại nhóm đó.",
    subDescription: "",
    isReverse: true,
    imgWidth: false,
    image: grouptypeSearch
  },
  {
    title: "Chỉnh sửa và xoá loại nhóm",
    description: "Nhấn nút 3 chấm ở cuối dòng để chọn Sửa hoặc Xóa.",
    subDescription:
      "Có thể đổi tên loại nhóm, mô tả, hình ảnh đại diện và quyền ứng dụng. Trước khi xoá sẽ có hai lựa chọn. Xoá hết tất cả các nhóm thuộc loại nhóm đó và xoá luôn loại nhóm. Chỉ xoá loại nhóm và chuyển các nhóm thuộc loại đó qua một loại nhóm khác.",
    isReverse: false,
    imgWidth: false,
    image: optionGroupType
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
    title: "Nhập danh sách tài khoản",
    description:
      "Chọn nút “Import” ở trên màn hình. Một cửa sổ hiện ra, tại đây, có thể tải file excel mẫu để có thể nhập vào một danh sách tài khoản để nhập vào hệ thống. Sau khi nhập xong, kéo thả file vào ô và nhấn “Xác nhận” để nhập danh sách tài khoản mới.",
    subDescription: "",
    isReverse: true,
    imgWidth: false,
    image: ImportAccount
  },
  {
    title: "Xuất danh sách tài khoản",
    description:
      "Để xuất tài khoản ra tập tin Excel, ta chọn nút “Xuất excel”. Cấu trúc tập tin Excel khi xuất ra sẽ có định dạng như trong hình",
    subDescription: "",
    isReverse: false,
    imgWidth: false,
    image: exportAccount
  },
  {
    title: "Sửa thông tin một tài khoản",
    description:
      "Bấm vào tên email của người dùng sẽ đi đến trang chi tiết, ở trang chi tiết chọn vào biểu tượng bút chì màu xanh sẽ mở ra cửa sổ nhỏ cho phép chỉnh sửa thông tin của tài khoản.",
    subDescription: "",
    isReverse: true,
    imgWidth: false,
    image: EditAccount
  },
  {
    title: "Xóa và khóa tài khoản",
    description:
      "Các tài khoản bị khóa sẽ không đăng nhập vào được ứng dụng của hệ thống. Có nhiều các để khóa tài khoản. Khóa trực tiếp ở màn hình danh sách tài khoản. Các tài khoản bị xóa sẽ không khôi phục lại được và được đánh dấu là đã xóa.",
    subDescription: "",
    isReverse: false,
    imgWidth: false,
    image: managerAccountOption
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
  },
  {
    title: "Xuất các hoạt động về nhóm",
    description: "Xuất báo cáo sẽ xuất tập tin PDF về nhóm.",
    subDescription:
      "Xuất chi tiết sẽ xuất tập tin Excel về toàn bộ thông tin kèm tin nhắn hoặc lịch hẹn hoặc công việc trong nhóm đó.",
    isReverse: false,
    imgWidth: false,
    image: exportGroupActivities
  }
];

function WebAdminGuildline() {
  return (
    <FullPageLayout>
      <MDBox width="100%" height="100vh" mx="auto">
        <section
          style={{
            padding: "20px 0",
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <div className="instruction__text animate__animated animate__fadeInDown animate__slow animate__delay-2s">
            <h2>Hướng dẫn sử dụng trang web MentorUS Admin</h2>
          </div>
        </section>
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
        <section
          style={{
            padding: "20px 0",
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <div className="instruction__text animate__animated animate__fadeInDown animate__slow animate__delay-2s">
            <h2>Hết</h2>
          </div>
        </section>
      </MDBox>
    </FullPageLayout>
  );
}

export default WebAdminGuildline;
