import React from "react";
import { Card, CardHeader, Grid } from "@mui/material";

type StatusProps = {
  message: string;
};

const Status: React.FC<StatusProps> = ({ message }) => {
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card>
            <CardHeader title={message}></CardHeader>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Status;
