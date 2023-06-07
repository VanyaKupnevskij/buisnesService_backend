const tamplateDataModal = {
  id: { name: 'id', title: 'id', value: null, type: 'text', type_display: 'none' },
  full_name: {
    name: 'full_name',
    title: "Ім'я",
    value: 'Не задано',
    type: 'text',
    type_display: 'all',
  },
  money_account: {
    name: 'money_account',
    title: 'Рахунок',
    value: 'Не задано',
    type: 'select',
    type_display: 'all',
    options: [
      { key: 'ФОП', value: 'ФОП' },
      { key: 'Monobank', value: 'Monobank' },
      { key: 'Privatebank', value: 'Privatebank' },
      { key: 'Готівка', value: 'Готівка' },
      { key: 'Інше', value: 'Інше' },
      { key: null, value: 'Не задано' },
    ],
  },
  realm: {
    name: 'realm',
    title: 'Спеціалізація',
    value: 'Не задано',
    type: 'select',
    type_display: 'all',
    options: [
      { key: 'Сео', value: 'Сео' },
      { key: 'Таргетолог', value: 'Таргетолог' },
      { key: 'Менеджер', value: 'Менеджер' },
      { key: 'Діректор', value: 'Діректор' },
      { key: 'Дизайнер', value: 'Дизайнер' },
      { key: 'Программіст', value: 'Программіст' },
      { key: 'Інше', value: 'Інше' },
      { key: null, value: 'Не задано' },
    ],
  },
  salary: {
    name: 'salary',
    title: 'Зарплатня працівника',
    value: 0,
    type: 'number',
    type_display: 'all',
  },
};

export const titles = ["Повне ім'я", 'Рахунок', 'Спеціалізація', 'Зарплатня'];

export default tamplateDataModal;
