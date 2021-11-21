import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';

export default function Predict() {

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [data, setData] = React.useState({
Projected_GDP: 50,
FDI_Net_Outflow: 50,
Current_Account_Balance: 50,
Agricultural_GDP: 50,
FDI_Net_Inflows: 50,
Manufacturing: 50,
Fertilizer_Consumption: 50,
Agriculture_Foresty_and_Fishing: 50,
Total_Debt: 50,
Total_Debt_Service: 50
});

function handleChange(e) {
const newdata = { ...data };
newdata[e.target.name] = e.target.value;
setData(newdata);
console.log(newdata);
}

function submit(e){
e.preventDefault();
handleClose();
alert("Machine learning model has been called with values: " + JSON.stringify(data));
}
  return (
  <div>
    <Button variant="outlined" style={{ height: "40px" }}  onClick={handleShow}>
      Predict
    </Button>
     <Modal show={show} onHide={handleClose} size="xl" centered>
     <form onSubmit={submit}>
            <Modal.Header closeButton>
              <Modal.Title>
                Adjust Metrics
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <TableContainer component={Paper}>
                   <Table aria-label="simple table">
                   <TableHead>
                             <TableRow>
                               <TableCell align="left">Metric</TableCell>
                               <TableCell align="left">Value</TableCell>
                               <TableCell align="left">Metric</TableCell>
                               <TableCell align="left">Value</TableCell>
                             </TableRow>
                    </TableHead>
                     <TableBody>

                        <TableRow>
                           <TableCell align="left">Projected GDP</TableCell>
                           <TableCell align="left">
                                <Slider name="Projected_GDP" value={data.Projected_GDP} aria-label="Default" valueLabelDisplay="on" onChange={handleChange}/>
                           </TableCell>
                           <TableCell align="left">FDI Net Outflow(% of GDP)</TableCell>
                           <TableCell align="left">
                                <Slider name="FDI_Net_Outflow" value={data.FDI_Net_Outflow} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                           </TableCell>
                         </TableRow>

                         <TableRow>
                            <TableCell align="left">Current Account Balance(% of GDP)</TableCell>
                            <TableCell align="left">
                                 <Slider name="Current_Account_Balance" value={data.Current_Account_Balance} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                            </TableCell>
                            <TableCell align="left">Agricultural GDP(% of GDP)</TableCell>
                            <TableCell align="left">
                                 <Slider name="Agricultural_GDP" value={data.Agricultural_GDP} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                            </TableCell>
                          </TableRow>

                          <TableRow>
                          <TableCell align="left">FDI Net Inflows(% of GDP)</TableCell>
                          <TableCell align="left">
                               <Slider name="FDI_Net_Inflows" value={data.FDI_Net_Inflows} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                          </TableCell>
                          <TableCell align="left">Manufacturing(% of GDP)</TableCell>
                          <TableCell align="left">
                               <Slider name="Manufacturing" value={data.Manufacturing} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Fertilizer Consumption(% of production)</TableCell>
                          <TableCell align="left">
                               <Slider name="Fertilizer_Consumption" value={data.Fertilizer_Consumption} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                          </TableCell>
                          <TableCell align="left">Agriculture, Foresty and Fishing, value added(% annual growth) </TableCell>
                          <TableCell align="left">
                               <Slider name="Agriculture_Foresty_and_Fishing" value={data.Agriculture_Foresty_and_Fishing} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Total Debt(% of total external debt)</TableCell>
                          <TableCell align="left">
                               <Slider name="Total_Debt" value={data.Total_Debt} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                          </TableCell>
                          <TableCell align="left">Total Debt Service(% of GNI) </TableCell>
                          <TableCell align="left">
                               <Slider name="Total_Debt_Service" value={data.Total_Debt_Service} aria-label="Default" valueLabelDisplay="on" onChange={handleChange} />
                          </TableCell>
                        </TableRow>

                     </TableBody>
                   </Table>
                 </TableContainer>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="contained" type="submit" >Call Machine Learning Model</Button>
            </Modal.Footer>
            </form>
            </Modal>
  </div>
  );
}
