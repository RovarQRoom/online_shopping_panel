export interface ICardsRepository {
    getCards(): Promise<Card[]>;

    getCard(id: string): Promise<Card>;

    createCard(card: Card): Promise<Card>;

    updateCard(card: Card): Promise<Card>;

    deleteCard(id: string): Promise<void>;
}