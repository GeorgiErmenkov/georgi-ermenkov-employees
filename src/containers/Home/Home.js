import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import { useSelector, useDispatch } from "react-redux";
import { Uploader } from "../../components/Uploader";
import { TeamTable } from "../../components/TeamTable";
import { selectAll as selectAllTeamworks } from "./teamworkReducer";

export default function Home() {

  const teamworks = useSelector(selectAllTeamworks);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column'
      }}
    >
      <Card style={{ marginBottom: 8 }}>
        <CardContent>
          <Typography variant="h5">
            Best Teammates
          </Typography>
          <Typography
            align="center"
            variant="subtitle1"
          >
          </Typography>
        </CardContent>
        <CardActions>
          <Uploader />
        </CardActions>
      </Card>
      <TeamTable data={teamworks} />
    </div>
  );
};