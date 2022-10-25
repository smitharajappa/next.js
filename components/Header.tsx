import Image from "next/image";
import React from "react";
import logo from "../images/reddit-logo.png";
import signout from "../images/reddit-black.png";
import {
  Bars3Icon,
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  GlobeAsiaAustraliaIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image src={logo} layout="fill" objectFit="contain" />
      </div>
      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <form className="flex flex-1 items-center space-x-2 border rounded-sm border-gray-200 bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>
      <div className="mx-5 items-center space-x-2 text-gray-500 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeAsiaAustraliaIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleOvalLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerWaveIcon className="icon" />
      </div>
      <div className="ml-5 text-center text-gray-900 lg:hidden">
        <Bars3Icon className="icon" />
      </div>
      {
        session ? (
          <div
          onClick={() => signOut()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2  lg:flex"
        >
          <div className="relative h-6 w-6 flex-shrink-0">
            <Image objectFit="contain" src={signout} layout="fill" />
          </div>
          <div className="flex-1 text-xs">

          <p className="truncate">{session?.user?.name}</p>
          <p className="text-gray-400 flex-1">1 Karma</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400"/>
        </div>
        ) : (

      <div
        onClick={() => signIn()}
        className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2  lg:flex"
      >
        <div className="relative h-6 w-6 flex-shrink-0">
          <Image objectFit="contain" src={signout} layout="fill" />
        </div>
        <p className="text-gray-400 flex-1">Sign In</p>
      </div>
        )
      }
    </div>
  );
}

export default Header;
