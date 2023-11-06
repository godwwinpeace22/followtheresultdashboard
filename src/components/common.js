import React, { useEffect } from "react";

export default function Common() {
  useEffect(() => {
    import("preline");
  }, []);

  return <div>common</div>;
}
