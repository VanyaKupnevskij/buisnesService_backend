import { useEffect, useState } from 'react';
import styles from './style.module.scss';

import Loading from '../../../../ui/Loading';

import { useRecordsHttp } from '../../helpers/recordsHttp.hook';
import Graphic from '../../../../components/Graphic';

function GraphicsModule() {
  const { loading, error, requestRecords } = useRecordsHttp();

  const [records, setRecords] = useState([]);
  const [dataIncome, setDataIncome] = useState([]);
  const [dataCosts, setDataCosts] = useState([]);
  const [filterDate, setFilterDate] = useState({
    start_date: undefined,
    end_date: undefined,
  });

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const params = {};
      if (filterDate.start_date) {
        params.start_date = filterDate.start_date;
      }
      if (filterDate.end_date) {
        params.end_date = filterDate.end_date;
      }

      const responceRecords = await requestRecords(params);

      setRecords(responceRecords);

      const { formatedIncome, formatedCosts } = makeFormatedPoints(responceRecords.resultRecords);

      setDataIncome(formatedIncome);
      setDataCosts(formatedCosts);
    } catch (e) {}
  }

  function makeFormatedPoints(inputList) {
    const formatedIncome = inputList.map((record) => {
      return { x: new Date(record.date), y: record.income };
    });
    const formatedCosts = inputList.map((record) => {
      return { x: new Date(record.date), y: record.costs };
    });

    return { formatedIncome, formatedCosts };
  }

  function handleChangeStartDate(newDate) {
    setFilterDate({ ...filterDate, start_date: newDate });
  }

  function handleChangeEndDate(newDate) {
    setFilterDate({ ...filterDate, end_date: newDate });
  }

  function handleApplyFilter() {
    loadRecords();
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {error ? (
        <div className={styles.error_message}>{error.message}</div>
      ) : (
        <>
          <Graphic
            title={'Прибутки та витрати'}
            dataPointsIncome={dataIncome}
            dataPointsCosts={dataCosts}
            onChangeStartDate={handleChangeStartDate}
            onChangeEndDate={handleChangeEndDate}
            onApplyFilter={handleApplyFilter}
            startDateValue={filterDate.start_date}
            endDateValue={filterDate.end_date}
          />
        </>
      )}
    </>
  );
}

export default GraphicsModule;
