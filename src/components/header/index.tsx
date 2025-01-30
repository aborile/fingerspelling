import Image from "next/image";
import Link from "next/link";

import Icon from "../shared/icon";

export default function Header() {
  return (
    <header className="bg-midnight flex gap-2 h-16 items-center justify-between px-4">
      <div className="flex gap-2 items-center">
        <Image
          src="/svgs/love-you.svg"
          alt="Main logo: 'love you' gesture"
          width={48}
          height={48}
          priority
        />
        <p className="cursor-default font-bold text-2xl text-white">
          한글 지문자 연습
        </p>
      </div>

      <button className="hover:opacity-70">
        <Link href="/help" passHref>
          <Icon name="help" />
        </Link>
      </button>
    </header>
  );
}
