import React from "react";

export default function Note() {
  return (
    <>
      <span className="text-blue-500 pb-1">
        <strong className="font-bold uppercase">Ghi chú</strong>
      </span>
      <div className="flex flex-col gap-y-2 mb-2">
        <div className="flex flex-row gap-x-3 text-orange-500">
          <div className="w-4 bg-orange-500" /> Công việc
        </div>
        <div className="flex flex-row gap-x-3 text-blue-500">
          <div className="w-4 bg-blue-500" /> Lịch hẹn
        </div>
      </div>
    </>
  );
}
