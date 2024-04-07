import React from "react";

import logo from "assets/images/logo_mentorus.jpg";

export default function WelcomeGroup() {
  return (
    <div className="bg-slate-50 h-full flex justify-center items-center">
      <div className="font-normal flex flex-col justify-center items-center max-w-96 gap-y-4">
        <p className="text-center text-2xl">
          Chào mừng đến với <strong className=""> MentorUs Web</strong>
        </p>
        <div className="flex justify-center items-center w-72">
          <img className="rounded" src={logo} alt="logo-mentorus" />
        </div>
        <p className="text-center text-sm">
          Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng mentor và mentee của bạn
        </p>
      </div>
    </div>
  );
}
