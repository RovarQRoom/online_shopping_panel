import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { Order } from "$lib/Models/Entities/Order.Entities.Model";
import type {
  CreateOrderRequest,
  OrderRequest,
} from "$lib/Models/Requests/CreateOrder.Request";
import type { IOrdersRepository } from "$lib/Repositories/Interface/I.Orders.Repository";
import { ID, Query } from "appwrite";
import { ItemsRepository } from "./Items.Repository";

const itemsRepository = new ItemsRepository();

export class OrdersRepository implements IOrdersRepository {
  async getOrders(): Promise<AppwriteResponse<Order>> {
    const { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_order,
      [Query.limit(8), Query.offset(0), Query.isNull("deletedAt")]
    )) as AppwriteResponse<Order>;

    return { documents, total };
  }
  async getOrder(id: string): Promise<Order> {
    return (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_order,
      id
    )) as Order;
  }
  async createOrder(order: CreateOrderRequest): Promise<void> {
    try {
      // const items: Item[] =
      //   await itemsRepository.getItemsByIds(order.items);
      // let totalPrice = 0;
      // items.forEach((item) => {
      //   const selectedItem = order.items.find((i) => i.itemId === item.$id);
      //   if (selectedItem) {
      //     totalPrice += item.price * selectedItem.quantity;
      //   }
      // });

      // const orderRequest: OrderRequest = {
      //   userId: order.userId,
      //   items: items,
      //   totalPrice: totalPrice,
      //   status: 0,
      // };

      const result = await Appwrite.functions.createExecution(
        "6566e3017ed5ff75b429",
        JSON.stringify(order),
        false,
        "/",
        "POST"
      )

      console.log("Executed");
      console.log(result);
      
      
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateOrder(order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async updateOrderStatus(id: string, status: number): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}
