import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const groupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
});

const CreateGroupModal = ({ isOpen, isClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const handleClose = () => {
    //reset the form
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            {" "}
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              placeholder="Enter group name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            {" "}
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter group description"
              {...register("description")}
            />
          </div>
        </form>
        <DialogFooter>Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
