// 보수용: 에디터/tsc가 여전히 못 알아볼 때
declare module "*.svg?react" {
  import * as React from "react";
  const Component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}