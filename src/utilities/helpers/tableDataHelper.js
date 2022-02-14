import React from 'react';
import {validateUrl} from './pureFunctions';
import {Button} from '../../components/button';
import {readableFieldMapping as fields}
from '../dataMapping/readableFieldMapping';
import infoIcon from '../../assets/info-icon.svg';

export const createTableHeaders = () => {
  return (
    [
      {
        id: fields.INSTNM,
        isSortable: true,
      },
      {
        id: fields.CITY,
        isSortable: true,
      },
      {
        id: fields.ZIP,
        isSortable: true,
      },
      {
        id: fields.INSTURL,
        isSortable: true,
      },
      {
        id: fields.HIGHDEG,
        isSortable: true,
      },
      {
        id: fields.PROGRAMCOUNT,
        isSortable: true,
      },
      {
        id: 'Info',
      },
    ]
  );
};

export const createTableDataRowObject = (
    collegeObject,
    onClickInfo,
) => {
  const newCollegeObject = {
    recordId: collegeObject.recordId,
    values: [
      {
        value: collegeObject[fields.INSTNM],
      },
      {
        value: collegeObject[fields.CITY],
      },
      {
        value: collegeObject[fields.ZIP],
      },
      {
        value: getHomePageLink(collegeObject[fields.INSTURL].toLowerCase()),
        sortValue: collegeObject[fields.INSTURL].toLowerCase(),
        css: {
          textOverflow: 'ellipsis',
        },
      },
      {
        value: collegeObject[fields.HIGHDEG],
      },
      {
        value: collegeObject[fields.PROGRAMS].length,
        sortValue: collegeObject[fields.PROGRAMS].length,
        css: {
          textAlign: 'center',
        },
      },
      {
        value: getActionButtons(
            collegeObject.recordId,
            onClickInfo,
        ),
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
