import { useEffect } from "react";
import splashImg from "../assets/splash.png";
import "./SplashScreen.css";

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="splash">
      <div className="splash__img-wrap">
        <img src={splashImg} alt="LinuxRingo" className="splash__img" />
      </div>
    </div>
  );
}
