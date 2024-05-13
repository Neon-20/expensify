import { auth, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <UserButton
    afterSignOutUrl="/"
    />
  );
}
