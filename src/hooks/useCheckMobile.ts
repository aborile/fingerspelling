import { useEffect, useState } from "react";

export function useCheckMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // check mobile device by user agent
  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  return { isMobile };
}
