"use client";

import { useGetUserInfoQuery } from "@/lib/api/createApiReducer";

const Header = () => {
  const {
    isLoading: isLoadingCurrentUserInfo,
    refetch: refetchCurrentUserInfo,
    data: currentUser,
  } = useGetUserInfoQuery();

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
