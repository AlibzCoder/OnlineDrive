"use client";

import { useGetUserInfoQuery } from "@/lib/api/createApiReducer";
import { setCurrentExplorerRoute, setVisibleFiles } from "@/lib/store/slices/explorerSlice";
import { IsEmpty } from "@/util";
import { useAppSelector } from "@/util/Hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const {
    isLoading: isLoadingCurrentUserInfo,
    refetch: refetchCurrentUserInfo,
    data: currentUser,
  } = useGetUserInfoQuery();

  const currentExplorerRoute = useAppSelector((store) => store.explorer.currentExplorerRoute)

  useEffect(()=>{
    if(currentUser && !IsEmpty(currentUser.id) && IsEmpty(currentExplorerRoute)){
      dispatch(setCurrentExplorerRoute(currentUser.id))
    }
  },[currentUser, currentExplorerRoute])

  return (
    <div className={`header ${isLoadingCurrentUserInfo ? "skeleton" : ""}`}>
      {currentUser ? (
        <div className="w-full d-flex justify-between items-center">
          <h4 className="title">Online Drive</h4>
          <span>
            {currentUser.fullName}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
