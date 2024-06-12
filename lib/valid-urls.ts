import { EApiError } from "./error";

export const isValidGithubUrl = ({ githubUrl }: { githubUrl: string }) => {
  return githubUrl.startsWith("https://github.com/");
};

export const isValidLinkedinUrl = ({
  linkedinUrl,
}: {
  linkedinUrl: string;
}) => {
  return linkedinUrl.startsWith("https://linkedin.com/in/");
};

export const isValidTwitterUrl = ({ twitterUrl }: { twitterUrl: string }) => {
  if (twitterUrl.startsWith("https://twitter.com/")) {
    return true;
  } else if (twitterUrl.startsWith("https://x.com/")) {
    return true;
  } else {
    return false;
  }
};

export const transformTwitterToXUrl = ({
  twitterUrl,
}: {
  twitterUrl: string;
}) => {
  return `https://x.com/${twitterUrl.split(".com/")[1]}`;
};

export const validateUrls = ({
  linkedinUrl,
  githubUrl,
  twitterUrl,
}: {
  twitterUrl: string | undefined;
  linkedinUrl: string | undefined;
  githubUrl: string;
}) => {
  if (githubUrl) {
    if (!isValidGithubUrl({ githubUrl })) {
      throw new EApiError({
        message: `Please provide a valid github url`,
        helpText: "bad_request",
        status: 400,
      });
    }
  }

  if (linkedinUrl) {
    if (!isValidLinkedinUrl({ linkedinUrl })) {
      throw new EApiError({
        message: `Please provide a valid linkedin url`,
        helpText: "bad_request",
        status: 400,
      });
    }
  }
  if (twitterUrl) {
    if (!isValidTwitterUrl({ twitterUrl: twitterUrl })) {
      throw new EApiError({
        message: `Incorrect twitter url ${twitterUrl}`,
        helpText: "bad_request",
        status: 400,
      });
    }
    twitterUrl = transformTwitterToXUrl({
      twitterUrl: twitterUrl,
    });
  }

  return { linkedinUrl, githubUrl, twitterUrl };
};
