export default function GroupMeeting() {
  return (
    <div className="bg-white w-full max-w-screen-md shadow-md my-2 p-3 pt-10 relative border-2 border-gray-200">
      <div className="bg-blue-500 absolute top-1 right-0 px-2 py-2 ">
        <p className="text-white  text-xs text-center">23:43 - 12-34 hôm nay</p>
      </div>
      <div className="absolute top-1 left-0 px-2 py-2 border-l-4 border-blue-500 rounded-r-md ">
        <p className="text-blue-500 text-sm font-bold">Lịch hẹn</p>
      </div>
      <p className="text-black text-xl">hau nguyen</p>
      <p className="text-gray-500 text-sm">Người tổ chức: Hau nef</p>
    </div>
  );
}
