import isomorphicFetch from "isomorphic-fetch";

export async function postSlackMessage({ title, text }) {
  console.log(process.env.SLACK_HOOK_URL);
  return isomorphicFetch(process.env.SLACK_HOOK_URL, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${title}*`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: text,
          },
        },
      ],
    }),
  });
}
