import type { IContent, ICommit, ITree, IPost } from "../types/Octoblog.d.ts";
import { Base64 } from "https://deno.land/x/bb64/mod.ts";
export const CONTENT = "https://api.github.com/repos/brtheo/blog/contents/" as const;
export const COMMIT = "https://api.github.com/repos/brtheo/blog/commits?path=" as const;
export const TREE = `https://api.github.com/repos/brtheo/blog/git/trees/${Deno.env.get('GITBRANCH')}`  as const;
const ENDPOINTS = {CONTENT, COMMIT, TREE} as const;
type Endpoint = typeof ENDPOINTS[keyof typeof ENDPOINTS];

type ResponseType<T extends Endpoint> = T extends keyof EndpointResponseMap
  ? EndpointResponseMap[T]
  : unknown;

type EndpointResponseMap = {
  "https://api.github.com/repos/brtheo/blog/contents/": IContent;
  "https://api.github.com/repos/brtheo/blog/commits?path=": ICommit | ICommit[];
  "https://api.github.com/repos/brtheo/blog/git/trees/master": ITree;
};

const headers = new Headers();
headers.append('Authorization', `token ${(Deno.env.get('GITKEY') as string)}`);
headers.append('Accept','application/vnd.github+json');

export const makePost = (rawcontent: IContent, commits: Array<ICommit>, slug: string): IPost => {
  const title = slug.replaceAll('-',' ').replace('.md','');
  const makeDate = (index = -1) => new Date((commits.at(index)?.commit.author.date as Date)).getTime()
  const content = Base64.fromBase64String(rawcontent.content).toString();
  const author = commits.at(-1)?.commit.author.name
  return {
    slug,
    title,
    lastModifiedAt: makeDate(0),
    publishedAt: makeDate(-1),
    content,
    author,
    tags: ['']
  } as IPost
}

type getSeveralParam<T> = {
  endpoint: T;
  params?: {slug:string}
}

export default class Octoblog{

  static async get<T extends Endpoint>(endpoint: T, params?: {slug:string}): Promise<ResponseType<T>>{
    const data = await fetch(
      endpoint + (params ? params.slug : ''),
      { headers, method: 'GET' }
    );
    return await data.json()
  }
  static async getSeveral<T extends Endpoint>(param: Array<getSeveralParam<T>>): Promise<Array<ResponseType<T>>>{
    return await Promise.all(param.map(req => Octoblog.get(req.endpoint, req.params)));
  }

  static async getPost(slug: string): Promise<IPost> {
    const [commitForPost, contentForPost] = await Octoblog.getSeveral([
      {
        endpoint: ENDPOINTS.COMMIT,
        params: {slug}
      },
      {
        endpoint: ENDPOINTS.CONTENT,
        params: {slug}
      },
    ]);
    return makePost((contentForPost as IContent), (commitForPost as Array<ICommit>), slug);
  }
  static async getAllPosts(): Promise<IPost[]> {
    const treeElements = (await Octoblog.get(ENDPOINTS.TREE)).tree
    const slugs = treeElements.map(post => post.path)
    return (await Promise.all(slugs.map(slug => Octoblog.getPost(slug))))
      .sort((postA, postB) => postB.publishedAt - postA.publishedAt);
  }
}

