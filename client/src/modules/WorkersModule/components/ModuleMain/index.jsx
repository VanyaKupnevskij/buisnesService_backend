import styles from './style.module.scss';

import Loading from '../../../../ui/Loading';
import Table from '../../../../components/Table';
import Modal from '../../../../components/Modal';

import { useEffect, useState } from 'react';
import tamplateDataModal, { titles } from '../../constants/tamplateDataModal';
import { useWorkersHttp } from '../../helpers/workersHttp.hook';

function WorkersModule() {
  const { loading, error, deleteWorker, createWorker, requestWorkers } = useWorkersHttp();

  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [renderList, setRenderList] = useState([]);
  const [regimModal, setRegimModal] = useState('view');
  const [dataModal, setDataModal] = useState([]);

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    const responceWorkers = await requestWorkers();

    setWorkers(responceWorkers);

    const formatedList = makeFormatedList(responceWorkers);

    setRenderList(formatedList);
  }

  function makeFormatedList(inputList) {
    const resultList = inputList.map((worker) => {
      return {
        full_name: worker.full_name,
        money_account: worker.money_account,
        realm: worker.realm,
        salary: worker.salary + ' грн.',
      };
    });

    return resultList;
  }

  function handleClickRow(index) {
    setRegimModal('view');

    const tempDataModal = JSON.parse(JSON.stringify(tamplateDataModal));

    for (const [key, value] of Object.entries(workers[index])) {
      if (tempDataModal[key]) {
        let formatedValue = value ?? 'Не задано';

        tempDataModal[key].value = formatedValue;
      }
    }

    setDataModal(Object.values(tempDataModal));
    setShowModal(true);
  }

  function handleClickCreate() {
    setRegimModal('create');

    const tempDataModal = JSON.parse(JSON.stringify(tamplateDataModal));

    setDataModal(Object.values(tempDataModal));
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  async function handleClickDelete(id) {
    handleCloseModal();

    await deleteWorker(id);

    await loadWorkers();
  }

  async function handleSubmitModal(newValues) {
    const formatedValues = {};

    for (let parameter of newValues) {
      formatedValues[parameter.name] = parameter.value;
    }

    if (regimModal === 'create') {
      await createWorker(formatedValues);
    }

    handleCloseModal();

    await loadWorkers();
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {showModal && (
        <Modal
          title={'Деталі працівника'}
          datas={dataModal}
          onClose={handleCloseModal}
          onClickDelete={handleClickDelete}
          onChange={handleSubmitModal}
          hasDelete
          isInput={regimModal === 'create'}
          regimModal={regimModal}
        />
      )}
      {error ? (
        <div className={styles.error_message}>{error.message}</div>
      ) : (
        <Table
          className={styles.table}
          titles={titles}
          contents={renderList}
          hasFilter={false}
          hasCreate
          onClick={handleClickRow}
          onClickCreate={handleClickCreate}
        />
      )}
    </>
  );
}

export default WorkersModule;
