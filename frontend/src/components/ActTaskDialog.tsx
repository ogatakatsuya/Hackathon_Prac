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

export default function ActTaskDialog({
  act,
  open,
  onClose,
  token,
}: {
  act: string;
  open: boolean;
  onClose: () => void;
  token: any;
}) {
  const handleCloseDialog = () => {
    onClose();
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

  const handleDelete = async () => {
    //未実装
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
      setMessage(data.message);
      console.log(message);
    } else {
      setMessage(data.error);
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
            defaultValue={""}
            variant="standard"
          />
        </DialogContent>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              defaultValue={dayjs()}
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
            defaultValue={""}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          {isEdit && <Button onClick={handleDelete}>Delete</Button>}
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Done</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
