import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import history from "../services/history";
import { IProjectInfo } from "../model/project";
import { IProjectTimeSheet } from "../model/timesheet";
import moment from "moment";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "70%",
    overflowX: "auto"
  },
  table: {
    maxWidth: "100%"
  }
}));

interface IStatusMemberProps {
  members: string[];
  projects: IProjectInfo[];
  timesheets: IProjectTimeSheet[];
}

const StatusMembersComponent: React.FC<IStatusMemberProps> = (
  props: IStatusMemberProps
) => {
  const classes = useStyles();
  const getTimeFromMins = (mins: number) => {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    console.log(mins);
    if (mins === 0) return "00:00";
    let h = (mins / 60) | 0,
      m = mins % 60 | 0;
    let hour = h < 10 ? "0" + h : h;
    let min = m < 10 ? "0" + m : m;
    let time = hour + ":" + min;
    return time;
  };
  return (
    <Grid container direction="row" justify="center">
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Name</h4>
              </TableCell>
              <TableCell align="right">
                <h4>Projects</h4>
              </TableCell>
              <TableCell align="right">
                <h4>Budget</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.members
              .map((member: string) => ({
                name: member,
                project:
                  props.projects !== undefined
                    ? props.projects.filter(
                        (project: IProjectInfo) =>
                          project.members.name === member
                      ).length
                    : 0,
                time:
                  props.timesheets !== undefined
                    ? props.timesheets.filter(
                        (time: IProjectTimeSheet) =>
                          time.project.members.name === member
                      ).length !== 0
                      ? props.timesheets
                          .filter(
                            (time: IProjectTimeSheet) =>
                              time.project.members.name === member
                          )
                          .map((time: IProjectTimeSheet) => time.timeWorked)
                          .reduce((prev, curr) => prev + curr)
                      : 0
                    : 0
              }))
              .map(row => (
                <TableRow
                  key={row.name}
                  hover
                  onClick={e => {
                    history.push("/dash");
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.project}</TableCell>
                  <TableCell align="right">
                    {getTimeFromMins(row.time)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};
export default StatusMembersComponent;
