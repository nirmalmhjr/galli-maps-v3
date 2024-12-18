import * as React from "react";
import { useState , useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import EventRequest from "../event request modal/EventRequest";

export default function DataTable() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const columns = [
    { field: "sNo", headerName: "S.N", minWidth: 62, flex: 1 },
    { field: "eventTitle", headerName: "Event Title", minWidth: 216, flex: 3 },
    { field: "location", headerName: "Location", minWidth: 275, flex: 4 },
    { field: "startDate", headerName: "Start Date", minWidth: 140, flex: 2 },
    { field: "endDate", headerName: "End Date", minWidth: 183, flex: 3 },
    { field: "time", headerName: "Time", minWidth: 134, flex: 2 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 2,
      renderCell: (params) => (
        <Button
          // variant="oulined"
          color="primary"
          size="small"
          sx={{ textTransform: "none" }}
          onClick={() => handleViewMore(params.row)}
        >
          View More
        </Button>
      ),
    },
  ];

  const rows = [
    // {sNo: , eventTitle: , location: ,startDate: , endDate: , time: , action: },
    {
      id: 1,
      sNo: 1,
      eventTitle: "Jyapu Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 2,
      sNo: 2,
      eventTitle: "Newa Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 3,
      sNo: 3,
      eventTitle: "Tamang Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 4,
      sNo: 4,
      eventTitle: "Sherpa Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 5,
      sNo: 5,
      eventTitle: "Loshar Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 6,
      sNo: 6,
      eventTitle: "Maithali Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 7,
      sNo: 7,
      eventTitle: "Himal Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 8,
      sNo: 8,
      eventTitle: "Pahad Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 9,
      sNo: 9,
      eventTitle: "Terai Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 10,
      sNo: 10,
      eventTitle: "Kathmandu Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 11,
      sNo: 11,
      eventTitle: "Patan Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },
    {
      id: 12,
      sNo: 12,
      eventTitle: "Bhaktapur Diwas",
      location: "Basantapur, Lalitpur",
      startDate: "2081/08/30",
      endDate: "2081/08/30",
      time: "11 AM",
      action: "view more",
    },

    // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  // function handleViewMore(row) {
  //   setOpen(true);
  //   setSelectedRow(row);
  //   // console.log("row data form handleViewMore() ", row);
  // }

  const handleViewMore = useCallback((row) => {
    setOpen(true);
    setSelectedRow(row);
  }, []);

  // function handleClose() {
  //   setOpen(false);
  //   setSelectedRow(null);
  //   console.log("handle close clicked");
  // }

  const handleClose = useCallback(()=>{
    setOpen(false)
    setSelectedRow(null)
    console.log('handle close clicked');
  })

  return (
    // <Paper sx={{ height: 400, width: '100%' }}>
    <Paper
      sx={{
        height: 550,
        width: "100%",
      }}
    >
      <DataGrid
        className="table-auto"
        rows={rows}
        columns={columns}
        rowHeight={44}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
        // checkboxSelection
        sx={{
          width: "100%",
          fontSize: "14px",
          fontFamily: "Satoshi",
          border: 0,
          "& .MuiDataGrid-cell": {
            fontSize: "14px",
          },
          // "& .MuiDataGrid-columnHeaders": { backgroundColor: "green" },
        }}
        strictHeights={true}
      />
      {/* for Modal value */}
      <Modal open={open} onClose={handleClose}>
        <Box style={style}>
          {selectedRow && (
            <EventRequest onCloseClick={(prev) => setOpen(prev)} />
          )}
        </Box>
      </Modal>
    </Paper>
  );
}
