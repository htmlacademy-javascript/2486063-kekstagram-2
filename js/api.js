const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method,
      body
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || errorText);
    }

    return data;
  } catch (err) {
    throw new Error(err.message || errorText);
  }
};

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(
  Route.SEND_DATA,
  ErrorText.SEND_DATA,
  Method.POST,
  body
);

export {getData, sendData};
