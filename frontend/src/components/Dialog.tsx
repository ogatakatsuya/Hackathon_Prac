import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit To Do List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            label="Title"
            fullWidth
            defaultValue={props.title}
            variant="standard"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            label="memo"
            fullWidth
            multiline
            rows={4}
            defaultValue={props.memo}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Done</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
