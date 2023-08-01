import { Title, Meta } from "solid-start";
import { useLocation } from "solid-start";

interface MetaHeadProps {
  title?: string;
  body?: string;
}

export default function MetaHead(props: MetaHeadProps) {
  const location = useLocation();
  let url = location.pathname;
  let origin = "/";

  if (typeof window !== "undefined") {
    url = window?.location?.origin + location.pathname;
    origin = window?.location?.origin;
  }

  return (
    <>
      <Meta name="twitter:site" content="@github" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title || ""} />
      <Meta name="twitter:description" content={props.body || ""} />
      <Meta property="og:url" content={url} />
      <Meta property="og:type" content="article" />
      <Meta property="og:title" content={props.title || ""} />
      <Meta property="og:description" content={props.body || ""} />
      <Meta property="og:image" content={`${origin}/images/og_facebook_lmp.jpg`} />
      <Title>{props.title || ""} | Lwin Moe Paing </Title>
    </>
  );
}
