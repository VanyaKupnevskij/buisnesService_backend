import styles from './style.module.scss';

import Loading from '../../../../ui/Loading';
import Modal from '../../../../components/Modal';
import Table from '../../../../components/Table';
import Numeric from '../../../../components/Numeric';
import NumericTotal from '../../../../components/NumericTotal';
import NumericPercent from '../../../../components/NumericPercent';

import { useHttp } from '../../../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/auth.hook';
import { useProject } from '../../../../hooks/projects.hook';

function GeneralModule() {
  const { loading, request, error } = useHttp();
  const { selectedId } = useProject();
  const { token } = useAuth();
  const [records, setRecords] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [renderListIncome, setRenderListIncome] = useState([]);
  const [renderListCosts, setRenderListCosts] = useState([]);
  const [marginality, setMarginality] = useState({ lastYear: 0, lastMonth: 0, lastDay: 0 });
  const [profitability, setProfitability] = useState({ lastYear: 0, lastMonth: 0, lastDay: 0 });
  const [income, setIncome] = useState({ lastYear: 0, lastMonth: 0, lastDay: 0 });
  const [costs, setCosts] = useState({ lastYear: 0, lastMonth: 0, lastDay: 0 });
  const [pointsInome, setPointsIncome] = useState({
    lastYear: [],
    lastMonth: [],
    markYear: 'Прибутки по місяцям',
    markMonth: 'Прибутки по дням',
    percentYear: 0,
    percentMonth: 0,
  });
  const [pointsCosts, setPointsCosts] = useState({
    lastYear: [],
    lastMonth: [],
    markYear: 'Витрати по місяцям',
    markMonth: 'Витрати по дням',
    percentYear: 0,
    percentMonth: 0,
  });
  const [filterTable, setFilterTable] = useState({ income: 'all_time', costs: 'all_time' }); // month_time, year_time

  const [showModal, setShowModal] = useState(false);

  const titlesIncome = ['Дата', 'Рахунок', 'Джерело', 'Прибуток'];
  const titlesCosts = ['Дата', 'Рахунок', 'Джерело', 'Витрати', 'Вже оплачено'];
  const titlesModal = {
    date: 'Дата',
    money_account: 'Рахунок',
    comment: 'Коментар',
    source_from: 'Джерело',
    income: 'Прибуток',
    costs: 'Витрати',
    already_paid: 'Оплачено',
    worker_full_name: "Ім'я працівника",
    worker_money_account: 'Рахунок працівника',
    worker_realm: 'Спеціалізація працівника',
    worker_salary: 'Зарплатня працівника',
  };

  const [dataModal, setDataModal] = useState([]);

  function handleClickRow(index) {
    setShowModal(true);

    const tempDataModal = [];
    for (const [key, value] of Object.entries(records.resultRecords[index])) {
      if (titlesModal[key]) {
        let formatedValue = value;

        switch (key) {
          case 'date':
            formatedValue = new Date(formatedValue).toLocaleDateString('en-CA');
            break;
        }

        tempDataModal.push({
          title: titlesModal[key],
          value: formatedValue,
        });
      }
    }

    setDataModal(tempDataModal);
  }

  async function loadRecords() {
    try {
      const responceRecords = await request({
        url: '/records',
        method: 'get',
        bearerToken: token,
        params: {
          projects_id: selectedId,
        },
      });
      const responceWorkers = await request({
        url: '/workers',
        method: 'get',
        bearerToken: token,
      });

      setRecords(responceRecords);
      setWorkers(responceWorkers);

      // set additional information
      const yearsInfo = Object.entries(responceRecords.additionalInfo.year);
      const monthsInfo = Object.entries(responceRecords.additionalInfo.month);
      const daysInfo = Object.entries(responceRecords.additionalInfo.day);
      setIncome({
        lastYear: yearsInfo[yearsInfo.length - 1][1].income,
        lastMonth: monthsInfo[monthsInfo.length - 1][1].income,
        lastDay: daysInfo[daysInfo.length - 1][1].income,
      });
      setCosts({
        lastYear: yearsInfo[yearsInfo.length - 1][1].costs,
        lastMonth: monthsInfo[monthsInfo.length - 1][1].costs,
        lastDay: daysInfo[daysInfo.length - 1][1].costs,
      });
      setMarginality({
        lastYear: yearsInfo[yearsInfo.length - 1][1].marginality,
        lastMonth: monthsInfo[monthsInfo.length - 1][1].marginality,
        lastDay: daysInfo[daysInfo.length - 1][1].marginality,
      });
      setProfitability({
        lastYear: yearsInfo[yearsInfo.length - 1][1].profitability,
        lastMonth: monthsInfo[monthsInfo.length - 1][1].profitability,
        lastDay: daysInfo[daysInfo.length - 1][1].profitability,
      });

      setPointsIncome({
        markYear: 'Прибутки по місяцям',
        markMonth: 'Прибутки по дням',
        lastYear: monthsInfo.map((data) => data[1].income),
        lastMonth: daysInfo.map((data) => data[1].income),
        percentYear:
          (monthsInfo[monthsInfo.length - 1][1].income / monthsInfo[0][1].income) * 100 - 100,
        percentMonth: (daysInfo[daysInfo.length - 1][1].income / daysInfo[0][1].income) * 100 - 100,
      });
      setPointsCosts({
        markYear: 'Витрати по місяцям',
        markMonth: 'Витрати по дням',
        lastYear: monthsInfo.map((data) => data[1].costs),
        lastMonth: daysInfo.map((data) => data[1].costs),
        percentYear:
          (monthsInfo[monthsInfo.length - 1][1].costs / monthsInfo[0][1].costs) * 100 - 100,
        percentMonth: (daysInfo[daysInfo.length - 1][1].costs / daysInfo[0][1].costs) * 100 - 100,
      });

      // set list info
      const { formatedListIncome, formatedListCosts } = getFormatedList(responceRecords);

      setRenderListIncome(formatedListIncome);
      setRenderListCosts(formatedListCosts);
    } catch (e) {}
  }

  function getFormatedList(records) {
    if (!records || records.length === 0) return { formatedListIncome: [], formatedListCosts: [] };

    const yearsInfo = Object.entries(records.additionalInfo.year);
    const monthsInfo = Object.entries(records.additionalInfo.month);

    const formatedListIncome = records.resultRecords.map((record) => {
      switch (filterTable.income) {
        case 'year_time':
          if (new Date(yearsInfo[yearsInfo.length - 1][0] + '-01-01') > new Date(record.date)) {
            return;
          }
          break;
        case 'month_time':
          if (
            new Date(
              yearsInfo[yearsInfo.length - 1][0] +
                '-' +
                monthsInfo[monthsInfo.length - 1][0] +
                '-01',
            ) > new Date(record.date)
          ) {
            return;
          }
          break;
      }

      return {
        date: new Date(record.date).toLocaleDateString(),
        money_account: record.money_account,
        source_from: record.source_from,
        income: record.income + ' грн.',
      };
    });

    const formatedListCosts = records.resultRecords.map((record) => {
      switch (filterTable.costs) {
        case 'year_time':
          if (new Date(yearsInfo[yearsInfo.length - 1][0] + '-01-01') > new Date(record.date)) {
            return;
          }
          break;
        case 'month_time':
          if (
            new Date(
              yearsInfo[yearsInfo.length - 1][0] +
                '-' +
                monthsInfo[monthsInfo.length - 1][0] +
                '-01',
            ) > new Date(record.date)
          ) {
            return;
          }
          break;
      }

      return {
        date: new Date(record.date).toLocaleDateString(),
        money_account: record.money_account,
        source_from: record.source_from,
        costs: record.costs + ' грн.',
        already_paid: record.already_paid + ' грн.',
      };
    });

    return { formatedListIncome, formatedListCosts };
  }

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    const { formatedListIncome, formatedListCosts } = getFormatedList(records);

    setRenderListIncome(formatedListIncome);
    setRenderListCosts(formatedListCosts);
  }, [filterTable]);

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleApplyFilterIncome(valueFilter) {
    setFilterTable({ ...filterTable, income: valueFilter });
  }

  function handleApplyFilterCosts(valueFilter) {
    setFilterTable({ ...filterTable, costs: valueFilter });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {showModal && <Modal title={'Деталі запису'} datas={dataModal} onClose={handleCloseModal} />}
      {error ? (
        <div className={styles.error_message}>{error.message}</div>
      ) : (
        <>
          <Numeric
            title={'Кількість працівників'}
            value={workers.length}
            duration={800}
            startDelay={1000}
          />
          <Numeric
            title={'Прибуток за останній день'}
            value={income.lastDay}
            duration={800}
            startDelay={1000}
          />
          <Numeric
            title={'Витрати за останній день'}
            value={costs.lastDay}
            duration={800}
            startDelay={1000}
          />

          <NumericTotal
            title={pointsInome.markYear}
            value={income.lastYear}
            percent={pointsInome.percentYear}
            graphData={pointsInome.lastYear}
            startDelay={1000}
          />
          <NumericTotal
            title={pointsInome.markMonth}
            value={income.lastMonth}
            percent={pointsInome.percentMonth}
            graphData={pointsInome.lastMonth}
            startDelay={1000}
          />

          <NumericTotal
            title={pointsCosts.markYear}
            value={costs.lastYear}
            percent={pointsCosts.percentYear}
            graphData={pointsCosts.lastYear}
            startDelay={1000}
            invertColor
          />
          <NumericTotal
            title={pointsCosts.markMonth}
            value={costs.lastMonth}
            percent={pointsCosts.percentMonth}
            graphData={pointsCosts.lastMonth}
            startDelay={1000}
            invertColor
          />

          <NumericPercent
            title={'Маржинальність за останній рік'}
            value={marginality.lastYear}
            startDelay={1000}
          />
          <NumericPercent
            title={'Маржинальність за останній місяць'}
            value={marginality.lastMonth}
            startDelay={1000}
          />
          <NumericPercent
            title={'Маржинальність за останній день'}
            value={marginality.lastDay}
            startDelay={1000}
          />

          <NumericPercent
            title={'Рентабельність за останній рік'}
            value={profitability.lastYear}
            startDelay={1000}
          />
          <NumericPercent
            title={'Рентабельність за останній місяць'}
            value={profitability.lastMonth}
            startDelay={1000}
          />
          <NumericPercent
            title={'Рентабельність за останній день'}
            value={profitability.lastDay}
            startDelay={1000}
          />

          <Table
            title={'Прибутки'}
            titles={titlesIncome}
            contents={renderListIncome}
            onClick={handleClickRow}
            onApplyFilter={handleApplyFilterIncome}
          />
          <Table
            title={'Витрати'}
            titles={titlesCosts}
            contents={renderListCosts}
            onClick={handleClickRow}
            onApplyFilter={handleApplyFilterCosts}
          />
        </>
      )}
    </>
  );
}

export default GeneralModule;
