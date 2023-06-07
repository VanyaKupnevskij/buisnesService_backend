const tamplateDataModal = {
  id: { name: 'id', title: 'id', value: null, type: 'text', type_display: 'none' },
  name: {
    name: 'name',
    title: 'Назва',
    value: 'Не задано',
    type: 'text',
    type_display: 'all',
  },
  category: {
    name: 'category',
    title: 'Категорія',
    value: 'Не задано',
    type: 'select',
    type_display: 'all',
    options: [
      { key: 'Сео', value: 'Сео' },
      { key: 'Таргетинг', value: 'Таргетинг' },
      { key: 'Менеджмент', value: 'Менеджмент' },
      { key: 'Продажі', value: 'Продажі' },
      { key: 'ІТ послуги', value: 'ІТ послуги' },
      { key: 'Стартап', value: 'Стартап' },
      { key: 'Інше', value: 'Інше' },
      { key: null, value: 'Не задано' },
    ],
  },
};

export const titles = ['Назва', 'Категорія'];

export default tamplateDataModal;
