import { DeleteFile, GetFilesByDirectory } from "@/lib/api/explorer.api";
import { extentionsIcons } from "@/lib/const";
import { removeFiles, setCurrentExplorerRoute, setVisibleFiles } from "@/lib/store/slices/explorerSlice";
import { RecurciveFileItem } from "@/types";
import { IsArray, IsEmpty } from "@/util";
import { useAppDispatch, useAppSelector } from "@/util/Hooks";
import { useMemo, useState } from "react";
import NoFiles from "./NoFIles";

const SideBarFileItem = ({
    file,
    isRootFolder,
    addFolder,
    uploadFile,
  }: {
    file: RecurciveFileItem;
    isRootFolder?: boolean;
    addFolder?: (dirId: string | any) => void;
    uploadFile?: (dirId: string | any) => void;
  }) => {
    const dispatch = useAppDispatch();
    const { dirId, name, extention, type, id, children } = file;
    const visibleFiles = useAppSelector((state) => state.explorer.visibleFiles);
    const [isLoadingFolder, setIsLoadingFolder] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
  
    const cleanedExtention = useMemo(() => {
      let ext = type === "file" ? `${extention}` : "folder";
      if (ext.charAt(0) === ".") ext = ext.substring(1, ext.length);
      return ext;
    }, [extention]);
    const icon = extentionsIcons[cleanedExtention as keyof typeof extentionsIcons]
      ? extentionsIcons[cleanedExtention as keyof typeof extentionsIcons]
      : extentionsIcons.other;
  
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
  
    const isEmpty = FilesList.length === 0 && FoldersList.length === 0;
  
    function DeleteSelf() {
      if(id){
          setIsDeleting(true);
          DeleteFile(id).then(()=>{
              dispatch(removeFiles(id))
          }).finally(() => {
            setIsDeleting(false);
          });
      }
    }
    function Fetch(id : string) {
      setIsLoadingFolder(true);
      GetFilesByDirectory(id)
        .then((data) => {
          dispatch(setVisibleFiles(data));
        })
        .finally(() => setIsLoadingFolder(false));
    }
  
    if (isRootFolder) {
      return (
        <>
          {FoldersList.map((item) => (
            <SideBarFileItem
              uploadFile={uploadFile}
              addFolder={addFolder}
              key={item.id}
              file={item}
            />
          ))}
          {FilesList.map((item) => (
            <SideBarFileItem key={item.id} file={item} />
          ))}
        </>
      );
    }
  
    return (
      <div className={`collapsible-contianer ${isDeleting ? 'skeleton' : ''}`} onClick={()=>{
        dispatch(setCurrentExplorerRoute(file))
      }}>
        <input
          type="checkbox"
          id={`file-${id}`}
          onChange={(e) => {
            if (e.target.checked && type === "folder" && id) Fetch(id);
          }}
        />
        <label
          htmlFor={`file-${id}`}
          className="collapsible-label d-flex items-center justify-between"
        >
          <div>
            <i className={`fal ${icon} mr-1`}></i>
            <span>{name}</span>
          </div>
          <div className="explorer-item-menu d-flex justify-between items-center">
            <button className="more-menu-button" type="button">
              <i className="fal fa-ellipsis-h"></i>
              <div className="more-menu-container">
                {type === "folder" ? (
                  <>
                    <div
                      className="more-menu-item items-center justify-start"
                      onClick={() => {
                        if (addFolder) addFolder(id);
                      }}
                    >
                      <i className="fal fa-plus"></i>
                      <span>New Folder</span>
                    </div>
                    <div
                      className="more-menu-item items-center justify-start"
                      onClick={() => {
                        if (uploadFile) uploadFile(id);
                      }}
                    >
                      <i className="fal fa-cloud-upload"></i>
                      <span>Upload</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="more-menu-item items-center justify-start">
                  <i className="fal fa-pen"></i>
                  <span>Rename</span>
                </div>
                <div className="more-menu-item items-center justify-start">
                  <i className="fal fa-arrow-to-bottom"></i>
                  <span>Download</span>
                </div>
                <div
                  className="more-menu-item items-center justify-start"
                  onClick={() => {
                    DeleteSelf();
                  }}
                >
                  <i className="fal fa-trash"></i>
                  <span>Delete</span>
                </div>
              </div>
            </button>
          </div>
          {type === "folder" ? <i className="fal fa-chevron-down"></i> : <></>}
        </label>
        {type === "folder" ? (
          <div
            className={`collapsible-content ${isLoadingFolder ? "skeleton" : ""}`}
          >
            {FoldersList.map((item) => (
              <SideBarFileItem
                uploadFile={uploadFile}
                addFolder={addFolder}
                key={item.id}
                file={item}
              />
            ))}
            {FilesList.map((item) => (
              <SideBarFileItem key={item.id} file={item} />
            ))}
            {isEmpty ? <NoFiles /> : <></>}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  export default SideBarFileItem;