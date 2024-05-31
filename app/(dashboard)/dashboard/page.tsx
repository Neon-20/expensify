"use client";
import { Button } from "@/components/ui/button";
import { useNewAccountSheet } from "@/features/accounts/zustand-hooks/use-new-account";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const {isOpen,onClose,onOpen} = useNewAccountSheet();
  return (
  <Button
  onClick={onOpen}
  >
    Add an Account
  </Button>
  );
}
