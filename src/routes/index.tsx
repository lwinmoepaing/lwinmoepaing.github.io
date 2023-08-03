import AnimateContainer from "~/components/Common/AnimateContainer/AnimateContainer";
import MetaHead from "~/components/Common/MetaHead/MetaHead";
import MyAnimation from "~/components/MyAnimation/MyAnimation";

function HomePage() {
  return (
    <>
      <MetaHead title="Home" body="Portfolio : Lwin Moe Paing (Developer)" />

      <AnimateContainer>
        <div class="max-wrapper px-4 sm:px-8 animate-[opacity0to1_0.3s_ease-in-out]">
          <div class="max-w-[580px] mx-auto">
            <MyAnimation />
          </div>

          <div class="max-w-[500px] mx-auto my-[1rem] text-center">
            <h5 class="text-lg text-indigo-500 my-2">Hi My name is </h5>
            <h1 class="text-4xl my-3">Lwin Moe Paing</h1>
            <h2 class="text-lg my-2">
              🤝 I’m{" "}
              <span class="text-indigo-500 font-bold">Frontend Developer</span>,
              and looking for help with Javascript Language to build Many Free
              Softwares to help people who can't afford to pay !
            </h2>
          </div>
        </div>
      </AnimateContainer>
    </>
  );
}
export default HomePage;
