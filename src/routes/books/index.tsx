import MetaHead from "~/components/Common/MetaHead/MetaHead";
import { FiBook } from "solid-icons/fi";
function BookPage() {
  return (
    <>
      <MetaHead
        title="Blogs"
        body="Personal Blogs By Lwin Moe Paing (Developer)"
      />
      <div class="container px-4 sm:px-8">
        <div class="max-w-[500px] mx-auto my-[1rem] text-center">
          <h2 class="text-lg my-2 flex justify-center items-center">
            <FiBook class="text-indigo-500 h-5 w-5 mr-2" />
            Welcome to my{" "}
            <span class="text-indigo-500 mx-2 font-bold">
              Bookshelf Delights
            </span>{" "}
            .
          </h2>
        </div>
      </div>
    </>
  );
}
export default BookPage;
