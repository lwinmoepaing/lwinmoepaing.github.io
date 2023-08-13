import MetaHead from "~/components/Common/MetaHead/MetaHead";
import { FiCode } from "solid-icons/fi";
import AnimateContainer from "~/components/Common/AnimateContainer/AnimateContainer";
import { A } from "@solidjs/router";
function SharingPage() {
  return (
    <>
      <MetaHead
        title="Sharing"
        body="Sharing Sessions By Lwin Moe Paing (Developer)"
      />
      <AnimateContainer>
        <div class="container px-4 sm:px-8">
          <div class="max-w-[500px] mx-auto my-[1rem] text-center">
            <h2 class="text-lg my-2 flex justify-center items-center">
              <FiCode class="text-indigo-500 h-5 w-5 mr-2" />
              Hello, This is all of my{" "}
              <span class="text-indigo-500 mx-2 font-bold">
                Sharing Session
              </span>{" "}
              .
            </h2>
          </div>
          <div class="max-w-[500px] mx-auto my-[1rem] text-center">
            <A
              activeClass=""
              inactiveClass=""
              class="hover:text-indigo-500 interactable text-xl"
              data-type={"share"}
              href={"/sharing/getting-experience-for-potential-developer"}
            >
              <span class="text-indigo-500 mr-1 font-bold"> 1. </span>
              Getting Experience for Potential Developer
            </A>
          </div>
        </div>
      </AnimateContainer>
    </>
  );
}
export default SharingPage;
