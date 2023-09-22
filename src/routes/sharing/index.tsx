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
          <div class="max-w-[800px] mx-auto my-[1rem] text-center">
            <A
              activeClass=""
              inactiveClass=""
              class="hover:text-indigo-500 interactable text-xl"
              data-type={"share"}
              href={"/sharing/getting-experience-for-potential-developer"}
            >
              <FiCode class="text-indigo-500 inline-block h-5 w-5 mr-2" />
              Getting Experience for Potential Developer
            </A>
          </div>

          <div class="max-w-[800px] mx-auto my-[1rem] text-center">
            <A
              activeClass=""
              inactiveClass=""
              class="hover:text-indigo-500 interactable text-xl"
              data-type={"share"}
              href={"/sharing/complete-product-with-react-and-react-native"}
            >
              <FiCode class="text-indigo-500 inline-block h-5 w-5 mr-2" />
              ReactX Camp - Build a Complete Product With React And ReactNative
            </A>
          </div>
        </div>
      </AnimateContainer>
    </>
  );
}
export default SharingPage;
