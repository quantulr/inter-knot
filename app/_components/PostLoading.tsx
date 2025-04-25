import loadingImg from "@/app/_assets/loading.png";
import "./PostLoading.css";

export default function LoadingPage() {
  return (
    <div
      className="mt-4 h-[60px] w-[212px] animate-[loadingLoop-zzz-a9bf7fce_.5s_steps(30)_infinite_forwards] bg-cover"
      style={{
        backgroundImage: `url(${loadingImg.src})`,
        backgroundPositionY: "90px",
      }}
    ></div>
  );
}
