import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { Order } from "$lib/Models/Entities/Order.Entities.Model";
import type { CreateOrderRequest } from "$lib/Models/Requests/CreateOrder.Request";
import type { IOrdersRepository } from "$lib/Repositories/Interface/I.Orders.Repository";
import { Query } from "appwrite";

export class OrdersRepository implements IOrdersRepository {
  async getOrders(): Promise<AppwriteResponse<Order>> {
    const { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_order,
      [Query.isNull("deletedAt")]
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
      await Appwrite.functions.createExecution(
        Environment.appwrite_function_create_order,
        JSON.stringify(order),
        false,
        "/",
        "POST"
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateOrder(order: Order): Promise<Order> {
    const orderResult = await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_order,
      order.$id,
      order
    );
    return orderResult as Order;
  }
  async updateOrderStatus(id: string, status: number): Promise<Order> {
    const orderResult = await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_order,
      id,
      {
        status,
      }
    );
    return orderResult as Order;
  }
}
