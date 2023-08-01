import { Title, Meta } from "solid-start";

interface MetaHeadProps {
  title?: string;
  body?: string;
}

export default function MetaHead(props: MetaHeadProps) {
  return (
    <>
      {/* <Meta
        name="twitter:image:src"
        content="https://opengraph.githubassets.com/a062ab265117a44e5479396add57906d85de72b4dd278127be810c33e00768cf/solidjs/solid-docs-next"
      /> */}
      <Meta name="twitter:site" content="@github" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title || ""} />
      <Meta name="twitter:description" content={props.body || ""} />
      <Title>{props.title || ""} | LoveLetter </Title>
    </>
  );
}
