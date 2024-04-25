import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import FormDialog from "./Dialog";

export default function BasicCard(props: any) {
  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{props.title}</Typography>
        <Typography level="body-sm">{props.time}</Typography>
      </div>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">{props.memo}</Typography>
        </div>
        <FormDialog title={props.title} time={props.time} memo={props.memo} />
      </CardContent>
    </Card>
  );
}
