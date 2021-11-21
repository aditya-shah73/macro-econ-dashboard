import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import MoneyIcon from "@mui/icons-material/Money";
import AgricultureIcon from "@mui/icons-material/AgricultureOutlined";
import DebtIcon from "@mui/icons-material/Replay";
import TimelineIcon from "@mui/icons-material/TimelineSharp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import Predict from "./Predict";

const categories = [
  {
    title: "Macroeconomic",
    icon: <MoneyIcon />,
    subCategories: [
      { title: "GDP Growth Rate", key: "GDP_GROWTH_RATE" },
      { title: "GDP Current USD", key: "GDP_CURRENT_USD" },
      {
        title: "Current Account Balance (% of GDP)",
        key: "Current_ACCOUNT_BALANCE",
      },
      {
        title: "FDI-net inflows(BoP, current US$)",
        key: "FOREIGN_DIRECT_INVESTMENT_INFLOWS_USD",
      },
      {
        title: "FDI-net outflows(BoP, current US$)",
        key: "FOREIGN_DIRECT_INVESTMENT_OUTFLOWS_USD",
      },
      {
        title: "FDI-net inflows(% of GDP)",
        key: "FOREIGN_DIRECT_INVESTMENT_INFLOWS_GDP",
      },
      {
        title: "FDI-net outflows(% of GDP)",
        key: "FOREIGN_DIRECT_INVESTMENT_OUTFLOWS_GDP",
      },
    ],
  },
  {
    title: "Agriculture",
    icon: <AgricultureIcon />,
    subCategories: [
      {
        title: "Agricultural Contribution (% GDP)",
        key: "AGRICULTURAL_CONTRI_PER_GDP",
      },
      {
        title: "Manufacturing (% GDP)",
        key: "MANUFACTURING_PER_GDP",
      },
      {
        title:
          "Agriculture, Forestry, and Fishing, value added (annual % growth)",
        key: "AGRICULTUREM_FORESTRY_FISHING_GROWTH",
      },
      {
        title: "Fertilizer Consumption (Kg per hectre of arable land)",
        key: "FERTILIZER_CONSUMPTION",
      },
      {
        title: "Fertilizer Consumption (% of fertilizer production)",
        key: "FERTILIZER_CONSUMPTION_PER_PRODUCTION",
      },
    ],
  },
  {
    title: "Debt",
    icon: <DebtIcon />,
    subCategories: [
      {
        title: "Total Reserves in months of imports",
        key: "TOTAL_RESERVES_IN_MONTH_OF_IMPORTS",
      },
      {
        title: "Total Reserves (includes gold, current US$)",
        key: "TOTAL_RESERVES_INCLUDING_GOLD_USD",
      },
      {
        title: "Total Reserves (% of total external debt)",
        key: "TOTAL_RESERVES_PER_EXTERNAL_DEBT",
      },
      {
        title:
          "Debt Service (PPG and IMF only, % of exports of goods, services and primary income)",
        key: "DEBT_SERVICE_PPG_IMF",
      },
      {
        title: "Total Debt Service (% of GNI)",
        key: "DEBT_SERVICE_GNI",
      },
      {
        title: "GNI (current US$)",
        key: "GNI_USD",
      },
    ],
  },
];

function CollapsibleListItem({ data }) {
  const { title } = data;
  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}
function CollapsibleList({ data }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const { title, icon, subCategories } = data;
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subCategories?.map((subCategory) => (
            <CollapsibleListItem data={subCategory} key={subCategory?.key} />
          ))}
        </List>
      </Collapse>
    </>
  );
}
function SideBar({ height, isGovtRepresentative }) {
  return (
    <div
      className="px-3 d-flex flex-column justify-content-between"
      style={{
        height: height,
        borderRight: "solid 1px blue",
      }}
    >
      <List
        style={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          height: height - 60,
          overflowY: "scroll",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Graphs
          </ListSubheader>
        }
      >
        {categories?.map((category) => (
          <CollapsibleList data={category} key={category.title} />
        ))}
      </List>
      <div
        className="d-flex justify-content-end align-items-center"
        style={{ height: "60px" }}
      >
        {isGovtRepresentative && <Predict />}
        <Button variant="contained" style={{ height: "40px" }} className="ms-2">
          Save
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isGovtRepresentative: state.global.user === "representative",
  };
};
export default connect(mapStateToProps, null)(SideBar);
