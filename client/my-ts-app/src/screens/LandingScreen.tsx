import React, { useEffect, useRef, useState } from 'react';
import { json } from 'react-router-dom';
import styled from 'styled-components';

const LandingScreen = () => {
  const ref = useRef(null);
  const refLabel = useRef(null);
  const [width, setWidth] = useState(100);
  const duration = 1000;
  const [timeLeft, setTimeLeft] = useState(10);
  const timeTotal = 10;

  function progress(timeleft: number, timetotal: number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    refLabel.current.innerHTML = timeleft;
    const progressBarWidth = (timeleft * 100) / timetotal;
    //setWidth(progressBarWidth);
    if (ref.current != null && refLabel != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ref.current.style.width = 100 - progressBarWidth + `%`;
      console.log('test->>>>>', timeLeft);
    }
    if (timeleft > 0) {
      setTimeout(function () {
        progress(timeleft - 1, timetotal);
      }, 1000);
    }
  }

  useEffect(() => {
    //progress(100, 100);
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://6384ed63-6c8d-45b5-b1f0-d737d2ecd70e.mock.pstmn.io/test')
      .then((response) => response.json())
      .then((data) => console.log('Test->>>>>', data.obj));
  };

  const jsonData = {
    FirstName: 'Petar',
    LastName: 'Petrovic',
    UserName: 'pero',
    tuki: 'tuki'
  };

  const addNewUser = () => {
    fetch('https://6384ed63-6c8d-45b5-b1f0-d737d2ecd70e.mock.pstmn.io/add/newuser', {
      method: 'POST',
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((data) => console.log('TestPOST->>>>>', data))
      .catch((error) => console.log('error', error));
  };
  /*
  function onClick() {
    if (ref.current != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ref.current.style.width = width + `%`;
    }
    setWidth(width + 1);
    setTimeLeft(timeLeft - 1);
  }

  function reset() {
    setWidth(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      onClick();
    }, duration);
    if (width === 90) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [width]);

  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = (e: unknown) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60); //math.floor zaokruzuje na integer veci ili jednak tom broju
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds
    };
  };

  const startTimer = (e: unknown) => {
    const { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 0 ? hours + ' hours ' : '') +
          +(minutes > 9 ? minutes : minutes) +
          ' minutes ' +
          (seconds > 9 ? seconds + ' seconds' : '0' + seconds + ' seconds')
      );
    }
  };

  const clearTimer = (e: unknown) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('00:00:00');

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    Ref.current = id;
  };

  const getDeadTime = () => {
    const deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };
*/
  //-------------
  /*
  useEffect(() => {
    progress(600, 600);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function progress(timeleft: any, timetotal: any) {
    setWidth();
    if (ref.current !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const progressBarWidth = (timeleft * parseInt(ref.current.style.width)) / timetotal;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ref.current.style.width = progressBarWidth + '%';
      console.log('TEST->>>', ref.current.style.width);
      if (timeleft > 0) {
        setTimeout(function () {
          progress(timeleft - 1, timetotal);
        }, 1000);
      }
    }
  }

  progress(600, 600);
  */
  return (
    <Container>
      <ImageContainer>
        <ProgressBarFrame>
          <ProgressBar ref={ref} id="myBar">
            <br></br>
          </ProgressBar>
        </ProgressBarFrame>
        <button onClick={addNewUser}>Click Me</button>
      </ImageContainer>
      <TextContainer>
        <TimeRemaining ref={refLabel}> remaining</TimeRemaining>
        <Label>You can close this tab, the processing will continue</Label>
      </TextContainer>
    </Container>
  );
};

export default LandingScreen;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-left: 15px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
`;
const ImageContainer = styled.div`
  margin-top: auto;
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;

const TimeRemaining = styled.h1`
  font-weight: 300;
`;
const Label = styled.h3`
  color: black;
  margin-top: 8px;
`;

const ProgressBarFrame = styled.div.attrs(() => ({
  className: 'w3-light-grey w3-round-xlarge w3-tiny'
}))`
  width: 99%;
  margin-left: 5px;
  margin-top: 60px;
  margin-bottom: 100px;
`;
const ProgressBar = styled.div.attrs(() => ({
  className: 'w3-container w3-blue w3-round-xlarge w3-tiny'
}))`
  width: 3%;
  padding: 0px;
`;
