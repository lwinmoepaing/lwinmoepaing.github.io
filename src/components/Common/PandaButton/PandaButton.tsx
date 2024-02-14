import { createSignal } from "solid-js";
import PandaLeftSide from "./PandaLeftSide";
import PandaRightSide from "./PandaRightSide";
import PandaFace from "./PandaFace";

const PandaButton = (props: { title: string; link: string }) => {
  const [isLeftAnimating, setIsLeftAnimating] = createSignal(false);
  const [isRightAnimating, setisRightAnimating] = createSignal(false);

  return (
    <div class="inline-block relative">
      <div class="h-[50px] flex items-center w-full cursor-pointer">
        <PandaLeftSide
          isAnimating={isLeftAnimating}
          setIsAnimating={setIsLeftAnimating}
        />
        <PandaFace title={props.title} link={props.link} />
        <PandaRightSide
          isAnimating={isRightAnimating}
          setIsAnimating={setisRightAnimating}
        />
      </div>
    </div>
  );
};
export default PandaButton;
