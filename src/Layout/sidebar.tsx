import React from "react";

export default function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-black">
      <div>{children}</div>
    </div>
  );
}
