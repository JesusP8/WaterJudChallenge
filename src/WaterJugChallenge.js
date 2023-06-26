import React, { useState } from 'react';

const WaterJugChallenge = () => {
  const [bucketX, setBucketX] = useState(0);
  const [bucketY, setBucketY] = useState(0);
  const [measureZ, setMeasureZ] = useState(0);
  const [solution, setSolution] = useState('');

  const solveWaterJugChallenge = () => {
    if (measureZ % gcd(bucketX, bucketY) !== 0) {
      setSolution('No Solution');
      return;
    }

    let x = 0;
    let y = 0;
    let stepsXtoY = '';
    let stepsYtoX = '';

    const maxIterations = 1000;
    let iterationCount = 0;
    while ((x !== measureZ && y !== measureZ) && iterationCount < maxIterations) {
      if (x === 0) {
        x = bucketX;
        stepsXtoY += `Fill bucketX (${bucketX})\n; `;
        iterationCount++;
      }
      else if (x > 0 && y < bucketY) {
        const transferAmount = Math.min(x, bucketY - y);
        x -= transferAmount;
        y += transferAmount;
        stepsXtoY += `Transfer ${transferAmount} units from bucketX to bucketY\n; `;
        iterationCount++;
      }
      else if (y === bucketY) {
        y = 0;
        stepsXtoY += 'Empty bucketY\n; ';
        iterationCount++;
      }
      if (iterationCount === maxIterations) {
        setSolution('No Solution');
        return;
      }
    }

    x = 0;
    y = 0;

    
    while (x !== measureZ && y !== measureZ) {
      if (y === 0) {
        y = bucketY;
        stepsYtoX += `Fill bucketY (${bucketY})\n; `;
      }
      else if (y > 0 && x < bucketX) {
        const transferAmount = Math.min(y, bucketX - x);
        y -= transferAmount;
        x += transferAmount;
        stepsYtoX += `Transfer ${transferAmount} units from bucketY to bucketX\n; `;
      }
      else if (x === bucketX) {
        x = 0;
        stepsYtoX += 'Empty bucketX\n; ';
      }
    }

    const solution = stepsXtoY.length <= stepsYtoX.length ? stepsXtoY : stepsYtoX;

    setSolution(solution);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = parseInt(value);

    if (parsedValue < 0) {
      parsedValue = 0;
    }

    if (name === 'bucketX') {
      setBucketX(parsedValue);
    } else if (name === 'bucketY') {
      setBucketY(parsedValue);
    } else if (name === 'measureZ') {
      setMeasureZ(parsedValue);
    }
  };

  const gcd = (a, b) => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  return (
    <div>
      <label>
        Bucket X Capacity:
        <input
          type="number"
          name="bucketX"
          value={bucketX}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Bucket Y Capacity:
        <input
          type="number"
          name="bucketY"
          value={bucketY}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Measure Z:
        <input
          type="number"
          name="measureZ"
          value={measureZ}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={solveWaterJugChallenge}>Solve</button>
      <br />
      <p>Solution: {solution}</p>
    </div>
  );
};

export default WaterJugChallenge;
