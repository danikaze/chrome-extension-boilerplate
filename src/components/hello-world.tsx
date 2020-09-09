import React, { FunctionComponent } from 'react';
import { Theme, Typography, Card } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';

export interface HellowWorldProps {
  saluteWho?: string;
}

// example of adding custom classes to an existing component
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    color: theme.palette.primary.main,
    marginBottom: '1em',
  },
}));

// example of creating a styled component
const StyledText = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
  },
}))(Typography);

export const HelloWorld: FunctionComponent<HellowWorldProps> = ({
  saluteWho,
}) => {
  const classes = useStyles();

  return (
    <>
      <Card className={clsx(classes.card)}>
        <Typography variant="h4">Hello {saluteWho}</Typography>
      </Card>
      <Card>
        <StyledText variant="h4">Hello {saluteWho}</StyledText>
      </Card>
    </>
  );
};

HelloWorld.defaultProps = {
  saluteWho: 'World',
};
