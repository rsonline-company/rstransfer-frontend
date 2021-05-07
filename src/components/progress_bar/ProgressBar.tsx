import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
    percentage: number;
}

const ProgressBar: React.FC<Props> = ({ percentage }) => {
    return (
        <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
                textSize: '16px',
                pathTransitionDuration: 0.5,
                // Colors
                pathColor: `rgba(181,1,197,1)`,
                textColor: 'rgba(181,1,197,1)',
                trailColor: 'white',
                backgroundColor: '#3e98c7',
              })}
        />
    );
}
export default ProgressBar;