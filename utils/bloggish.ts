const DIRECTORY = "https://raw.githubusercontent.com/brtheo/blog/master";
const COMMIT = 'https://api.github.com/repos/brtheo/blog/commits?path='

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
export async function getPost(slug: string): Promise<IPost | null> {
  // const 
  //   res = await fetch(`${DIRECTORY}/${slug}.md`),
  //   res2 = await fetch(`${COMMIT}/${slug}.md`)
  
  // const
  //   content = await res.text(),
  //   json = await res2.json()
  // ;
  // console.log(json)
  const [res, res2] = await Promise.all([
    fetch(`${DIRECTORY}/${slug}.md`),
    fetch(`${COMMIT}/${slug}.md`)
  ])
  const [content, json] = await Promise.all([
    res.text(),
    res2.json()
  ]);
  const date = 1676828113594
  // const date = json.at(-1)['commit']['author']['date']
  return {
    slug,
    title: kebabRemover(slug),
    publishedAt: new Date(date).toDateString(),
    content: content,
    snippet: 'snippet',
  };
}