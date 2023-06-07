import { useEffect, useState } from 'react';
import styles from './style.module.scss';

import Loading from '../../../../ui/Loading';
import Modal from '../../../../components/Modal';
import Table from '../../../../components/Table';

import tamplateDataModal, { titles } from '../../constants/tamplateDataModal';
import { useRecordsHttp } from '../../helpers/recordsHttp.hook';

function RecordsModule() {
  const {
    loading,
    error,
    deleteRecord,
    createRecord,
    updateRecord,
    requestWorkers,
    requestRecords,
  } = useRecordsHttp();

  const [records, setRecords] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [regimModal, setRegimModal] = useState('update');
  const [dataModal, setDataModal] = useState([]);
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
      const responceWorkers = await requestWorkers();

      setRecords(responceRecords);
      setWorkers(responceWorkers);

      const formatedList = makeFormatedList(responceRecords.resultRecords);

      setRenderList(formatedList);
    } catch (e) {}
  }

  function makeFormatedList(inputList) {
    const resultList = inputList.map((record) => {
      return {
        date: new Date(record.date).toLocaleDateString(),
        money_account: record.money_account,
        source_from: record.source_from,
        income: record.income + ' грн.',
        costs: record.costs + ' грн.',
        already_paid: record.already_paid + ' грн.',
      };
    });

    return resultList;
  }

  function handleClickRow(index) {
    setRegimModal('update');

    const tempDataModal = JSON.parse(JSON.stringify(tamplateDataModal));
    tempDataModal.worker_full_name.options = workers.map((worker) => {
      return { key: worker.full_name, value: worker.full_name };
    });
    tempDataModal.worker_full_name.options.push({
      key: null,
      value: 'Не задано',
    });

    for (const [key, value] of Object.entries(records.resultRecords[index])) {
      if (tempDataModal[key]) {
        let formatedValue = value ?? 'Не задано';

        switch (key) {
          case 'date':
            formatedValue = new Date(formatedValue).toLocaleDateString('en-CA');
            break;
        }

        tempDataModal[key].value = formatedValue;
      }
    }

    setDataModal(Object.values(tempDataModal));
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  async function handleClickDelete(id) {
    handleCloseModal();

    await deleteRecord(id);

    await loadRecords();
  }

  async function handleSubmitModal(newValues) {
    const formatedValues = {};
    let income = null;
    let costs = null;
    let already_paid = null;
    let worker_full_name = null;

    for (let parameter of newValues) {
      formatedValues[parameter.name] = parameter.value;

      switch (parameter.name) {
        case 'income':
          income = parameter.value;
          break;
        case 'costs':
          costs = parameter.value;
          break;
        case 'already_paid':
          already_paid = parameter.value;
          break;
        case 'worker_full_name':
          worker_full_name = parameter.value;
          break;
      }
    }

    formatedValues.income = {
      price: income,
    };

    formatedValues.costs = {
      workers_id: workers.find((worker) => worker.full_name === worker_full_name)?.id,
      price: costs,
      already_paid: already_paid,
    };

    if (regimModal === 'update') {
      await updateRecord(formatedValues);
    } else {
      await createRecord(formatedValues);
    }

    handleCloseModal();

    await loadRecords();
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

  function handleClickCreate() {
    setRegimModal('create');

    const tempDataModal = JSON.parse(JSON.stringify(tamplateDataModal));
    tempDataModal.worker_full_name.options = workers.map((worker) => {
      return { key: worker.full_name, value: worker.full_name };
    });
    tempDataModal.worker_full_name.options.push({
      key: null,
      value: 'Не задано',
    });

    setDataModal(Object.values(tempDataModal));
    setShowModal(true);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {showModal && (
        <Modal
          title={'Деталі запису'}
          datas={dataModal}
          onClose={handleCloseModal}
          onChange={handleSubmitModal}
          onClickDelete={handleClickDelete}
          isInput
          hasDelete
          regimModal={regimModal}
        />
      )}
      {error ? (
        <div className={styles.error_message}>{error.message}</div>
      ) : (
        <>
          <Table
            titles={titles}
            contents={renderList}
            onClick={handleClickRow}
            onClickCreate={handleClickCreate}
            onChangeStartDate={handleChangeStartDate}
            onChangeEndDate={handleChangeEndDate}
            onApplyFilter={handleApplyFilter}
            startDateValue={filterDate.start_date}
            endDateValue={filterDate.end_date}
            typeFileter="date"
            hasCreate
          />
        </>
      )}
    </>
  );
}

export default RecordsModule;
