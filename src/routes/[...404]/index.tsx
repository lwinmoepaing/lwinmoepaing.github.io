import { A } from "solid-start";

export default function NotFound() {
  return (
    <main class="mt-32">
      <div class="max-w-[500px] mx-auto my-[1rem] text-center">
        <h1 class="text-5xl my-4 text-slate-100">
          ! not found
          <span class="text-indigo-500"> 404 </span>
          Page
        </h1>
        <A href="/" class="mt-10 block text-sm text-indigo-500 font-bold">
          Go Back Home
        </A>
      </div>
    </main>
  );
}
