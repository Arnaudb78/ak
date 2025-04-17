import { SignUp } from "@/components/sign-up";
import { SignIn } from "@/components/sign-in";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
    <div className="flex items-center justify-center h-screen gap-10">
      <SignUp />
      <Separator orientation="vertical" className="h-full" />
      <SignIn />
    </div>
    </>
  );
}
