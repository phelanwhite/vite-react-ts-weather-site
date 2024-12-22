import { memo } from "react";
import style from "./style.module.css";

const Loader = () => {
  return (
    <div className="z-[1000] fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
      <span className={style.loader}></span>
    </div>
  );
};

export default memo(Loader);
