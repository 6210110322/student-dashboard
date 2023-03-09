import format from "date-fns/format";
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

export const linkFormat = (str) => {
  const link = str.substring(8, 12);
  if(!link)
    return '';
  else if(link === 'lms2')
    return <a href={str}>LMS</a>;
  else if(link === 'team')
    return <a href={str}>Microsoft Team</a>;
  else if(link === 'psu-')
    return <a href={str}>Zoom</a>;
  else
    return <a href={str}>Link</a>;
};

export const subjectFormat = (str1, str2) => {
  if(!str1)
    return <a style={{ textDecoration: "none", color: "#212529"}}>{str2}</a>;
  else
    return <a href={str1} style={{ color: "#212529"}}>{str2}</a>;
};

export const dayFormat = (str) => {
  const day = str.substring(0, 1);
  if(day === '1')
    return 'Monday';
  else if(day === '2')
    return 'Tuesday';
  else if(day === '3')
    return 'Wednesday';
  else if(day === '4')
    return 'Thursday';
  else if(day === '5')
    return 'Friday';
};
  
export const dateFormat = (str) => {
  str = format(new Date(str), 'd MMM yyyy')
    return str;
};

export const distanceFromNow = (str) => {
  str = formatDistanceToNowStrict(new Date(str), {unit: 'day'})
    return str;
};

export const worksleft = (str) => {
  if(!str)
    return 'All Done!';
  else if(str === 1)
    return str + ' Work Left!';
  else
    return str + ' Works Left!';
};

export const statusWorksleft = (str) => {
  if(!str)
    return '#24b514';
  else
    return '#c43421';
};

export const opcaityTodo = (str) => {
  if(str === 'To-Do')
    return '100%';
  else if(str === 'Done')
    return '40%';
};

export const statusTodo = (str) => {
  if(str === 'To-Do')
    return '#f5bc04';
  else if(str === 'Done')
    return '#24b514';
};