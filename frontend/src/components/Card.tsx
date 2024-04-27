import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import ActTaskDialog from "./ActTaskDialog";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

export default function BasicCard({ data, token }: any) {
  const tasks = data || [];
  const accessToken = token;

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleAddTaskOpen = () => {
    setDialogOpen(true);
  };

  const handleAddTaskClose = () => {
    setDialogOpen(false);
  };

  return (
    <Card sx={{ height: "100%" }}>
      {tasks.length === 0 ? (
        <CardContent orientation="horizontal">
          <div>
            <Typography level="title-lg">{"No task registered"}</Typography>
            <Typography level="body-sm">{"Have a nice day!"}</Typography>
          </div>
          <div>
            <Typography level="body-xs">{""}</Typography>
          </div>
        </CardContent>
      ) : (
        tasks.map((item: any, index: any) => (
          <CardContent key={index}>
            <div>
              <Typography level="title-lg">{item.task}</Typography>
              <Typography level="body-sm">{item.date}</Typography>
            </div>
            <div>
              <Typography level="body-xs">{item.memo}</Typography>
            </div>
            <Box textAlign="right">
              <Button onClick={handleAddTaskOpen}>Edit</Button>
            </Box>
            <ActTaskDialog
              act="edit"
              open={dialogOpen}
              onClose={handleAddTaskClose}
              token={accessToken}
            />
          </CardContent>
        ))
      )}
    </Card>
  );
}
