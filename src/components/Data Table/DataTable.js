import * as React from "react";
import { useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import EventRequest from "../event request modal/EventRequest";
import NepaliDate from "nepali-datetime";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function DataTable({ dataList }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
    { field: "sNo", headerName: "S.N", width: 62, flex: 1 },
    { field: "eventTitle", headerName: "Event Title", width: 216, flex: 3 },
    { field: "location", headerName: "Location", width: 275, flex: 4 },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 140,
      flex: 2,
      valueFormatter: (params) => formatTime(params, "date"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 183,
      flex: 3,
      valueFormatter: (params) => formatTime(params),
    },
    {
      field: "time",
      headerName: "Time",
      width: 134,
      flex: 2,
      valueFormatter: (params) => formatTime(params, "time"),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
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

  function handleViewMore(row) {
    const filteredRow = dataList.find((data) => data._id === row.id);
    setOpen(true);
    setSelectedRow(filteredRow);
  }

  function handleClose() {
    setOpen(false);
    setSelectedRow(null);
  }

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const totalRows = dataList.length;
  const totalPages = Math.ceil(totalRows / paginationModel.pageSize);

  const handlePageChange = (newPage) => {
    setPaginationModel({ ...paginationModel, page: newPage });
  };

  const renderPaginationItems = () => {
    const items = [];

    const maxVisiblePages = totalPages;

    let startPage = Math.max(
      0,
      paginationModel.page - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            width: 28,
            height: 28,
            marginBottom: "-20px",
            alignItems: "center",
            margin: "5px",
            padding: "5px 10px",
            border: 0,
            borderRadius: paginationModel.page === i ? "50%" : "0",
            backgroundColor: paginationModel.page === i ? "#F9E3DA" : "", // Highlight current page
            color: paginationModel.page === i ? "#E37547" : "black", // Highlight current page
            cursor: "pointer",
          }}
        >
          {i + 1}
        </button>
      );
    }
    return items;
  };

  const calculatedHeight = Math.min(totalRows * 44 + 100, 550);
  return (
    <>
      <Paper
        sx={{
          height: 499,
          // height: calculatedHeight,
          width: "100%",
        }}
      >
        <DataGrid
          className="table-auto"
          rows={rows}
          columns={columns}
          rowHeight={44}
          initialState={{ pagination: { paginationModel } }}
          sx={{
            width: "100%",
            fontSize: "14px",
            fontFamily: "Satoshi",
            border: 0,
            "& .MuiDataGrid-cell": {
              fontSize: "14px",
            },
          }}
          disableColumnSorting
          disableRowSelectionOnClick
          // onPageChange ={(params) => handlePageChange(params.page)}
          // onPageChange={(params) => console.log(params)}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          hideFooter
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
      {/* Custom Pagination Component */}
      <div className="flex justify-between items-center p-3 mt-2">
        {/* trying empty for spacing for flex of pagination */}
        <div></div>
        <div>{renderPaginationItems()}</div>
        <div className="flex ">
          <button
            className="flex justify-center items-center"
            onClick={() =>
              handlePageChange(Math.max(0, paginationModel.page - 1))
            }
            disabled={paginationModel.page === 0}
            style={{
              width: 107,
              height: 38,
              marginRight: "10px",
              padding: "10px ",
              paddingRight: "25px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: paginationModel.page === 0 ? "#eee" : "white",
              color: paginationModel.page === 0 ? "#aaa" : "black",
            }}
          >
            {/* <IconButton> */}
            <KeyboardArrowLeftIcon /> {/* </IconButton> */}
            Previous
          </button>
          <button
            className="flex justify-center items-center"
            onClick={() =>
              handlePageChange(
                Math.min(totalPages - 1, paginationModel.page + 1)
              )
            }
            disabled={paginationModel.page >= totalPages - 1}
            style={{
              width: 84,
              height: 38,
              marginLeft: "10px",
              padding: "10px",
              paddingLeft: "25px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor:
                paginationModel.page >= totalPages - 1 ? "#eee" : "white",
              color: paginationModel.page >= totalPages - 1 ? "#aaa" : "black",
            }}
          >
            Next
            {/* <IconButton> */}
            <KeyboardArrowRightIcon />
            {/* </IconButton> */}
          </button>
        </div>
      </div>
    </>
  );
}
