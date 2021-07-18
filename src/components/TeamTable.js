import React from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export function TeamTable({ data }) {

  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Employee #1</TableCell>
            <TableCell align="right">Employee #2</TableCell>
            <TableCell align="right">Project ID</TableCell>
            <TableCell align="right">Days Worked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={`${row.id}`}>
              <TableCell align="right">{row.emp1}</TableCell>
              <TableCell align="right">{row.emp2}</TableCell>
              <TableCell align="right">{row.project}</TableCell>
              <TableCell align="right">{row.days}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
