import i18n from 'i18next';

let DAY_OF_WEEK = updateDayOfWeeKLanguage();

i18n.on('languageChanged', () => {
  DAY_OF_WEEK = updateDayOfWeeKLanguage();
})

function updateDayOfWeeKLanguage() {
  return [
    {code: 'SUNDAY', value: i18n.t('station.sunday')},
    {code: 'MONDAY', value: i18n.t('station.monday')},
    {code: 'TUESDAY', value: i18n.t('station.tuesday')},
    {code: 'WEDNESDAY', value: i18n.t('station.wednesday')},
    {code: 'THURSDAY', value: i18n.t('station.thursday')},
    {code: 'FRIDAY', value: i18n.t('station.friday')},
    {code: 'SATURDAY', value: i18n.t('station.saturday')},
    {code: null, value: i18n.t('station.no_reboot')},
  ]
}

export { DAY_OF_WEEK };

export const TIME_ARRAY = ['0~1', '1~2', '2~3', '3~4', '4~5', '5~6', '6~7', '7~8', '8~9', '9~10', 
  '10~11', '11~12', '12~13', '13~14', '14~15', '15~16', '16~17', '17~18', 
  '18~19', '19~20', '20~21', '21~22', '22~23', '23~24'];

export const OS_DAY_OF_WEEK = [
  "sunday", "monday", "tuesday", "wednesday", 
  "thursday", "friday", "saturday", 'no_reboot'
];

export const HOURS = Array(24).fill(null).map((v: null, i: number) => ({code: i, value: i<10? `0${i}`: String(i)}));

export const MINUTES_2_TIME = [{code: 0, value: '00'}, {code: 30, value: '30'}];

export const MINUTES = Array(60).fill(null).map((v: null, i: number) => ({code: i, value: i<10? `0${i}`: String(i)}));

export const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];
export const SHORT_MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec"
];
export const MONTHS_LIST = [
  {name: 'january', shortName: 'jan', value: '01'},
  {name: 'february', shortName: 'feb', value: '02'},
  {name: 'march', shortName: 'mar', value: '03'},
  {name: 'april', shortName: 'apr', value: '04'},
  {name: 'may', shortName: 'may', value: '05'},
  {name: 'june', shortName: 'jun', value: '06'},
  {name: 'july', shortName: 'jul', value: '07'},
  {name: 'august', shortName: 'aug', value: '08'},
  {name: 'september', shortName: 'sep', value: '09'},
  {name: 'october', shortName: 'oct', value: '10'},
  {name: 'november', shortName: 'nov', value: '11'},
  {name: 'december', shortName: 'dec', value: '12'},
];