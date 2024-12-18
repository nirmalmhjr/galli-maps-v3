import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import DataTable from "../Data Table/DataTable";

export default function EventStatusWise() {
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
          <TabList onChange={handleChange} aria-label="event status">
            <Tab
              label="Request"
              value="1"
              sx={{ fontSize: "14px", fontFamily: "Satoshi" }}
            />
            <Tab
              label="Approved"
              value="2"
              sx={{ fontSize: "14px", fontFamily: "Satoshi" }}
            />
            <Tab
              label="Rejected"
              value="3"
              sx={{ fontSize: "14px", fontFamily: "Satoshi" }}
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
