import { extentionsIcons } from "@/lib/const";
import { RecurciveFileItem } from "@/types";
import { IsArray, IsDomElement, IsEmpty, Validators } from "@/util";
import { useAppDispatch, useAppSelector } from "@/util/Hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import Loader from "../../Loader";
import NoFiles from "./NoFIles";
import {
  CreateNewDirectory,
  DeleteFile,
  GetFilesByDirectory,
  UploadFileToDirectory,
} from "@/lib/api/explorer.api";
import { removeFiles, setVisibleFiles } from "@/lib/store/slices/explorerSlice";
import Modal from "../../Modal";
import Button from "../../Buttons/Button";
import LinkButton from "../../Buttons/LinkButton";
import Input from "../../Form/Input";
import Form from "../../Form/Form";
import SelectFile from "../../Form/SelectFile";
import SideBarFileItem from "./SidebarItem";


const ExplorerSideBar = () => {
  const dispatch = useAppDispatch();
  const RootFolder = useAppSelector((state) => state.explorer.visibleFolders);
  const [isLoadingRootFolder, setIsLoadingRootFolder] = useState(false);

  const [addToDirId, setAddToDirId] = useState<string | null>(null);

  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [isAddFolderLoading, setIsAddFolderLoading] = useState(false);
  const addFolderForm = useRef<HTMLFormElement>(null);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const UploadForm = useRef<HTMLFormElement>(null);

  function OnAddFolderFormSubmit(
    _e: Event | any,
    isValid: boolean,
    data: object | any
  ) {
    console.log(addToDirId);
    if (isValid && addToDirId) {
      setIsAddFolderLoading(true);
      CreateNewDirectory(data.name, addToDirId).finally(() => {
        refetch(addToDirId).finally(() => {
          setIsAddFolderLoading(false);
          setIsAddFolderModalOpen(false);
        });
      });
    }
  }

  function OnUploadFormSubmit() {
    if (addToDirId && UploadForm.current) {
      setIsUploadLoading(true);
      const formData = new FormData(UploadForm.current);
      formData.append("dirId", addToDirId);
      UploadFileToDirectory(formData).finally(() => {
        refetch(addToDirId).finally(() => {
          setIsUploadLoading(false);
          setIsUploadModalOpen(false);
        });
      });
    }
  }

  function SubmitUpload() {
    if (
      IsDomElement(UploadForm.current) &&
      UploadForm.current instanceof HTMLFormElement
    ) {
      UploadForm.current.doSubmit();
    }
  }

  function SubmitAddFolder() {
    if (
      IsDomElement(addFolderForm.current) &&
      addFolderForm.current instanceof HTMLFormElement
    ) {
      addFolderForm.current.doSubmit();
      console.log(addFolderForm.current);
    }
  }

  function refetch(dirId: string | null = null) {
    return GetFilesByDirectory(dirId).then((data) => {
      dispatch(setVisibleFiles(data));
    });
  }

  useEffect(() => {
    setIsLoadingRootFolder(true);
    refetch().finally(() => {
      setIsLoadingRootFolder(false);
    });
  }, []);

  return (
    <div className="explorer-sidebar scrollable">
      {RootFolder ? (
        <>
          <SideBarFileItem
            addFolder={(dirId) => {
              setAddToDirId(dirId);
              setIsAddFolderModalOpen(true);
            }}
            uploadFile={(dirId) => {
              setAddToDirId(dirId);
              setIsUploadModalOpen(true);
            }}
            file={RootFolder}
            isRootFolder={true}
          />
          <div
            className="d-flex w-full p-2 items-center justify-start"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setAddToDirId(RootFolder.id);
              setIsAddFolderModalOpen(true);
            }}
          >
            <i className="fal fa-plus mr-2"></i>
            <span>New Folder</span>
          </div>
          <div
            className="d-flex w-full p-2 pt-1 items-center justify-start"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setAddToDirId(RootFolder.id);
              setIsUploadModalOpen(true);
            }}
          >
            <i className="fal fa-cloud-upload mr-2"></i>
            <span>Upload</span>
          </div>
        </>
      ) : isLoadingRootFolder ? (
        <Loader />
      ) : (
        <NoFiles />
      )}
      <Modal
        isOpen={isAddFolderModalOpen}
        OnClose={() => setIsAddFolderModalOpen(false)}
      >
        <div
          className="add-folder-modal"
          style={{ display: "grid", gridTemplateRows: "auto 20%" }}
        >
          <Form
            ref={addFolderForm}
            HandleSubmit={OnAddFolderFormSubmit}
            inputNames={["name"]}
            className="w-full"
          >
            <h4 className="mb-1">Adding Folder Under</h4>
            <span className="ml-2">"root/Test/"</span>
            <Input
              type="text"
              name="name"
              className="w-full"
              legend="Folder Name"
              placeHolder="Name"
              validators={Validators.AtleastChars("Folder Name")}
              required={true}
            />
          </Form>
          <div
            className="d-flex items-center"
            style={{ justifyContent: "flex-end" }}
          >
            <LinkButton
              className="d-flex justify-center mx-2 p-1"
              onClick={() => {
                setIsAddFolderModalOpen(false);
              }}
            >
              Cancel
            </LinkButton>
            <Button
              className="d-flex justify-center"
              isLoading={isAddFolderLoading}
              onClick={() => {
                SubmitAddFolder();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isUploadModalOpen}
        OnClose={() => setIsUploadModalOpen(false)}
      >
        <div
          className="add-folder-modal"
          style={{ display: "grid", gridTemplateRows: "auto 20%" }}
        >
          <Form
            ref={UploadForm}
            inputNames={["file"]}
            HandleSubmit={OnUploadFormSubmit}
            className="w-full"
          >
            <h4 className="mb-1">Adding File Under</h4>
            <span className="ml-2">"root/Test/"</span>
            <SelectFile name="file" />
          </Form>
          <div
            className="d-flex items-center"
            style={{ justifyContent: "flex-end" }}
          >
            <LinkButton
              className="d-flex justify-center mx-2 p-1"
              onClick={() => {
                setIsUploadModalOpen(false);
              }}
            >
              Cancel
            </LinkButton>
            <Button
              className="d-flex justify-center"
              isLoading={isUploadLoading}
              onClick={() => {
                SubmitUpload();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExplorerSideBar;
