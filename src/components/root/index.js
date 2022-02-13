import React, {useState, useEffect} from 'react';
import {Table} from '../table';
import {dataConsolidationHelper}
from '../../utilities/helpers/dataConsolidationHelper';
import {createTableDataRowObject}
  from '../../utilities/helpers/tableDataHelper';
import {filterArrayOfObjects, sortObjectsByProperty}
  from '../../utilities/helpers/pureFunctions';
import {InfoWindow} from '../infoWindow';
import {Map} from '../googleMap';
import {FlexRow} from '../flexContainers';
import {MinMaxButtons} from '../minMaxButtons';
import {DataFilterControls} from '../dataFilterControls';
import {colors} from '../../assets/colors';
import {readableFieldMapping as fields}
  from '../../utilities/dataMapping/readableFieldMapping';
import {useDispatch} from 'react-redux';
import {setPage} from '../table/tableSlice';
import '../../assets/index.scss';
import './index.scss';
import {setVisible} from '../infoWindow/infoWindowSlice';
const tableColumnWidths = [
  '35%', '10%', '10%', '20%', '15%', '10%', '5%',
];

export const Root = () => {
  const [joinedData, setJoinedData] = useState(null);
  const [tabularData, setTabularData] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [sortField, setSortField] = useState('');
  const [infoWindowTarget, setInfoWindowTarget] = useState(null);
  const [minMaxState, setMinMaxState] = useState('max');
  const [fullPageState, setFullPageState] = useState('min');
  const [filterValue, setFilterValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const dataPromise = dataConsolidationHelper();
    dataPromise.then((colleges) => {
      const latLons = formatMapData(colleges);
      setJoinedData(colleges);
      setMapData(latLons);
    });
  }, []);

  useEffect(() => {
    if (!joinedData) {
      return;
    }

    const tableData = joinedData.map((college) => {
      return createTableDataRowObject(
          college,
          onCollegeClicked,
      );
    });
    setTabularData(tableData);
  }, [joinedData]);

  useEffect(() => {
    if (!joinedData) {
      return;
    }
    const newJoinedData = [...joinedData];
    newJoinedData.sort(
        sortObjectsByProperty(`${sortField}`),
    );
    dispatch(setPage(1));
    setJoinedData(newJoinedData);
  }, [sortField]);

  useEffect(() => {
    if (!joinedData) {
      return;
    }
    const filteredData = filterArrayOfObjects(joinedData, filterValue);
    const tableData = filteredData.map((college) => {
      const tableDataObject = createTableDataRowObject(
          college,
          onCollegeClicked,
      );
      return tableDataObject;
    });
    dispatch(setPage(1));
    setTabularData(tableData);
    const latLons = formatMapData(filteredData);
    setMapData(latLons);
  }, [filterValue]);

  const onCollegeClicked = (recordId) => {
    const record = joinedData.find((item) => item.recordId === recordId);
    setInfoWindowTarget(record);
    dispatch( setVisible(true));
  };

  if (!joinedData || !tabularData || !mapData) {
    return null;
  }

  return (
    <div>
      <div id="pageHeader">
        <h4 style={{color: `rgb(${colors.default})`}}>
          Massachusetts College Scorecard Data
        </h4>
        <FlexRow
          horizontal="flex-start"
          vertical="center"
        >
        </FlexRow>
      </div>
      <div
        id="mapPane"
        className={minMaxState}
      >
        <Map
          records={mapData.length > 0 ? mapData : []}
          onMarkerClick={onCollegeClicked}
        />
      </div>
      <div
        id="tablePane"
        className={fullPageState === 'max' ? 'fullPage' : minMaxState}
      >
        <FlexRow
          id="tablePaneControls"
          vertical="center"
          horizontal="space-between"
        >

          <FlexRow
            id="tablePaneControls"
            vertical="center"
            horizontal="flex-start"
          >
            <DataFilterControls
              value={filterValue}
              onChange={(value) => {
                setFilterValue(value);
                tableScrollToTop();
              }}
            />
            {!tabularData || tabularData.length === 0 &&
            <h5>
              No Data Found
            </h5>
            }
          </FlexRow>
          <FlexRow
            vertical="center"
            horizontal="flex-end"
          >
            {fullPageState !== 'max' &&
            <MinMaxButtons
              minMaxState={minMaxState}
              onClick={setMinMaxState}
            />
            }
            {minMaxState !== 'min' &&
            <MinMaxButtons
              minMaxState={fullPageState}
              onClick={setFullPageState}
            />
            }
          </FlexRow>
        </FlexRow>

        <div id="scrollableTableWrapper">
          {tabularData && tabularData.length > 0 ?
            (
              <Table
                tableData={tabularData}
                sortField={sortField}
                columnWidths={tableColumnWidths}
                onSortFieldChange={setSortField}
                scrollTop={tableScrollToTop}
              />
            ) : (
              <FlexRow
                horizontal="center"
                vertical="center"
                css={{height: '100%'}}
              >
                <h2>
                  No Data Found
                </h2>
              </FlexRow>
            )
          }
        </div>
      </div>
      <InfoWindow
        data={infoWindowTarget}
        onClose={() => setInfoWindowTarget(null)}
      />
    </div>
  );
};

const formatMapData = (colleges) => {
  const latLons = [];
  colleges.forEach((college) => {
    const lat = college[fields.LATITUDE];
    const lng = college[fields.LONGITUDE];
    if (!isNaN(lat) && !isNaN(lng)) {
      latLons.push(
          {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            recordId: college.recordId,
          },
      );
    }
  });
  return latLons;
};

const tableScrollToTop = () => {
  document.querySelector('#scrollableTableWrapper').scrollTop = 0;
};
