"use client";

import ExplorerSideBar from "./ExplorerSidebar";
import ExplorerContent from "./ExplorerContent";

const Explorer = () => {

  return (
    <div className="explorer card">
      <div className="explorer-header d-flex items-center px-2">Files</div>
      <div className="explorer-content-wrapper">
        <ExplorerSideBar />
        <ExplorerContent />
      </div>
    </div>
  );
};
export default Explorer;
