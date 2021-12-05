const {
  company: { bs, companyName, catchPhrase },
  commerce: { productName, productDescription },
  date: { soon },
  finance: { bitcoinAddress },
  name: { firstName, lastName, jobTitle },
  image: {
    food,
    animals,
    business,
    city,
    nightlife,
    technics,
    transport,
    cats,
  },
  internet: { url },
  lorem: { paragraph, paragraphs },
} = require("faker");
const fs = require("fs");

const TOTAL_FUNDS_IN_MIA = 1000000;

function generateFundingGoal(maximum = 100000) {
  return Math.ceil(Math.random() * maximum);
}

function generateLabels(maximum = 5) {
  const labels = [];

  const founderTypes = [
    "latinx founders",
    "asian founders",
    "black founders",
    "veteran founders",
    "minority founders",
    "female founders",
  ];

  if (Math.random() > 0.5) {
    labels.push(founderTypes[Math.floor(Math.random() * founderTypes.length)]);
  }

  const industries = [
    "education",
    "healthcare",
    "crypto",
    "finance",
    "logistics",
    "travel & hospitality",
    "advertising",
    "work & productivity",
    "media & entertainment",
    "eco-friendly",
    "food & beverage",
    "communication",
    "real estate",
    "services",
    "consumer goods",
  ];

  labels.push(industries[Math.floor(Math.random() * industries.length)]);

  if (Math.random() > 0.5) {
    labels.push(industries[Math.floor(Math.random() * industries.length)]);
  }

  return labels;
}

function generatePerks(maximum = 3) {
  const perks = [];
  const images = [
    food,
    animals,
    business,
    city,
    nightlife,
    technics,
    transport,
    cats,
  ];
  const count = Math.ceil(Math.random() * maximum);

  for (let i = 0; i < count; i++) {
    perks.push({
      imageUrl: images[Math.floor(Math.random() * images.length)](),
      name: productName(),
      description: productDescription(),
      total: count,
      claimed: Math.ceil(Math.random() * count),
    });
  }

  return perks;
}

function generateParagraphs() {
  return paragraphs().split("\n \r");
}

function generateTeam(maximum = 5) {
  const team = [];
  const avatars = [
    "http://placeimg.com/640/480/people",
    "http://placeimg.com/640/480/person",
    "http://placeimg.com/640/480/man",
    "http://placeimg.com/640/480/woman",
    "http://placeimg.com/640/480/human",
  ];
  const count = Math.ceil(Math.random() * maximum);

  for (let i = 0; i < count; i++) {
    team.push({
      imageUrl: avatars[Math.floor(Math.random() * count)],
      firstName: firstName(),
      lastName: lastName(),
      title: jobTitle(),
    });
  }

  return team;
}

function generateCollection(item, maximum) {
  const collection = [];
  const count = Math.ceil(Math.random() * maximum);
  for (let i = 0; i < count; i++) {
    collection.push(item());
  }
  return collection;
}

function generateData(count = 25) {
  const projects = [];

  for (let id = 1; id < count; id++) {
    const title = companyName();
    const slug = title.replace(/,/g, "").split(" ").join("-").toLowerCase();
    projects.push({
      id,
      logo: "https://source.unsplash.com/200x200/?icon",
      images: [
        "https://source.unsplash.com/800x600/?miami",
        "https://source.unsplash.com/800x600/?startup",
        "https://source.unsplash.com/800x600/?technology",
        "https://source.unsplash.com/800x600/?programming",
        "https://source.unsplash.com/800x600/?crypto",
        "https://source.unsplash.com/800x600/?transportation",
        "https://source.unsplash.com/800x600/?iphone",
        "https://source.unsplash.com/800x600/?computer",
        "https://source.unsplash.com/800x600/?bicycle",
        "https://source.unsplash.com/800x600/?vacuum",
        "https://source.unsplash.com/800x600/?car",
        "https://source.unsplash.com/800x600/?camera",
        "https://source.unsplash.com/800x600/?drone",
        "https://source.unsplash.com/800x600/?ethereum",
        "https://source.unsplash.com/800x600/?gaming",
        "https://source.unsplash.com/800x600/?kitchen",
        "https://source.unsplash.com/800x600/?scooter",
        "https://source.unsplash.com/800x600/?innovation",
        "https://source.unsplash.com/800x600/?sunglasses",
        "https://source.unsplash.com/800x600/?headset",
        "https://source.unsplash.com/800x600/?3d",
      ],
      title,
      tagline: `${catchPhrase()} and ${bs()}`,
      description: paragraph(),
      slug,
      fundingGoal: generateFundingGoal(),
      votes: generateCollection(bitcoinAddress, 1000),
      perks: generatePerks(),
      labels: generateLabels(),
      solutionDescription: generateParagraphs(),
      problemDescription: generateParagraphs(),
      businessModelDescription: generateParagraphs(),
      businessModelCharts: [
        "https://source.unsplash.com/800x600/?charts",
        "https://source.unsplash.com/800x600/?analysis",
        "https://source.unsplash.com/800x600/?computation",
      ],
      marketDescription: generateParagraphs(),
      marketReports: generateCollection(url, 5),
      team: generateTeam(),
      websiteUrl: url(),
      twitterUrl: url(),
      whitepapers: generateCollection(url, 6),
    });
  }

  const funds = projects.reduce(
    (result, { votes }) => {
      return {
        ...result,
        totalVotes: result.totalVotes + votes.length,
      };
    },
    {
      deadline: soon(30),
      total: TOTAL_FUNDS_IN_MIA,
      totalVotes: 0,
    }
  );

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    project.fundingRaised = Math.floor(
      (project.votes.length / funds.totalVotes) * funds.total
    );
  }

  return {
    funds,
    projects,
  };
}

fs.writeFileSync("db.json", JSON.stringify(generateData(), null, "\t"));
