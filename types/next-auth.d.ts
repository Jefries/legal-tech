declare module "next-auth" {
  interface User {
    username?: string
  }
  interface Session {
    user?: User
  }
}
