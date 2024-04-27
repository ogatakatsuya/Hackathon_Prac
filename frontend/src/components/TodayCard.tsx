import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import BasicCard from "@/components/Card";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ActTaskDialog from "@/components/ActTaskDialog";

const TodayCard = ({ data, token }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const accessToken = token;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddTaskOpen = () => {
    handleMenuClose();
    setDialogOpen(true);
  };

  const handleAddTaskClose = () => {
    setDialogOpen(false);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        color: "#ffffff",
        backgroundColor: "#1281e3",
        maxHeight: "100%",
      }}
    >
      <CardContent sx={{ px: 3, py: 2 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between" sx={{ pb: 1 }}>
              <Grid item sx={{ pl: 2 }}>
                <Typography variant="h6">Today's Task</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ backgroundColor: "#0b4d87" }}
                >
                  <AddIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleAddTaskOpen}>Add new task</MenuItem>
                  <MenuItem>View task list</MenuItem>
                </Menu>
                <ActTaskDialog
                  act = "add"
                  open={dialogOpen}
                  onClose={handleAddTaskClose}
                  token={accessToken}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <BasicCard data={data} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TodayCard;
