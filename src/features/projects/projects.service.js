import { client } from "../../api/client";
import { formatNumber } from "../../common/utils";

const API_URL = "/api/projects";

async function list({ signal, limit }) {
  try {
    const projects = await client.get(
      limit ? `${API_URL}/?_limit=${limit}` : API_URL,
      { signal }
    );

    return projects.map(
      ({
        images: [imageUrl],
        logo,
        title,
        tagline,
        description,
        slug,
        fundingRaised,
        fundingGoal,
        labels,
      }) => ({
        imageUrl,
        logo,
        title,
        tagline,
        description,
        slug,
        fundingRaised: formatNumber(fundingRaised),
        fundingGoal: formatNumber(fundingGoal),
        fundingPercentage: Math.floor((fundingRaised / fundingGoal) * 100),
        labels,
      })
    );
  } catch (error) {
    return Promise.reject(error);
  }
}

async function read({ id, signal }) {
  try {
    const {
      availableSupply,
      icon: imageUrl,
      id: originalAssetId,
      marketCap,
      name,
      price,
      priceChange1d,
      rank,
      symbol,
      totalSupply,
      twitterUrl,
      websiteUrl,
    } = await client.get(`${API_URL}/${id}`, { signal });

    return {
      availableSupply: formatNumber(availableSupply),
      originalAssetId,
      imageUrl,
      marketCap: formatNumber(marketCap),
      name,
      price: formatNumber(price),
      priceChange1d,
      rank,
      symbol,
      type: "project",
      totalSupply: formatNumber(totalSupply),
      twitterUrl,
      websiteUrl,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export { list, read };
