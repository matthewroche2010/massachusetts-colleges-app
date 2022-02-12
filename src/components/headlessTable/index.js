import React from 'react';
import {readableFieldMapping as fields}
from '../../utilities/dataMapping/readableFieldMapping';
import {HeadlessTableRow} from '../headlessTableRow';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const HeadlessTable = ({data}) => {
  return (
    <table>
      <tbody>
        <HeadlessTableRow
          title={`${fields.CITY}, ${fields.STABBR},  ${fields.ZIP}`}
          value={
            `${data[fields.CITY]}, ${data[fields.STABBR]} ${data[fields.ZIP]}`
          }
        />
        <HeadlessTableRow
          title={fields.ADM_RATE}
          value={data[fields.ADM_RATE]}
        />
        <HeadlessTableRow
          title={fields.SAT_AVG}
          value={data[fields.SAT_AVG]}
        />
        <HeadlessTableRow
          title={fields.CCSIZSET}
          value={data[fields.CCSIZSET]}
        />
        <HeadlessTableRow
          title={fields.LOCALE}
          value={data[fields.LOCALE]}
        />
        <HeadlessTableRow
          title={fields.HIGHDEG}
          value={data[fields.HIGHDEG]}
        />
        <HeadlessTableRow
          title={fields.INSTURL}
          value={data[fields.INSTURL]}
        />
        <HeadlessTableRow
          title={fields.PROGRAMS}
          value={getProgramList(data[fields.PROGRAMS])}
        />
      </tbody>
    </table>
  );
};

const ScrollableDiv = styled.div`
  max-height:200px;
  overflow-y:auto;
`;

const StyledP = styled.p`
  margin:2px 4px;
`;

const getProgramList = (programs) => {
  if (!programs || programs.length === 0) {
    return <div>None</div>;
  }
  return (
    <React.Fragment>
      <ScrollableDiv>
        {programs.map( (program) => <StyledP key={program}>{program}</StyledP>)}
      </ScrollableDiv>
    </React.Fragment>
  );
};

HeadlessTable.propTypes = {
  data: PropTypes.object,
};
