import { useMutation } from "@apollo/client";
import { LinkIcon, PhoneIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import client from "../apollo-client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import { GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
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
  const [addPost] = useMutation(ADD_POST);
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("creating a new post...")
    try {
      // query for subreddit
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });
      console.log("subreddits",getSubredditListByTopic)
      const subredditListExist = getSubredditListByTopic?.length > 0;

      if (!subredditListExist) {
        // create a new subreddit
        console.log("subreddit doesnt exist")
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });
        const {
          data: { insertPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody || "",
            image: formData.postImage || "",
            subrddit_id: newSubreddit.id,
            username: session?.user?.name,
          },
        });
      } else {
        // use existing subreddit
        console.log("subreddit exist")

        const {
          data: { insertPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody || "",
            image: formData.postImage || "",
            subrddit_id: getSubredditListByTopic[0].id,
            username: session?.user?.name,
          },
        });
      }

      setValue('postBody', "")
      setValue('postTitle', "") 
      setValue('postImage', "") 
      setValue('subreddit', "")

      toast.success('New post added!', {
        id: notification
      })
      
    } catch (error) {
        console.log(error)
        toast.error("Oooops! something went wrong..", {
            id: notification
        })
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 bg-white border border-gray-300 rounded-md p-2 m-auto"
    >
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
              {errors.postTitle?.type === "required" && (
                <p>A post title is required!</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>A subreddit is required!</p>
              )}
            </div>
          )}
          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full p-2 bg-blue-400 text-white rounded-full"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
