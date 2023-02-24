export interface ITree {
  sha:       string;
  url:       string;
  tree:      TreeElement[];
  truncated: boolean;
}

export interface TreeElement {
  path: string;
  mode: string;
  type: string;
  sha:  string;
  size: number;
  url:  string;
}
