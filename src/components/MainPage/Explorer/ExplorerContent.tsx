"use client";

import { useAppSelector } from "@/util/Hooks";
import Modal from "../../Modal";
import ExplorerSideBar from "./ExplorerSidebar";
import { useMemo, useState } from "react";
import { IsArray, IsEmpty } from "@/util";
import { RecurciveFileItem } from "@/types";
import NoFiles from "./NoFIles";

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

const ExplorerContentItem = (props: { item: RecurciveFileItem }) => {
  const { item } = props;
  const { name, id, type, extention } = item;

  const cleanedExtention = useMemo(() => {
    let ext = type === "file" ? `${extention}` : "folder";
    if (ext.charAt(0) === ".") ext = ext.substring(1, ext.length);
    return ext;
  }, [extention]);
  const icon = extentionsIcons[cleanedExtention as keyof typeof extentionsIcons]
    ? extentionsIcons[cleanedExtention as keyof typeof extentionsIcons]
    : extentionsIcons.other;

  return (
    <>
      <div className="explorer-item" key={id} tabIndex={-1}>
        <div className="explorer-item-thumbnail d-flex items-center justify-center">
          <i className={`fal ${icon}`}></i>
          <div className="explorer-item-menu d-flex justify-between items-center">
            <div className="checkbox-wrapper">
              <div className="round">
                <input
                  type="checkbox"
                  name="files"
                  id={`checkbox-${id}`}
                  value={id}
                />
                <label htmlFor={`checkbox-${id}`}></label>
              </div>
            </div>
            <button className="more-menu-button" type="button">
              <i className="fal fa-ellipsis-h"></i>
              <div className="more-menu-container">
                <div className="more-menu-item items-center justify-start">
                  <i className="fal fa-pen"></i>
                  <span>Rename</span>
                </div>
                <div className="more-menu-item items-center justify-start">
                  <i className="fal fa-arrow-to-bottom"></i>
                  <span>Download</span>
                </div>
                <div className="more-menu-item items-center justify-start">
                  <i className="fal fa-trash"></i>
                  <span>Delete</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="explorer-item-name d-flex items-center justify-center">
          {name}
        </div>
      </div>
    </>
  );
};

const ExplorerContent = () => {
  const currentExplorerRoute = useAppSelector(
    (state) => state.explorer.currentExplorerRoute
  );
  const visibleFiles = useAppSelector((state) => state.explorer.visibleFiles);
  const { type, id, children } = currentExplorerRoute || {};

  const FilesList = useMemo(() => {
    if (
      visibleFiles &&
      IsArray(visibleFiles) &&
      visibleFiles.length > 0 &&
      type === "folder" &&
      id &&
      !IsEmpty(id)
    ) {
      return visibleFiles.filter(
        (item: RecurciveFileItem) => item.dirId === id
      );
    }
    return [];
  }, [type, visibleFiles, id]);
  const FoldersList = useMemo(
    () =>
      children && IsArray(children) && children.length > 0 ? children : [],
    [children]
  );
  console.log(FoldersList, FilesList, currentExplorerRoute)
  const isEmpty = FilesList.length === 0 && FoldersList.length === 0;
  return (
    <div className="explorer-content scrollable">
      {FoldersList.map((item) => (
        <ExplorerContentItem item={item} />
      ))}
      {FilesList.map((item) => (
        <ExplorerContentItem item={item} />
      ))}
        {isEmpty ? <NoFiles /> : <></>}
    </div>
  );

};
export default ExplorerContent;
