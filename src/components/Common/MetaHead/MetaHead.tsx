import { Title, Meta } from "solid-start";
import { useLocation } from "solid-start";

interface MetaHeadProps {
  title?: string;
  body?: string;
}

export default function MetaHead(props: MetaHeadProps) {
  const location = useLocation();

  return (
    <>
      <Meta name="twitter:site" content="@github" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title || ""} />
      <Meta name="twitter:description" content={props.body || ""} />
      <Meta property="og:url" content={location.pathname} />
      <Meta property="og:type" content="article" />
      <Meta
        property="og:title"
        content={`${props.title || ""} | Lwin Moe Paing`}
      />
      <Meta property="og:description" content={props.body || ""} />
      <Meta
        property="og:image"
        content={`https://lwinmoepaing.github.io/images/og_facebook_lmp.jpg`}
      />
      <Title>{props.title || ""} | Lwin Moe Paing </Title>
      
    </>
  );
}
