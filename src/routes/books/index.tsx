import MetaHead from "~/components/Common/MetaHead/MetaHead";
import { FiBook } from "solid-icons/fi";
import AnimateContainer from "~/components/Common/AnimateContainer/AnimateContainer";
function BookPage() {
  return (
    <>
      <MetaHead
        title="Blogs"
        body="Personal Blogs By Lwin Moe Paing (Developer)"
      />
      <AnimateContainer>
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

          <section class="flex flex-row justify-start mt-10">
            <div class="hidden md:flex flex-col">
              <div class="md:h-5 md:w-5 sm:h-4 sm:w-4 xxs:h-3 xxs:w-3 border-white z-10 md:border-4 xxs:border-2 rounded-full bg-indigo-400 dark:bg-indigo-500 " />
              <div class="flex-1 md:w-[0.4rem] xxs:w-1 bg-indigo-400 dark:bg-indigo-500  mx-auto" />
            </div>
            <div class="w-full h-auto flex flex-col md:flex-row">
              <div class="w-full md:w-[11rem] flex justify-center items-center">
                <a href="https://drive.google.com/file/d/1EcXt3WrOzLh-PR6ywdEXR1kIMr0DxK3s/view?usp=drive_link">
                  <img
                    src="/images/books/html_css.jpg"
                    class="w-auto h-[150px] md:h-[200px] rounded-xl border border-black overflow:hidden"
                  />
                </a>
              </div>
              <a href="https://drive.google.com/file/d/1EcXt3WrOzLh-PR6ywdEXR1kIMr0DxK3s/view?usp=drive_link">
                <div class="max-w-[37rem] md:px-0 sm:px-6 px-2 rounded-md">
                  <h1 class="text-slate-700 dark:text-indigo-600 font-bold md:text-xl sm:text-lg xxs:text-base text-sm md:mt-0 mt-2">
                    🎉 HTML & CSS - Beginner To Super Beginner
                  </h1>
                  <p class="text-slate-700 dark:text-slate-400 sm:mt-4 mt-2 md:text-lg mm-font sm:text-base xxs:text-sm text-xs font-medium">
                    ဒီစာအုပ်က Web Development ကို အခုမှ စလေ့လာမယ့်သူတွေအတွက်
                    များစွာအထောက်အကူပြုမယ်လို့ ယုံကြည်ပါတယ် ။
                  </p>
                  <p class="text-indigo-500 sm:mt-3 mt-2 md:text-base sm:text-sm xxs:text-xs text-[0.65rem] font-bold md:max-w-[33rem] sm:max-w-[29rem] max-w-[25rem]">
                    Read Detail
                  </p>
                </div>
              </a>
            </div>
          </section>
        </div>
      </AnimateContainer>
    </>
  );
}
export default BookPage;
