import { Title, Meta } from "solid-start";
import { useLocation } from "solid-start";

interface MetaHeadProps {
  title?: string;
  body?: string;
}

export default function MetaHead(props: MetaHeadProps) {
  const location = useLocation();
  let url = location.pathname;

  if (typeof window !== "undefined") {
    url = window?.location?.origin + location.pathname;
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
      <Meta
        property="og:image"
        content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
      />
      <Title>{props.title || ""} | Lwin Moe Paing </Title>
    </>
  );
}
