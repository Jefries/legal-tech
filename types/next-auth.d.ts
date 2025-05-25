declare module "next-auth" {
  interface User {
    id: string
    role?: string
    name?: string
    email?: string
  }
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role?: string
    }
  }
}
