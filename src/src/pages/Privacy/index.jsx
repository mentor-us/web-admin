/* eslint-disable import/no-unresolved */
import privacyHtmlDoc from "assets/privacy.html?raw";

export default function Privacy() {
  return (
    <div className="h-full w-full min-h-screen">
      <iframe
        style={{ height: "100dvh", width: "100dvw" }}
        srcDoc={privacyHtmlDoc}
        title="privacy-page"
      />
    </div>
  );
}
