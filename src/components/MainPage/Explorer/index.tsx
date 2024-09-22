"use client";

import { useAppSelector } from "@/util/Hooks";
import Modal from "../../Modal";
import ExplorerSideBar from "./ExplorerSidebar";
import { useMemo, useState } from "react";
import { IsArray } from "@/util";
import ExplorerContent from "./ExplorerContent";

const extentionsIcons = {
  folder: "fa-folder",
  xlsx: "fa-file-excel",
  docx: "fa-file-word",
  pdf: "fa-file-pdf",
  zip: "fa-file-archive",
  svg: "fa-file-code",
  xml: "fa-file-code",
  mp4: "fa-file-video",
  mkv: "fa-file-video",
  mov: "fa-file-video",
  avi: "fa-file-video",
  mp3: "fa-file-audio",
  m4a: "fa-file-audio",
  wav: "fa-file-audio",
  ogg: "fa-file-audio",
  jpeg: "fa-file-image",
  jpg: "fa-file-image",
  png: "fa-file-image",
  gif: "fa-file-image",
  webp: "fa-file-image",
  ico: "fa-file-image",
  html: "fa-file-code",
  css: "fa-file-code",
  scss: "fa-file-code",
  js: "fa-file-code",
  ts: "fa-file-code",
  jsx: "fa-file-code",
  tsx: "fa-file-code",
  json: "fa-file-code",
  md: "fa-file-code",
  php: "fa-file-code",
  pptx: "fa-file-powerpoint",
  other: "fa-file",
  addNew: "fa-plus",
};

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
