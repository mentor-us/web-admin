/* eslint-disable import/no-unresolved */
import termofservice from "assets/term-of-service.html?raw";

export default function TermOfService() {
  return (
    <div className="h-full w-full min-h-screen">
      <iframe
        style={{ height: "100dvh", width: "100dvw" }}
        srcDoc={termofservice}
        title="tos-page"
      />
    </div>
  );
}
