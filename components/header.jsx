"use client";
import { useStoreUser } from "@/hooks/use-store-user";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { BarLoader } from "react-spinners";

const Header = () => {
  const { isLoading, isAuthenticated } = useStoreUser();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrops-filter]:bg-white/60">
      <nav>
      {/* when user not logged in */}
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      {/* when user logged in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
    {
      isLoading && <BarLoader width="100%" color="#36d7b7" />
    }
    </header>
  );
};

export default Header;
