
import parse from 'html-react-parser';
import { format } from 'date-fns';

const humanize = str => {
  var i, frags = str.split('_');
  for (i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}

const humanize1 = str => {
  var i, frags = str.split('-');
  for (i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}

const formatDate = rawDate => {
  return format(new Date(rawDate), 'dd MMM yyyy hh:mm:ss'); // dd-MMM-yyyy hh:mm:ss.s
}

const titlelize = str => {
  const arr = str.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
}

const formatGender = genderValue => {
  let gender = 'Not Known';

  if (genderValue === 0) gender = 'Female';
  if (genderValue === 1) gender = 'Male';
  if (genderValue === 2) gender = 'Cross Gender';

  return gender;
}

const parseHTML = htmlContent => {
  return parse(htmlContent);
}

export {
  humanize, humanize1, formatDate, titlelize, formatGender, parseHTML
}