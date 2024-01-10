export interface RequestAuth {
  email: string;
  password: string;
}

export interface RequestToken {
    id: string
}

export interface ResponseAuth {
  token: string;
  refresh_token?: string;
}
