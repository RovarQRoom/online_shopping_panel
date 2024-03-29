import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Auth } from "$lib/Models/Entities/Auth.Entity.Model";
import type { CreateAuthRequest } from "$lib/Models/Requests/CreateAuth.Request.Model";

export interface IAuthRepository {
  getAuth(): Promise<Auth | null>;

  signIn(phone: string): Promise<string>;

  signInWithEmailAndPassword(email:string, password:string): Promise<void>;

  signOut(): Promise<void>;

  secret(userId: string, secret: string): Promise<Auth>;

  update(auth: CreateAuthRequest): Promise<void>;

  listUsers(options: GenericListOptions): Promise<AppwriteResponse<Auth>>;

  getUser(userId: string): Promise<Auth>;
}
