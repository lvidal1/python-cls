
import config from '../config'

export const staticPath = (path: string) => `${config.staticPath}${path}`

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);

  return formattedDate.replace(',', ' -');
};

export default {}
