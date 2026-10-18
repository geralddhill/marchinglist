import ProfileSettings from "@/app/(root)/settings/_components/ProfileSettings";
import EmailSettings from "@/app/(root)/settings/_components/EmailSettings";
import PasswordSettings from "@/app/(root)/settings/_components/PasswordSettings";

export default function Page() {
  return (
    <main className="p-8 md:px-24 xl:px-36 2xl:px-64">
      <h1 className="mb-8 block w-full border-b-2 pb-4 text-4xl font-semibold sm:text-6xl xl:text-7xl">
        Settings
      </h1>

      <ProfileSettings />
      <EmailSettings />
      <PasswordSettings />
    </main>
  );
}
