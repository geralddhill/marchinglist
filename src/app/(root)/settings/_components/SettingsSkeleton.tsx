import {SubmitEvent, ReactNode} from "react";

export default function SettingsSkeleton({title, handleSubmit, pending, children}: {title: string, handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void, pending: boolean, children?: ReactNode}) {
  return (
    <form className="flex flex-col items-center gap-12" onSubmit={handleSubmit}>
      <h2 className="mb-8 block w-full border-b-2 pb-4 text-3xl font-semibold wrap-break-word sm:text-4xl xl:text-5xl">
        {title}
      </h2>
      {children}
      <button type="submit" className="btn-primary" disabled={pending}>Submit</button>
    </form>
  )
}