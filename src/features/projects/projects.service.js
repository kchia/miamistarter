import { client } from "../../api/client";
import { formatNumber } from "../../common/utils";

const API_URL = "/api/projects";

async function list({ limit, signal }) {
  try {
    const projects = await client.get(
      limit ? `${API_URL}/?_limit=${limit}` : API_URL,
      { signal }
    );

    return projects.map(
      ({
        id,
        images,
        logo,
        title,
        tagline,
        description,
        slug,
        fundingRaised,
        fundingGoal,
        labels,
      }) => {
        const imageUrl = images[Math.floor(Math.random() * images.length)];
        return {
          id,
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
        };
      }
    );
  } catch (error) {
    return Promise.reject(error);
  }
}

async function read({ id, signal }) {
  try {
    const {
      logo,
      images,
      title,
      tagline,
      description,
      slug,
      fundingGoal,
      fundingRaised,
      votes,
      perks,
      solutionDescription,
      problemDescription,
      businessModelDescription,
      businessModelCharts,
      marketDescription,
      marketReports,
      team,
      websiteUrl,
      twitterUrl,
      whitepapers,
    } = await client.get(`${API_URL}/${id}`, { signal });

    return {
      logo,
      images,
      title,
      tagline,
      description,
      slug,
      fundingGoal: formatNumber(fundingGoal),
      fundingRaised: formatNumber(fundingRaised),
      fundingPercentage: Math.floor((fundingRaised / fundingGoal) * 100),
      votes,
      voteCount: formatNumber(votes.length),
      perks,
      solutionDescription,
      problemDescription,
      businessModelDescription,
      businessModelCharts,
      marketDescription,
      marketReports,
      team,
      websiteUrl,
      twitterUrl,
      whitepapers,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export { list, read };
