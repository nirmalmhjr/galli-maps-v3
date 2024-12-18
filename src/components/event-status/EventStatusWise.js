import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import DataTable from "../Data Table/DataTable";
import Chip from "@mui/material/Chip";

export default function EventStatusWise() {
  const [requestCount, setRequestCount] = useState(2);
  const [value, setValue] = useState("1");

  //   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{ width: '100%' }}>
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="event status"
            TabIndicatorProps={{ style: { backgroundColor: "#E37547" } }}
            sx={{
              ".MuiTab-root": {
                "&.Mui-selected": { color: "#E37547" },
              },
            }}
          >
            <Tab
              value="1"
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "Satoshi",
                      textTransform: "none",
                    }}
                  >
                    Request
                  </span>
                  <Chip
                    label={requestCount}
                    sx={{ bgcolor: "#F9E3DA", color: "#E37547" }}
                  />{" "}
                </Box>
              }
            />
            <Tab
              label="Approved"
              value="2"
              sx={{
                fontSize: "14px",
                fontFamily: "Satoshi",
                textTransform: "none",
              }}
            />
            <Tab
              label="Rejected"
              value="3"
              sx={{
                fontSize: "14px",
                fontFamily: "Satoshi",
                textTransform: "none",
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ ml: -3 }}>
          <DataTable />
        </TabPanel>
        <TabPanel value="2" sx={{ ml: -3 }}>
          Approved
        </TabPanel>
        <TabPanel value="3" sx={{ ml: -3 }}>
          Rejected
        </TabPanel>
      </TabContext>
    </Box>
  );
}
