"use client";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import React from "react";
import { BarLoader } from "react-spinners";

const ContactsPage = () => {
  //fetch : others contacts with whom I have one to one expenses and groups i am part of
  const { data, isLoading, error } = useConvexQuery(
    api.contacts.getAllContacts,
  );
  /*
data=[
  groups : [{
    0: 
    description: "Expenses for our project",
    id: "jn77paha0zx9hh2fc5p68v3kr97gf1jb",
    memberCount: 3,
    name: "Project Alpha",
    type: "group"
  },....],
  users:[{
  email: "1amit24saini5@gmail.com",
  id: "j57dj2tp32zsbcsqjgahs46c0h7gftjn",
  name: "Anonymous",
  type: "user"
},...]
]


  */

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color={"#36d7b7"} />
      </div>
    );
  }

  return <div>Contact Page</div>;
};

export default ContactsPage;
