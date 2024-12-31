import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import DataTable from "../Data Table/DataTable";
import Chip from "@mui/material/Chip";
import conf from "../../conf/conf";

export default function EventStatusWise() {
  const [value, setValue] = useState("1");

  const [eventData, setEventData] = useState({
    request: [],
    approved: [],
    rejected: [],
    requestCount: 0,
  });

  const token = sessionStorage.getItem("accessToken");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function dataFetch() {
    try {
      const response = await fetch(`${conf.apiUrl}/normal-events`);
      const data = await response.json();

      // filter the data on basis of status
      const request = data.data.results.filter(
        (application) => application.status === "new"
      );
      const approved = data.data.results.filter(
        (application) => application.status === "approved"
      );
      const rejected = data.data.results.filter(
        (application) => application.status === "rejected"
      );

      setEventData({
        request,
        approved,
        rejected,
        requestCount: request.length,
      });
    } catch (error) {
      console.log("Error from Fetching Data ", error);
    }
  }

  function triggerRefresh() {
    dataFetch();
  }

  useEffect(() => {
    dataFetch();
  }, []);

  return (
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
                  {value === "1" && (
                    <Chip
                      size="small"
                      label={eventData.requestCount}
                      sx={{ bgcolor: "#F9E3DA", color: "#E37547" }}
                    />
                  )}
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
          <DataTable
            dataList={eventData.request}
            triggerRefresh={triggerRefresh}
          />
        </TabPanel>
        <TabPanel value="2" sx={{ ml: -3 }}>
          <DataTable dataList={eventData.approved} />
        </TabPanel>
        <TabPanel value="3" sx={{ ml: -3 }}>
          <DataTable dataList={eventData.rejected} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
