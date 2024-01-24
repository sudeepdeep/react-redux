import React from "react";
import { dateConverter } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Interaction from "./Interaction";
import Cookies from "js-cookie";

function ArticleFeed({ items }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="timeline max-w-xl">
        <>
          {items?.map((post, feedIndex) => (
            <div>
              <div className="postCard bg-[#010409] w-full h-auto  p-6 mb-2  rounded-md">
                <div className="postTitle flex gap-1 items-center">
                  <div className="displayPic w-[100px] h-[40px] cursor-pointer rounded-md border-[#0D1117] border-2 overflow-hidden">
                    <img
                      src={post?.coverUrl}
                      alt="profilePic"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="userName font-semibold ml-2 text-white cursor-pointer">
                    {post?.title}
                    <span className="font-light flex items-center gap-2">
                      by{" "}
                      <span
                        className={`text-[#c3073f] ${
                          post.username === "anonymous"
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          post.username !== "anonymous" &&
                            navigate(`/user-profile/${post.username}`);
                        }}
                      >
                        {post?.username}
                      </span>
                      {post.userType !== "anonymous" && (
                        <>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/32/Verified-badge.png"
                            className="w-[14px] h-[14px]"
                            alt="verify"
                          />
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="postImages grid gap-4">
                  <div className="postText mt-2 text-white">
                    {post.abstract}
                  </div>

                  <div className="postText mt-2 text-white">
                    Full Article -{" "}
                    <button
                      onClick={() => navigate(`/public-article/${post._id}`)}
                      className="text-[#c3073f]"
                      target="_blank"
                    >
                      click here
                    </button>
                  </div>
                  <>
                    <div
                      className="coverImage py-2 md:h-[400px] h-[200px] overflow-hidden max-w-full rounded-lg cursor-pointer"
                      onClick={() => window.open(post?.coverUrl, "_blank")}
                    >
                      <img
                        src={post?.coverUrl}
                        alt="coverImage"
                        className="h-full  w-full object-cover"
                      />
                    </div>
                  </>
                </div>
                {Cookies.get("userId") && (
                  <Interaction
                    articleId={post._id}
                    likedPost={post.likedBy.includes(Cookies.get("userId"))}
                    commentsCount={post.comments.length}
                    likesCount={post.likedBy.length}
                  />
                )}

                <div className="postFooter flex gap-2 items-center justify-between">
                  <div className="postText mt-2 text-white">
                    Published- {dateConverter(post?.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </>
  );
}

export default ArticleFeed;
