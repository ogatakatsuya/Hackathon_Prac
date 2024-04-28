import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";

export default function ActTaskDialog({
  act,
  open,
  onClose,
  token,
  title,
  date,
  memo,
  task_id,
  fetchTodaysTask,
  fetchTask,
}: {
  act: string;
  open: boolean;
  onClose: () => void;
  token: any;
  title: string;
  date: string;
  memo: string;
  task_id: number;
  fetchTodaysTask: () => Promise<void>;
  fetchTask: () => Promise<void>;
}) {
  const handleCloseDialog = () => {
    setSelectedDate(dayjs());
    onClose();
  };

  const handlefetchTodayTask = async () => {
    fetchTodaysTask();
  };

  const handlefetchTask = async () => {
    fetchTask();
  };

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
  const [message, setMessage] = React.useState("");

  const [isEdit, setIsEdit] = React.useState(false);

  const accessToken = token;

  React.useEffect(() => {
    if (act === "edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [act]);

  React.useEffect(() => {
    if (date) {
      setSelectedDate(dayjs(date));
    } else {
      setSelectedDate(dayjs());
    }
  }, [date]);

  const handleDelete = async () => {
    const res = await fetch("http://localhost:5000/task/" + task_id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      console.log("successfully deleted");
      handlefetchTodayTask();
      handlefetchTask();
    } else {
      setMessage(data.error);
      console.log(message);
    }
    handleCloseDialog();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const _title = formJson.title.toString();
    const _date = selectedDate
      ? selectedDate.format("YYYY-MM-DD").toString()
      : "";
    const _memo = formJson.memo.toString();
    console.log(_title, _date, _memo);
    const res = await fetch("http://localhost:5000/task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // アクセストークンをヘッダーに追加
      },
      body: JSON.stringify({ task: _title, memo: _memo, date: _date }),
    });
    const data = await res.json();
    // 画面上にメッセージを表示
    if (res.ok) {
      handlefetchTodayTask();
      handlefetchTask();
    } else {
      setMessage(data.error);
      console.log(message);
    }

    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth>
      <DialogTitle>
        {act === "add"
          ? "Add new task"
          : act === "edit"
          ? "Edit this task"
          : ""}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            required
            label="title"
            name="title"
            fullWidth
            defaultValue={title}
            variant="standard"
          />
        </DialogContent>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={dayjs()}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogContent>
          <TextField
            label="memo"
            name="memo"
            fullWidth
            multiline
            rows={4}
            defaultValue={memo}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              {isEdit && (
                <Button onClick={handleDelete} color="error">
                  Delete
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit">Done</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}
