"use client";
import { useStoreUser } from "@/hooks/use-store-user";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Divide, LayoutDashboard, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";

const Header = () => {
  const { isLoading, isAuthenticated } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrops-filter]:bg-white/60">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo.png"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
            alt="Splitr logo"
          />
        </Link>

        {path === "/" && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              How It Works
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-cemter gap-2 hover:border-green-600 transition"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>

              <Button variant="ghost" className="md:hidden h-10 w-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>
            <UserButton />
          </Authenticated>
          <Unauthenticated>
            <SignInButton>
              <Button className="cursor-pointer" variant={"ghost"}>
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="cursor-pointer bg-green-600 hover:bg-green-700 border-none">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>
      {isLoading && <BarLoader width="100%" color="#36d7b7" />}
    </header>
  );
};

export default Header;
