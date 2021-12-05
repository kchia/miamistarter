import { client } from "../../api/client";
import { formatNumber } from "../../common/utils";

const API_URL = "/api/funds";

async function read(signal) {
  try {
    const { total, totalVotes, deadline } = await client.get(API_URL, {
      signal,
    });
    return {
      deadline,
      total: formatNumber(total),
      totalVotes: formatNumber(totalVotes),
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export { read };
