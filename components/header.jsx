import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <div>
      {/* when user not logged in */}
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      {/* when user logged in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
