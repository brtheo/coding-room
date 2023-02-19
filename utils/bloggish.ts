import { Base64 } from "https://deno.land/x/bb64/mod.ts";

const CONTENTS = "https://api.github.com/repos/brtheo/blog/contents/" as const;
const COMMIT = 'https://api.github.com/repos/brtheo/blog/commits?path=' as const;

const headers = new Headers();
headers.append('Authorization',Deno.env.get('GITKEY') as string);
headers.append('Accept','application/vnd.github+json');

console.log(Deno.env.get('GITKEY'))
export interface IPost {
  slug: string;
  title: string;
  publishedAt: string;
  snippet: string;
  content: string;
} 


function kebabRemover(slug: string): string {
  return slug.replaceAll('-',' ')
}

function getDate(o: any, idx = -1) {
  return new Date(o.at(idx)['commit']['author']['date']).toDateString()
}

// Get posts.
// export async function getPosts(): Promise<Post[]> {
//   const files = fetch(DIRECTORY);
//   const promises = [];
//   for await (const file of files) {
//     const slug = file.name.replace(".md", "");
//     promises.push(getPost(slug));
//   }
//   const posts = await Promise.all(promises) as Post[];
//   posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
//   return posts;
// }

// Get post.
export async function getPost(slug: string): Promise<IPost> {
  const [rawContent, rawCommit] = await Promise.all([
    fetch(`${CONTENTS}/${slug}.md`),
    fetch(`${COMMIT}/${slug}.md`, { headers })
  ])
  const [jsonContent, jsonCommit] = await Promise.all([
    rawContent.json(),
    rawCommit.json()
  ]);
  // const date = 1676828113594
  const publishedAt = getDate(jsonCommit);
  const content = Base64.fromBase64String(jsonContent.content).toString();
  return {
    slug,
    title: kebabRemover(slug),
    publishedAt,
    content,
    snippet: 'snippet',
  };
}