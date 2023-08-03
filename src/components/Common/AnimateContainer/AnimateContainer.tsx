import { Show, Component, JSXElement } from "solid-js";
import { useIsRouting } from "solid-start";
import { Transition } from "solid-transition-group";

const AnimateContainer: Component<{ children: JSXElement }> = (props) => {
  const isRouting = useIsRouting();

  return (
    <>
      <Transition name="slide-fade">
        <Show when={!isRouting()} fallback={<></>}>
          {props.children}
        </Show>
      </Transition>
    </>
  );
};
export default AnimateContainer;
