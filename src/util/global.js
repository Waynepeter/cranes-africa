
import parse from 'html-react-parser';
import { format } from 'date-fns';
import CFG from '../config.json';

const setServerBaseURL = () => {
  let baseURL;

  if (CFG.environment === "development") {
    baseURL = `${CFG.development.scheme}://${CFG.development.host}:${CFG.development.port}`;
  }

  if (CFG.environment === "production") {
    baseURL = `${CFG.production.scheme}://${CFG.production.host}`;
  }

  window.baseURL = baseURL;
}

const isEmpty = string => {
  if (!string === null || string === "") return true;
  return false;
}

const roundOff = (num, dp) => {
  return +(Math.round(num + `e+${dp}`) + `e-${dp}`);
}

const parseHTML = htmlContent => {
  return parse(htmlContent);
}

const formatCurrency = floatNumber => {
  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    /* these options are needed to round to whole numbers */
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return nf.format(floatNumber); /* $2,500.00 */
}

const capitalize = str => {
  const arr = str.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
}

const formatDate = rawDate => {
  return format(new Date(rawDate), 'dd MMM yyyy hh:mm:ss'); // dd-MMM-yyyy hh:mm:ss.s
}

export {
  setServerBaseURL, isEmpty, roundOff, parseHTML, formatCurrency, capitalize,
  formatDate
};