const { getStore } = require('@netlify/blobs');

exports.handler = async () => {
  try {
    const store = getStore('popup');
    const data = await store.get('config', { type: 'json' });
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data || { active: false, image: '' }),
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ active: false, image: '' }),
    };
  }
};
