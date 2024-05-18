"use client";

import useBalance  from "../../../packages/src/hooks/useBalance";

export default function() {
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}