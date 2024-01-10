import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, Grid } from "@mui/material";

type StatusProps = {
  message: string;
};

const Status: React.FC<StatusProps> = ({ message }) => {
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card className="text-center mt-2">
            <CardHeader title={message}></CardHeader>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Status;
