import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import * as Papa from 'papaparse';
import { getOverlappingDaysInIntervals } from 'date-fns'
import { setTeamworks } from "../containers/Home/teamworkReducer";
import { useDispatch } from "react-redux";

export function Uploader({ children }) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const teamDays = (data) => {
    let results = {};

    const daysTogether = (startEmp1, endEmp1, startEmp2, endEmp2) => {
      let se1 = new Date(startEmp1);
      let se2 = new Date(startEmp2);
      let ee1 = (endEmp1) ? new Date(endEmp1) : Date.now();
      let ee2 = (endEmp2) ? new Date(endEmp2) : Date.now();

      return getOverlappingDaysInIntervals(
        { start: se1, end: ee1 },
        { start: se2, end: ee2 }
      );
    }

    data.map(tw => {
      data.map(twNext => {
        if (tw[1] === twNext[1] && tw[0] !== twNext[0]) {
          if (!results[tw[1]]) results[tw[1]] = {}

          const days = daysTogether(tw[2], tw[3], twNext[2], twNext[3]);

          if (!results[tw[1]][`${tw[0]}-${twNext[0]}`])
            results[tw[1]][`${tw[0]}-${twNext[0]}`] = 0
          if (!results[tw[1]][`${twNext[0]}-${tw[0]}`])
            results[tw[1]][`${twNext[0]}-${tw[0]}`] = 0

          results[tw[1]][`${tw[0]}-${twNext[0]}`] += days + 1;
          results[tw[1]][`${twNext[0]}-${tw[0]}`] += days + 1;
        }
      })
    })

    const final = Object.entries(results).map(([projectId, daysHash]) => {
      const sorted = Object.entries(daysHash).sort(([, a], [, b]) => a - b);
      const best = sorted.pop();

      return {
        id: `${projectId}-${best[0]}`,
        emp1: best[0].split('-')[0],
        emp2: best[0].split('-')[1],
        project: projectId,
        days: parseInt(best[1] / 2)
      }
    })

    return final;
  }

  const extractTeamworkData = (importedData) => {
    if (importedData.length === 0 || importedData[0].length !== 4) {
      setError('System cannot recognize the imported data!');
      return;
    }

    dispatch(setTeamworks(teamDays(importedData)));
  };

  const handleChange = e => {
    Papa.parse(e.target.files[0], {
      error: (err, file, inputElem, reason) => {
        console.log(err, reason);
        setError(err);
      },
      complete: (results, file) => {
        if (results.errors.length > 0) {
          setError(results.errors[0].message)
        } else {
          setError(null);
          extractTeamworkData(results.data);
        }
        console.log("Parsing complete:", results, file);
      }
    });
  };
  return (
    <div style={{ width: 300 }}>
      <Button
        variant="contained"
        component="label"
        fullWidth
      >
        Upload File
        <input type="file" onChange={handleChange} hidden />
      </Button>
      {error &&
        <Alert severity="error" style={{ marginTop: 4 }}>{error}</Alert>
      }
    </div>
  );
}
