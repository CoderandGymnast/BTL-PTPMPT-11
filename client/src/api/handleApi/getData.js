const fetchData = async (apiFunction, callback, params = {}) => {
  try {
    const response = await apiFunction(params);
    callback(response);
  } catch (error) {
    console.log('faled fetch : ', error);
    callback(error);
  }
};

export default fetchData;
