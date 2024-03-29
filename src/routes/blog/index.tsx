import MetaHead from "~/components/Common/MetaHead/MetaHead";
import { FiLayers } from "solid-icons/fi";
import AnimateContainer from "~/components/Common/AnimateContainer/AnimateContainer";
function BlogPage() {
  return (
    <>
      <MetaHead
        title="Blogs"
        body="Personal Blogs By Lwin Moe Paing (Developer)"
      />
      <AnimateContainer>
        <div class="container px-4 ">
          <div class="max-w-[500px] mx-auto my-[1rem] text-center">
            <h2 class="text-lg my-2 flex justify-center items-center">
              <FiLayers class="text-indigo-500 h-5 w-5 mr-2" />
              This is my{" "}
              <span class="text-indigo-500 mx-2 font-bold">Personal Blogs</span>
              .
            </h2>
          </div>

          <div class="animate-fade-up animate-delay-500 animate-ease-in grid grid-cols-1 sm:grid-cols-2 place-items-center sm:gap-x-4 sm:gap-y-16 gap-y-11">
            <a href="https://www.facebook.com/lwin.im/posts/pfbid02C49bcDqe4bZzyDCfzfNyw4WqdAB2dhR5cACbeDKrLf5ViDCRzhnzNffJmU6ae5npl">
              <section class="lg:w-[22rem] md:w-[20rem] sm:w-[15rem] xxs:w-[18rem]">
                <div class="relative w-full h-auto rounded-2xl overflow-hidden">
                  <img
                    alt="What is Linter"
                    loading="lazy"
                    decoding="async"
                    data-nimg="1"
                    class="w-full h-[210px] sm:h-[195px] rounded-md object-cover"
                    style={{ color: "transparent" }}
                    sizes="100vw"
                    src="/images/blogs/what-is-linter.jpeg"
                  />
                </div>
                <h1 class="font-extrabold md:text-xl sm:text-lg xxs:text-base text-sm mt-6">
                  What is Linter ?
                </h1>
                <p class="sm:mt-4 mt-3 text-base xxs:text-sm font-medium md:max-w-[33rem] sm:max-w-[29rem] max-w-[25rem]">
                  What is Linter ? Linter ဆိုတာ Source Code တွေကို Analyze
                  လုပ်တဲ့ Tool ဒါမယ့် သူက ဖြစ်လာနိုင်တယ့် Error တွေကို Warning
                  တို့ Problematic Code Pattern တွေကို Prevent လုပ်ပေးတဲ့ Tool
                  ပဲလို့ အလွယ်ဆိုလို့ရမယ် ။
                </p>
              </section>
            </a>
          </div>
        </div>
      </AnimateContainer>
    </>
  );
}
export default BlogPage;
