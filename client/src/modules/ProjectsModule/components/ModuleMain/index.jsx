import { useEffect, useState } from 'react';
import styles from './style.module.scss';

import Loading from '../../../../ui/Loading';
import Table from '../../../../components/Table';
import Modal from '../../../../components/Modal';

import tamplateDataModal, { titles } from '../../constants/tamplateDataModal';
import { useProjectsHttp } from '../../helpers/projectsHttp.hook';
import { useProject } from '../../../../hooks/projects.hook';

function ProjectsModule() {
  const { selectProject, selectedId } = useProject();
  const { loading, error, createProject, requestProjects } = useProjectsHttp();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [renderList, setRenderList] = useState([]);
  const [regimModal, setRegimModal] = useState('view');
  const [dataModal, setDataModal] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const responceProjects = await requestProjects();

    setProjects(responceProjects);

    const formatedList = makeFormatedList(responceProjects);

    setRenderList(formatedList);
  }

  function makeFormatedList(inputList) {
    const resultList = inputList.map((project) => {
      return { name: project.name, category: project.category };
    });

    return resultList;
  }

  function indefOfSelected(id) {
    for (let index in projects) {
      if (projects[index].id === id) {
        return Number(index);
      }
    }
    return -1;
  }

  function handleSelect(index) {
    selectProject(projects[index].id);
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

  async function handleSubmitModal(newValues) {
    const formatedValues = {};

    for (let parameter of newValues) {
      formatedValues[parameter.name] = parameter.value;
    }

    if (regimModal === 'create') {
      await createProject(formatedValues);
    }

    handleCloseModal();

    await loadProjects();
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {showModal && (
        <Modal
          title={'Деталі проетку'}
          datas={dataModal}
          onClose={handleCloseModal}
          onChange={handleSubmitModal}
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
          onClick={handleSelect}
          selectedRow={indefOfSelected(selectedId)}
          hasFilter={false}
          hasCreate
          onClickCreate={handleClickCreate}
        />
      )}
    </>
  );
}

export default ProjectsModule;
