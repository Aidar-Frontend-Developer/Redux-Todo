import React from 'react';

import Button from './Button';

class Stopwatch extends React.Component {
  state = {
    running: false,
    elapsed: 0,
    lastTick: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const { elapsed, running, lastTick } = this.state;
    if (running) {
      const now = Date.now();
      const diff = now - lastTick;

      this.setState({
        elapsed: elapsed + diff,
        lastTick: now,
      });
    }
  };

  handleStart = () => {
    this.setState({
      running: true,
      lastTick: Date.now(),
    });
  };

  handlePause = () => {
    this.setState({ running: false });
  };

  handleStop = () => {
    this.setState({
      running: false,
      elapsed: 0,
      lastTick: 0,
    });
  };

  format(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes > 9 ? minutes : '0' + minutes}:${
      seconds > 9 ? seconds : '0' + seconds
    }`;
  }

  render() {
    const { elapsed, running } = this.state;
    const time = this.format(elapsed);

    return (
      <section className="stopwatch">
        <div className="stopwatch-time">{time}</div>

        <div className="stopwatch-controls">
          {running ? (
            <Button className="icon" icon="pause" onClick={this.handlePause} />
          ) : (
            <Button
              className="icon"
              icon="play_arrow"
              onClick={this.handleStart}
            />
          )}

          <Button className="icon" icon="stop" onClick={this.handleStop} />
        </div>
      </section>
    );
  }
}

export default Stopwatch;
