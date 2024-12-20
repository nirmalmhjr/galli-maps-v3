import * as React from "react";
import { useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import EventRequest from "../event request modal/EventRequest";
import NepaliDate from "nepali-datetime";

import CustomFooter from './CustomFooter'

export default function DataTable({ dataList }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // console.log("~~~~~~~`", dataList);

  function formatTime(isoString, value = "date") {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    // The hour '0' should be '12' const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    // for Date
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedTime = hours + " " + ampm;
    const formattedDate = year + "/" + month + "/" + day;

    return value === "date" ? formattedDate : formattedTime;

    // let nepali_Date =  NepaliDate.parseEnglishDate(isoString, 'YYYY-MM-DD')

    // return nepali_Date.toString()
  }

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
    {
      field: "startDate",
      headerName: "Start Date",
      minWidth: 140,
      flex: 2,
      valueFormatter: (params) => formatTime(params, "date"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      minWidth: 183,
      flex: 3,
      valueFormatter: (params) => formatTime(params),
    },
    {
      field: "time",
      headerName: "Time",
      minWidth: 134,
      flex: 2,
      valueFormatter: (params) => formatTime(params, "time"),
    },
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

  /* const rows = [
    // {sNo: , eventTitle: , location: ,startDate: , endDate: , time: , action: },
    dataList.map((data)=>{
      {
        id: data._id,
        sNo: 1234,
        eventTitle: data.name ,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        time: data.publishDate,
        action: "view more",
      },
    })
  ] */

  const rows = dataList.map((data, index) => ({
    id: data._id,
    sNo: index + 1,
    eventTitle: data.name,
    location: data.address,
    startDate: data.startDate,
    // startDate: NepaliDate.parseEnglishDate(data.startDate, "YYYY-MM-DD"),
    endDate: data.endDate,
    time: data.publishDate,
    action: "view more",
  }));

  const paginationModel = { page: 0, pageSize: 10 };

  function handleViewMore(row) {
    const filteredRow = dataList.find((data) => data._id === row.id);
    setOpen(true);
    setSelectedRow(filteredRow);
  }

  // const handleViewMore = useCallback((row) => {
  //   const filteredRow = dataList.find((data) => data._id === row.id);
  //   setOpen(true);
  //   // setSelectedRow(row);

  //   setSelectedRow(filteredRow);
  // }, []);

  function handleClose() {
    setOpen(false);
    setSelectedRow(null);
  }

  // const handleClose = useCallback(() => {
  //   setOpen(false);
  //   setSelectedRow(null);
  //   console.log("handle close clicked");
  // }, []);

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
        pagination={false}
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
        // strictHeights={true}
        disableColumnSorting
        disableRowSelectionOnClick
        components={{
          Footer: CustomFooter
        }}
        componentsProps={{ footer: { rowCount: rows.length, }, }}
      />

        

      {/* for Modal value */}
      <Modal open={open} onClose={handleClose}>
        <Box style={style}>
          {selectedRow && (
            <EventRequest
              onCloseClick={(prev) => setOpen(prev)}
              row={selectedRow}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
}
