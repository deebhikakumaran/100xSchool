
// Problem Description – Recursive Fetch with Redirect Handling

// You are required to fetch data for a given set of IDs. 
// Each response may contain a redirectId, indicating that the data should be fetched again using the new ID. 
// The process must continue until the final data is reached. 
// Your implementation should also detect and prevent infinite redirect loops.

async function fetchDeep(ids, fetcher, maxDepth = 5) {
    async function resolveId(id) {
    let currentId = id;
    let depth = 0;
    const visited = new Set();

    while (true) {
      if (visited.has(currentId)) {
        throw new Error(`redirect loop detected.`);
      }

      if (depth >= maxDepth) {
        throw new Error(`max depth exceeded.`);
      }

      visited.add(currentId);

      const data = await fetcher(currentId);
      if (!data.redirectId) {
        return data;
      }

      currentId = data.redirectId;
      depth++;
    }
  }

  return Promise.all(ids.map(resolveId));
}

module.exports = fetchDeep;
