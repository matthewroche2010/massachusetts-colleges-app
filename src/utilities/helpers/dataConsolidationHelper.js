import {collegeDegreeMapping} from '../dataMapping/collegeDegreeMapping';
import {collegeCarnegieClassificationMapping}
from '../dataMapping/collegeCarnegieClassificationMapping';
import {collegeLocaleMapping} from '../dataMapping/collegeLocaleMapping';
import AjaxHelper from '../helpers/ajaxHelper';
import {readableFieldMapping} from '../dataMapping/readableFieldMapping';

const handleError = (response) => {
  alert('Error: ' + response.status + ' ' + response.statusText);
};

export const dataConsolidationHelper = () => {
  const collegeDataPromise = new Promise((resolve, reject) => {
    AjaxHelper.xhr('ma_schools.json', (response) => {
      if (response.error) {
        handleError(response);
        reject(new Error('xhr error'));
      }
      resolve(response);
    });
  });

  const degreeProgramPromise = new Promise((resolve, reject) => {
    AjaxHelper.xhr('programs.json', (response) => {
      if (response.error) {
        handleError(response);
        reject(new Error('xhr error'));
      }
      resolve(response);
    });
  });

  return new Promise((resolve, reject) => {
    Promise.all([
      collegeDataPromise,
      degreeProgramPromise,
    ]).then((responses) => {
      const programs = {...responses[1]};
      const colleges = responses[0].map((college) => {
        const newCollege = insertHumanReadableValues(college, programs);
        return newCollege;
      });
      resolve(colleges);
    });
  });
};

const insertHumanReadableValues = (collegeObject, programs) => {
  if (collegeLocaleMapping.hasOwnProperty(collegeObject.LOCALE)) {
    collegeObject.LOCALE = collegeLocaleMapping[collegeObject.LOCALE];
  }
  if (collegeDegreeMapping.hasOwnProperty(collegeObject.HIGHDEG)) {
    collegeObject.HIGHDEG = collegeDegreeMapping[collegeObject.HIGHDEG];
  }
  if (collegeCarnegieClassificationMapping
      .hasOwnProperty(collegeObject.CCSIZSET)) {
    collegeObject.CCSIZSET =
      collegeCarnegieClassificationMapping[collegeObject.CCSIZSET];
  }
  let admissionRate = '';
  if (!collegeObject.ADM_RATE || isNaN(collegeObject.ADM_RATE)) {
    admissionRate = 'No Data';
  } else {
    admissionRate = `${(parseFloat(collegeObject.ADM_RATE) * 100).toFixed(2)}%`;
  }
  collegeObject.ADM_RATE = admissionRate;
  const programStrings = collegeObject.PROGRAMS.map((code) => {
    if (programs.hasOwnProperty(code)) {
      return ` - ${programs[code]}`;
    }
  });

  programStrings.sort();

  collegeObject.PROGRAMS = programStrings;
  collegeObject.PROGRAMCOUNT = programStrings.length;

  const newCollegeObject = {};
  for (const key in readableFieldMapping) {
    if (collegeObject.hasOwnProperty(key)) {
      newCollegeObject[readableFieldMapping[key]] = collegeObject[key];
    }
  }

  newCollegeObject.recordId =
    `${newCollegeObject['Institution Name']}-${newCollegeObject['Zip']}`;

  return newCollegeObject;
};


