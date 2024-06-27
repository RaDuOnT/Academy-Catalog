import range from "lodash/range";
import api from "./index";
import isEmpty from "lodash/isEmpty";

/**
 * Api service builder that handles a specific resource specified by an endpoint
 *
 * @param apiEndpoint
 * @param paginated
 * @returns {{fetchAll: (function(*=, *=): Promise<unknown>), fetch: (function(*): Promise<unknown>), fetchByCustomField: (function(*): Promise<unknown>), update: (function(*, *=): Promise<unknown>), create: (function(*=): Promise<unknown>), fetchById: (function(*=): Promise<unknown>), remove: (function(*): Promise<unknown>)}}
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (apiEndpoint, paginated = false) => {
  /**
   * Fetches the resources paginated or not
   *
   * @param paginated
   * @param params
   * @returns {Promise<unknown>}
   */
  const fetchResources = (paginated, params = {}) => {
    return new Promise((resolve, reject) => {
      api({
        method: "GET",
        url: apiEndpoint,
        params,
      })
        .then(({ data }) => {
          const items = paginated
            ? !isEmpty(data) && !isEmpty(data.data)
              ? data.data.reverse()
              : []
            : data.reverse();

          resolve({
            items,
            lastPage: paginated ? data.last_page : null,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Fetches all resources, either paginated, or paginated and greedy
   *
   * @param paginated
   * @param params
   * @param greedy
   * @returns {Promise<unknown>}
   */
  const fetchAllResources = (paginated = true, params = {}, greedy = false) => {
    return new Promise((resolve, reject) => {
      fetchResources(paginated, params)
        .then(({ items, lastPage }) => {
          if (paginated && greedy && lastPage) {
            const currentPage = params.page ? params.page : 1;

            if (currentPage === lastPage) {
              resolve(items);
            } else {
              const pagesLoadPromises = range(
                currentPage + 1,
                lastPage + 1
              ).map((pageNumber) =>
                fetchResources(paginated, { ...params, page: pageNumber })
              );

              Promise.all(pagesLoadPromises).then((pagesResults) => {
                resolve(
                  pagesResults.reduce((resultItems, { items }) => {
                    return [...resultItems, ...items];
                  }, items)
                );
              });
            }
          } else {
            resolve(items);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Fetches all resources for this service based on configuration for pagination and greedy loading
   *
   * @param page
   * @param limit
   * @returns {Promise<unknown>}
   */
  const fetchAll = (page = 1, limit = 10) => {
    const params = paginated ? { page, limit } : undefined;

    return fetchAllResources(paginated, params);
  };

  /**
   * Fetches the resource(s) for the specific endpoint related URI
   *
   * @param uri
   * @returns {Promise<unknown>}
   */
  const fetch = (uri) => {
    return new Promise((resolve, reject) => {
      api({
        method: "GET",
        url: `${apiEndpoint}/${uri}`,
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const fetchByCustomField = (field, id) => {
    return new Promise((resolve, reject) => {
      api({
        method: "GET",
        url: `${apiEndpoint}/?${field}=${id}`,
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Fetches a resource by id
   *
   * @param id
   * @returns {Promise<unknown>}
   */
  const fetchById = (id) => {
    return fetch(id);
  };

  /**
   * Creates a new resource
   *
   * @param payload
   * @returns {Promise<unknown>}
   */
  const create = (payload) => {
    return new Promise((resolve, reject) => {
      api({
        method: "POST",
        url: `${apiEndpoint}`,
        data: payload,
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Updates an existing resource
   *
   * @param id
   * @param payload
   * @returns {Promise<unknown>}
   */
  const update = (id, payload) => {
    return new Promise((resolve, reject) => {
      api({
        method: "PUT",
        url: `${apiEndpoint}/${id}`,
        data: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Updates an existing resource with patch
   *
   * @param id
   * @param payload
   * @returns {Promise<unknown>}
   */
  const updateWithPatch = (id, payload) => {
    return new Promise((resolve, reject) => {
      api({
        method: "PATCH",
        url: `${apiEndpoint}/${id}`,
        data: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Deletes/removes an existing resource
   *
   * @param id
   * @returns {Promise<unknown>}
   */
  const remove = (id) => {
    return new Promise((resolve, reject) => {
      api({
        method: "DELETE",
        url: `${apiEndpoint}/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Find resources
   *
   * @param params
   * @returns {Promise<unknown>}
   */
  const find = (params) => {
    return new Promise((resolve, reject) => {
      api({
        method: "GET",
        url: `${apiEndpoint}?${params}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    fetch,
    fetchAll,
    fetchById,
    fetchByCustomField,
    update,
    create,
    remove,
    find,
    updateWithPatch,
  };
};
