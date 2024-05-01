import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  floor: {
    border: '1px solid #000',
    padding: theme.spacing(2),
    backgroundColor: (props) =>
      props.currentFloor ? theme.palette.grey[300] : 'inherit',
  },
}));

const Lift = () => {
  const classes = useStyles();

  const [floors, setFloors] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(0);
  const [callQueue, setCallQueue] = useState([]);
  const [direction, setDirection] = useState(null);
  const [moving, setMoving] = useState(false);

  const handleFloorInput = (e) => {
    setFloors(parseInt(e.target.value));
  };

  const handleCallRequest = (floor, direction) => {
    setCallQueue((prevQueue) => [...prevQueue, { floor, direction }]);
    setDirection(direction);
  };

  const handleDestinationInput = (e, floor) => {
    setCallQueue((prevQueue) => [
      ...prevQueue,
      { floor: parseInt(e.target.value), direction: floor > currentFloor ? 'up' : 'down' },
    ]);
  };

  const moveLift = () => {
    setMoving(true);
    setTimeout(() => {
      if (callQueue.length > 0) {
        const { floor, direction } = callQueue[0];
        setCurrentFloor(floor);
        setCallQueue((prevQueue) => prevQueue.slice(1));
        setDirection(null);
      } else {
        setDirection(null);
      }
      setMoving(false);
    }, 2000);
  };

  useEffect(() => {
    if (callQueue.length > 0 && !moving) {
      moveLift();
    }
  }, [callQueue, moving]);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Lift Simulation
      </Typography>
      <Box mb={4}>
        <TextField
          label="Number of Floors"
          type="number"
          value={floors}
          onChange={handleFloorInput}
        />
      </Box>
      <Grid container spacing={2}>
        {Array.from({ length: floors }, (_, index) => (
          <Grid item xs={12} key={index}>
            <Box className={classes.floor} currentFloor={index === currentFloor}>
              <Typography variant="body1">Floor {index}</Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCallRequest(index, 'up')}
                >
                  Call Lift (Up)
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCallRequest(index, 'down')}
                  style={{ marginLeft: 8 }}
                >
                  Call Lift (Down)
                </Button>
                {index === currentFloor && (
                  <Box mt={2}>
                    <TextField
                      label={`Destination Floor`}
                      type="number"
                      inputProps={{ min: 1, max: floors }}
                      onChange={(e) => handleDestinationInput(e, index)}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        {moving ? (
          <Typography variant="body1">Lift is moving...</Typography>
        ) : (
          <Typography variant="body1">
            Lift is {direction ? `moving ${direction}` : 'idle'} on floor {currentFloor + 1}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Lift;