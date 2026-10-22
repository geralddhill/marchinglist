import ProfileSettings from "@/app/(root)/settings/_components/profile-settings";
import EmailSettings from "@/app/(root)/settings/_components/email-settings";
import PasswordSettings from "@/app/(root)/settings/_components/password-settings";
import DeleteButton from "@/app/(root)/settings/_components/delete-button";
import UserAvatarSettings from "@/app/(root)/settings/_components/user-avatar-settings";

export default function Page() {
  return (
    <main className="flex flex-col items-center gap-12 p-8 md:px-24 xl:px-36 2xl:px-64">
      <h1 className="mb-8 block w-full border-b-2 pb-4 text-4xl font-semibold sm:text-6xl xl:text-7xl">
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full h-full">
        <UserAvatarSettings />
        <ProfileSettings />
        <EmailSettings />
        <PasswordSettings />
      </div>

      <div className="pt-12">
        <DeleteButton />
      </div>
    </main>
  );
}
