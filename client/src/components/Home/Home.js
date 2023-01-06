import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import "./Home.css";

const Home = () => {
  const user = useContext(UserContext);

  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [AMPM, setAMPM] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();

      if (date.getHours() < 10) setHours(`0${date.getHours()}`);
      else setHours(date.getHours() % 12);

      if (date.getMinutes() < 10) setMinutes(`0${date.getMinutes()}`);
      else setMinutes(date.getMinutes());

      if (date.getSeconds() < 10) setSeconds(`0${date.getSeconds()}`);
      else setSeconds(date.getSeconds());

      if (date.getHours() < 12) setAMPM("AM");
      else setAMPM("PM");
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [hours]);

  console.log(9 - "1")

  return (
    <div className="home">
      <div className="bg" />
      <div className="time">
        <div className="hours">
          {hours}:{minutes}:{seconds}
        </div>
        <div className="AMPM">{AMPM}</div>
      </div>
    </div>
  );
};
export default Home;
