import { Appwrite } from "$lib/Appwrite/Appwrite";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Auth } from "$lib/Models/Entities/Auth.Entity.Model";
import type { IAuthRepository } from "$lib/Repositories/Interface/I.Auth.Repository";
import { ID } from "appwrite";

export class AuthRepository implements IAuthRepository {
  async getAuth(): Promise<Auth | null> {
    try {
      return await Appwrite.account.get() as Auth;
    } catch (error: any) {
      if (error && error.code === 401) {
        // Return null if unauthorized
        return null;
      }
      throw error;
    }
  }
  async signIn(phone: string): Promise<string> {
    const result = await Appwrite.account.createPhoneSession(
      ID.unique(),
      phone
      );
      return result.userId;
    }
    async signOut(): Promise<void> {
      await Appwrite.account.deleteSession("current");
    }
    async secret(userId: string, secret: string): Promise<Auth> {
      await Appwrite.account.updatePhoneSession(userId, secret);
      return (await Appwrite.account.get()) as Auth;
    }
    async listUsers(options:GenericListOptions): Promise<any> {
      const result = await Appwrite.functions.createExecution(
        "65646f325c51e338c6b8",
        JSON.stringify(options),
        true,
        '/',
        'GET'
      );
      console.log(result);
      
    }
}
