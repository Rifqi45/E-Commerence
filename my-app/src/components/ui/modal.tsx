"use client";

import { on } from "events";
import React from "react";
import {
    Dialog, 
    DialogContent,
    DialogHeader, 
    DialogDescription, 
    DialogTitle 
} from "@/components/ui/dialog";

interface ModalProps {
  tittle: String;
  description: String;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({
  tittle,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>{tittle}</DialogTitle>
            <DialogDescription>
                {description}
            </DialogDescription>
        </DialogHeader>
        <div>
            {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
