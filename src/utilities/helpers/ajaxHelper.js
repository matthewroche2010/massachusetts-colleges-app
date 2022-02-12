import 'whatwg-fetch';

/**
 * Makes a fetch request to the supplied endpoint and returns the data.
 * @param {string} endpoint The URL to call.
 * @param {function} callback The callback function.
 */
class AjaxHelper {
  xhr = (endpoint, callback) => {
    fetch(endpoint)
        .then( (response) => {
          if (!response.ok) {
            response.text().then( (data) =>
              callback({
                error: true,
                status: response.status,
                statusText: response.statusText,
              }));
            return;
          }
          response.text()
              .then((text) =>
                  text ? callback(JSON.parse(text)) : callback({}));
        });
  };
}

export default new AjaxHelper();
