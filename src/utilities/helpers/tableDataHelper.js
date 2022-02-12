import React from 'react';
import {validateUrl} from './pureFunctions';
import {Button} from '../../components/button';
import {readableFieldMapping as fields}
from '../dataMapping/readableFieldMapping';
import infoIcon from '../../assets/info-icon.svg';

export const createTableDataRowObject = (
    collegeObject,
    onClickInfo,
) => {
  const newCollegeObject = {
    recordId: collegeObject.recordId,
    values: [
      {
        key: fields.INSTNM,
        value: collegeObject[fields.INSTNM],
        isSortable: true,
      },
      {
        key: fields.CITY,
        value: collegeObject[fields.CITY],
        isSortable: true,
      },
      {
        key: fields.ZIP,
        value: collegeObject[fields.ZIP],
        isSortable: true,
      },
      {
        key: fields.INSTURL,
        value: getHomePageLink(collegeObject[fields.INSTURL].toLowerCase()),
        isSortable: true,
        css: {
          textOverflow: 'ellipsis',
        },
      },
      {
        key: fields.HIGHDEG,
        value: collegeObject[fields.HIGHDEG],
        isSortable: true,
      },
      {
        key: fields.PROGRAMCOUNT,
        value: getPrograms(
            collegeObject[fields.PROGRAMS],
        ),
        isSortable: true,
        css: {
          textAlign: 'center',
        },
      },
      {
        key: 'Info',
        value: getActionButtons(
            collegeObject.recordId,
            onClickInfo,
        ),
        isSortable: false,
        css: {
          textAlign: 'center',
        },
      },
    ],
  };

  return newCollegeObject;
};

const getActionButtons = (recordId, onClickInfo) => {
  return (
    <Button
      color="primary"
      styleOverrides={{color: '#fff', height: 18, width: 18}}
      onClick={() => onClickInfo(recordId)}
    >
      <img src={infoIcon}/>
    </Button>
  );
};

const getPrograms = (programs) => {
  if (!programs || programs.length === 0) {
    return (
      <p>N/A</p>
    );
  }
  if (!Array.isArray(programs)) {
    return <p>{programs}</p>;
  }
  const title = programs.join('\n');
  return (
    <p title={title}>{programs.length}</p>
  );
};

const getHomePageLink = (url) => {
  let fqdn;
  if (url.indexOf('http') === 0) {
    fqdn = url;
  } else if (url.indexOf('www') === 0) {
    fqdn = 'https://' + url;
  } else {
    fqdn = 'https://' + url;
  }

  /**
   * If the the processed url is not a valid
   * fqdn, return the raw url text without hyperlink.
   */
  if (!validateUrl(fqdn)) {
    return (
      <p>{url}</p>
    );
  }

  return (
    <a href={fqdn} target="_blank" rel="noreferrer">{url}</a>
  );
};
