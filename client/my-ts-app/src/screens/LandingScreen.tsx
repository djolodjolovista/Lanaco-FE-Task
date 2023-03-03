import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

interface VideoSkeletonProps {
  startTimestamp?: number;
  endTimestamp?: number;
}

const TestTimer = ({ endTimestamp, startTimestamp = 1677715755 }: VideoSkeletonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [counter, setCounter] = useState(parseInt(localStorage.getItem('counter')!) || 0);
  const [timepercentage, setTimepercentage] = useState(0);
  const [time, setTime] = useState(0);
  const ref = useRef(null);

  console.log('Timestamps->>>>', endTimestamp);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const total = endTimestamp ? endTimestamp - startTimestamp! : 600000;
  useEffect(() => {
    const interval = setInterval(() => {
      if (timepercentage < 90) {
        localStorage.setItem('counter', counter.toString());
        setCounter((counter) => counter + 1000);
        //setCounter(parseInt(localStorage.getItem('counter')!));
        setTimepercentage(Math.round((counter / total) * 100));
        setTime(total - counter);
      } else {
        setTimepercentage(90);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter, timepercentage]);

  if (Math.round(timepercentage) <= 90 && ref.current !== null) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ref.current.style.width = Math.round(timepercentage) + '%';
  }

  function msToTime(duration: number) {
    const tempTime = moment.duration(duration);
    const seconds = tempTime.seconds(),
      minutes = tempTime.minutes(),
      hours = tempTime.hours();

    return (
      (hours > 0 ? hours + ' hours ' : '') +
      (minutes > 0 ? minutes + ' minutes ' : '') +
      (seconds > 9 ? seconds + ' seconds' : '0' + seconds + ' seconds')
    );
  }

  return (
    <Container>
      <ImageContainer>
        <ProgressBarFrame>
          <ProgressBar ref={ref}>
            <br></br>
          </ProgressBar>
        </ProgressBarFrame>
      </ImageContainer>
      <TextContainer>
        {Math.round(timepercentage) < 90
          ? `${msToTime(time)} percentage ${Math.round(timepercentage)}%`
          : 'Wrapping'}
      </TextContainer>
    </Container>
  );
};

export default TestTimer;

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
  margin-top: 200px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
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
  width: 0%;
  padding: 0;
`;
