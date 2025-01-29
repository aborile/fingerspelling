import { Button, Icon } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-6 pt-11">
      <div className="flex gap-1 items-center">
        <p className="font-bold text-xl">지문자 → 한글</p>
        <button className="p-1 transition-all hover:rotate-180">
          <Icon name="invert" />
        </button>
      </div>

      {/* @todo 지문자 재생 */}
      <div className="bg-zinc-900 h-[240px] mt-8 rounded-lg w-full"></div>

      {/* @todo 속도 조절 */}
      <div className="cursor-default flex gap-2 items-center mt-4 w-full">
        <Icon name="speed" />
        <span className="text-sm">속도 조절</span>

        <div className="flex-1 mb-1.5 ml-2 px-2.5 relative">
          <input
            alt="속도 조절을 위한 슬라이더"
            className="accent-glaucous cursor-pointer w-full"
            type="range"
            min={0.5}
            max={1.0}
            step={0.05}
          />
          <span className="absolute -bottom-2 left-0 text-xs">×0.5</span>
          <span className="absolute -bottom-2 right-0 text-xs">×1.0</span>
        </div>
      </div>

      {/* @todo 정답 노출 */}
      <div className="font-bold mt-6 text-violet-blue text-4xl">정답 노출</div>

      {/* @todo 버튼 */}
      <div className="flex gap-8 mt-9 w-full">
        <Button disabled>다시 재생</Button>
        <Button>정답 보기</Button>
      </div>
    </div>
  );
}
