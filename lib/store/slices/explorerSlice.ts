import {
  createAction,
  createSlice,
  PrepareAction,
} from "@reduxjs/toolkit";
import { IsEmpty } from "@/util";
import { RecurciveFileItem } from "@/types";

export interface ExplorerState {
  visibleFiles: RecurciveFileItem[] | any[];
  visibleFolders: RecurciveFileItem | any;
  currentExplorerRoute: string | null;
}

const initialState: ExplorerState = {
  visibleFiles: [],
  visibleFolders: null,
  currentExplorerRoute: "",
};

export const setCurrentExplorerRoute = createAction<
  PrepareAction<string | null>
>("explorer/setCurrentExplorerRoute", (dir: string | null) => {
  return {
    payload: dir,
  };
});

export const setVisibleFiles = createAction<PrepareAction<RecurciveFileItem[]>>(
  "explorer/setVisibleFiles",
  (files) => {
    return {
      payload: files,
    }
  }
)
export const removeFiles = createAction<PrepareAction<string>>(
  "explorer/removeFiles",
  (id) => {
    return {
      payload: id,
    }
  }
)

const IsArray = (o : any) => o && {}.toString.call(o) === "[object Array]";

function recurciveUpdate (folder : RecurciveFileItem, newFolder: RecurciveFileItem) : RecurciveFileItem {
  if(folder && folder.children && IsArray(folder.children)){
    if(!newFolder["children"] || !IsArray(newFolder["children"])) newFolder["children"] = [];
    const existingfolderIndex = folder.children.findIndex((item) => item.id === newFolder.id);
    if(newFolder.dirId === folder.id){
      if(existingfolderIndex > -1){
        folder.children[existingfolderIndex] = {...folder.children[existingfolderIndex], ...newFolder}
      }else{
        folder.children.push(newFolder)
      }
    }else if(folder.children?.length > 0){
      const children : RecurciveFileItem[] = folder.children; 
      for(let i = 0; i < children.length -1; i++){
        children[i] = recurciveUpdate(children[i], newFolder);
      }
    }
  }
  return folder
}
function recurciveRemove(folder : RecurciveFileItem, id: string){
  if(folder && folder.children && IsArray(folder.children)){
    folder.children = folder.children.filter((item) => item.id !== id);
    const children : RecurciveFileItem[] = folder.children; 
    for(let i = 0; i < children.length -1; i++){
      children[i] = recurciveRemove(children[i], id);
    }
  }
  return folder
}


export const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setVisibleFiles, (state, action) => {
      if(action.payload && {}.toString.call(action.payload) === "[object Array]" && action.payload.length > 0) {
        const newFiles = action.payload.filter(item => item?.type === "file");
        const newFilesIds = newFiles.map(item => item.id);
        if(state.visibleFiles.length === 0){
          state.visibleFiles = newFiles; 
        }else{
          state.visibleFiles = [
            ...newFiles.map((file)=>{
              const existingIncomingFile =  state.visibleFiles.find((item) => item.id === file.id);
              return existingIncomingFile ? existingIncomingFile : file;
            }), 
            ...state.visibleFiles.filter(item => !newFilesIds.includes(item.id))
          ]
        }

        const rootFolder = state.visibleFolders;
        const folders = action.payload.filter(item => item?.type === "folder");
        if(IsEmpty(rootFolder)){
          const incomingRootFolder = folders.find(item => IsEmpty(item.dirId));
          if(incomingRootFolder) {
            incomingRootFolder["children"] = []
            state.visibleFolders = incomingRootFolder;
          }
        }
        if(rootFolder){
          let tempRoot = rootFolder;
          folders.forEach(async (item : RecurciveFileItem) => {
            tempRoot = recurciveUpdate(tempRoot, item)
          });
          state.visibleFolders = {...tempRoot}
        }
      }
    });
    builder.addCase(removeFiles, (state, action) => {
      if(action.payload) {
        state.visibleFiles = state.visibleFiles.filter(item => item.id !== action.payload);
        state.visibleFolders = recurciveRemove(state.visibleFolders, action.payload)
      }
    });
    builder.addCase(setCurrentExplorerRoute, (state, action) => {
      state.currentExplorerRoute = action.payload;
    });
  },
});

export default explorerSlice.reducer;
