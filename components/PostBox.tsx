import { LinkIcon, PhoneIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "./Avatar";

type formData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function PostBox() {
  const { data: session } = useSession();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>();

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const onSubmit = handleSubmit(async(formData)=> {
        console.log(formData)
    })
  return (
    <form onSubmit={onSubmit} className="sticky top-16 z-50 bg-white border border-gray-300 rounded-md p-2 m-auto">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          type={"text"}
          className=" m-2 flex-1 bg-gray-50 p-2 pl-5 outline-none text-gray-600 rounded-sm"
          placeholder={`${
            session?.user
              ? "Create a post by entering a topic"
              : "Login to post"
          }`}
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && "text-blue-500"
          }`}
        />
        <LinkIcon className="h-6 cursor-pointer text-gray-300" />
      </div>
      {!!watch("postTitle") && (
        <div className="">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              {...register("postBody")}
              type={"text"}
              className="m-2 flex-1 bg-gray-50 p-2 outline-none text-gray-600 rounded-sm"
              placeholder="Text Optional"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              {...register("subreddit", { required: true })}
              type={"text"}
              className="m-2 flex-1 bg-gray-50 p-2 outline-none text-gray-600 rounded-sm"
              placeholder="example: next.js"
            />
          </div>
          {!!imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                {...register("postImage")}
                type={"text"}
                className="m-2 flex-1 bg-gray-50 p-2 outline-none text-gray-600 rounded-sm"
                placeholder="Optional"
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-3 text-red-500">
                {errors.postTitle?.type === 'required' && <p>A post title is required!</p>}
                {errors.subreddit?.type === 'required' && <p>A subreddit is required!</p>}

            </div>
          )}
          {!!watch("postTitle") && <button type="submit" className="w-full p-2 bg-blue-400 text-white rounded-full">Create Post</button>}
        </div>
      )}
    </form>
  );
}

export default PostBox;
