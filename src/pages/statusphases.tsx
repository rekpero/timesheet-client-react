import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import history from './history';
const useStyles = makeStyles({
  root: {
    width: '70%',
    overflowX: 'auto',
    marginLeft: '15%',
  },
  table: {
    maxWidth: '100%',
  },
});

function createData(name: string, project: number) {
  return { name, project };
  
}

const rows = [
  createData('Development', 9),
  createData('Testing', 7),
  createData('Design', 2),
];

 function StatusPhases() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h4>Project</h4></TableCell>
            <TableCell align="right"><h4>Budget</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow  key={row.name}  hover onClick={e =>{ history.push('/dash')} }>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.project}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </Paper>
  );
}
export default StatusPhases;