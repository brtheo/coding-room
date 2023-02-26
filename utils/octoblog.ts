import type { IContent, ICommit, ITree, IPost, IBlob} from "../types/Octoblog.d.ts";
import { Base64 } from "https://deno.land/x/bb64/mod.ts";
import { extract } from "https://deno.land/std@0.178.0/encoding/front_matter/any.ts";
import { TreeElement } from "../types/ITree.d.ts";

const ENV = Deno.env.toObject();

type GITBRANCH = "master" | "dev";


export const CONTENT = 
  "contents/" as const;

export const BLOB = 
  "git/blobs/" as const;

export const COMMIT = 
  `commits?sha=${ENV.GITBRANCH}&path=` as 
  `commits?sha=${GITBRANCH}&path=`;

export const TREE = 
`git/trees/${ENV.GITBRANCH}` as 
`git/trees/${GITBRANCH}`;

const ENDPOINTS = {CONTENT, COMMIT, TREE, BLOB} as const;
type Endpoint = typeof ENDPOINTS[keyof typeof ENDPOINTS];

type ResponseType<T extends Endpoint> = T extends keyof EndpointResponseMap
  ? EndpointResponseMap[T]
  : unknown;

type EndpointResponseMap = {
  "git/blobs/": IBlob;
  "contents/": IContent;
  "commits?sha=dev&path=": ICommit | ICommit[];
  "commits?sha=master&path=": ICommit | ICommit[];
  "git/trees/master": ITree;
  "git/trees/dev": ITree;
};

const headers = new Headers();
headers.append('Authorization', `token ${ENV.GITKEY}`);
headers.append('Accept','application/vnd.github+json');

type Param<T> = {
  endpoint: T;
  params?: {
    slug?:string,
    url?:string,
    ref?: string
  }
}


export default class Octoblog {

  private static basePath = 'https://api.github.com/repos';
  public static user: string;
  public static repo: string;

  private static makePost(blob: IBlob | IContent, commits: Array<ICommit>, slug: string): IPost{
    slug = slug.replace('.md','');
    const title = slug.replaceAll('-',' ');
    const makeDate = (index = -1) => new Date((commits.at(index)?.commit.author.date as Date)).getTime();
    const {attrs, body} = extract(Base64.fromBase64String(blob.content).toString());
    const author = commits.at(-1)?.committer.login;
    const author_pic = commits.at(-1)?.committer.avatar_url;
    return {
      slug,
      title,
      lastModifiedAt: makeDate(0),
      publishedAt: makeDate(-1),
      content: body,
      author,
      author_pic,
      tags: attrs.tags
    } as IPost;
  }

  private static makeUrl<T extends Endpoint>(endpoint: T, params?: Param<T>["params"]) {
    return [
      Octoblog.basePath, 
      Octoblog.user,
      Octoblog.repo,
      endpoint + (params ? (params.slug ? params.slug : params.url) : '') + (params ? (params.ref ? '?ref='+params.ref : '' ) : '')
    ].join('/');
  }

  private static async get<T extends Endpoint>(endpoint: T, params?: Param<T>["params"]): Promise<ResponseType<T>>{
    const data = await fetch(
      Octoblog.makeUrl<T>(endpoint,params),
      { headers, method: 'GET' }
    );
    return await data.json();
  }

  private static async getSeveral<T extends Endpoint>(param: Array<Param<T>>): Promise<Array<ResponseType<T>>>{
    return await Promise.all(param.map(req => Octoblog.get(req.endpoint, req.params)));
  }

  public static async getPostBySlug(slug: string): Promise<IPost> {
    slug = `${slug}.md`
    const [commitForPost, contentForPost] = await Octoblog.getSeveral([
      {
        endpoint: ENDPOINTS.COMMIT,
        params: {slug}
      },
      {
        endpoint: ENDPOINTS.CONTENT,
        params: {slug,ref:ENV.GITBRANCH}
      },
    ]);
    return Octoblog.makePost((contentForPost as IContent), (commitForPost as Array<ICommit>), slug);
  }

  public static async getPost(pathToShaTuple: string[]): Promise<IPost> {
    const [slug, url] = pathToShaTuple;
    const [commitForPost, contentForPost] = await Octoblog.getSeveral([
      {
        endpoint: ENDPOINTS.COMMIT,
        params: {slug}
      },
      {
        endpoint: ENDPOINTS.BLOB,
        params: {url}
      },
    ]);
    return Octoblog.makePost((contentForPost as IBlob), (commitForPost as Array<ICommit>), slug);
  }

  public static async getAllPosts(): Promise<IPost[]> {
    const treeElements: TreeElement[] = (await Octoblog.get(ENDPOINTS.TREE)).tree.filter(treeElement => treeElement.path.includes('.md'));
    const pathToShaTuples = treeElements.map(post => [post.path, post.sha]);
    return (await Promise.all(pathToShaTuples.map(tuple => Octoblog.getPost(tuple))))
      .sort((postA, postB) => postB.publishedAt - postA.publishedAt);
  }
}

Octoblog.user = 'brtheo';
Octoblog.repo = 'blog';