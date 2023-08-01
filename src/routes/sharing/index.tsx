import MetaHead from "~/components/Common/MetaHead/MetaHead";
import { FiCode } from "solid-icons/fi";
function SharingPage() {
  return (
    <>
      <MetaHead
        title="Sharing"
        body="Sharing Sessions By Lwin Moe Paing (Developer)"
      />
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
      </div>
    </>
  );
}
export default SharingPage;
