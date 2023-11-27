import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import { ID, Query } from "appwrite";
import type { IItemsRepository } from "../Interface/I.Items.Repository";
import type {
  CreateItemRequest,
  ItemRequest,
} from "$lib/Models/Requests/CreateItem.Request";
import { CategoriesRepository } from "./Categories.Repository";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";

const categoriesRepository = new CategoriesRepository();

export class ItemsRepository implements IItemsRepository {
  async getItems(options?:GenericListOptions): Promise<AppwriteResponse<Item>> {
    let { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_item,
      [
        Query.orderDesc(options!.sortField ?? "$createdAt"),
        Query.limit(options!.limit ?? 8),
        Query.offset((options!.page - 1 ?? 0) * (options!.limit ?? 8)),
      ],
    )) as AppwriteResponse<Item>;

    return { documents, total };
  }
  async getItem(id: string): Promise<Item> {
    return (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_item,
      id
    )) as Item;
  }
  async createItem(item: CreateItemRequest): Promise<void> {
    try {
      const category = await categoriesRepository.getCategory(item.categoryId);

      const itemRequest: ItemRequest = {
        userId: item.userId,
        name: item.name,
        price: item.price,
        itemImage: item.image.url as string,
        productionDate: item.productionDate,
        expiredDate: item.expiredDate,
        quantity: item.quantity,
        detail: item.detail!,
        category: category,
      };

      await Appwrite.databases.createDocument(
        Environment.appwrite_database,
        Environment.appwrite_collection_item,
        ID.unique(),
        itemRequest
      );
    } catch (error: any) {
      console.log(error);
    }
  }
  updateItem(item: Item): Promise<Item> {
    throw new Error("Method not implemented.");
  }
}
