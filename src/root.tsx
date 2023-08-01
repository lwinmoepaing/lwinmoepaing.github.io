// @refresh reload
import { Show, Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import "./styles/my-animation.css";

import { settingStore } from "~/store/settingStore";
import { useStore } from "@nanostores/solid";
import { useIsRouting } from "solid-start";
import Navbar from "./components/Common/Navbar/Navbar";

export default function Root() {
  const setting = useStore(settingStore);
  const isRouting = useIsRouting();
  return (
    <Html lang="en" class={`${setting().darkmode ? "dark" : ""}`}>
      <Head>
        <Title>Lwin Moe Paing Dev</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Body class={`dark:bg-black pt-[4rem] pb-[1rem] dark:text-slate-100`}>
        <Navbar />
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <Show when={isRouting()} fallback={<FileRoutes />}>
                Loading
              </Show>
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
