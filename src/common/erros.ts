export class NotFoundError extends Error {
  constructor(entity: string, key: string, attribute: string = 'id') {
    super(`${entity} with id ${attribute} ${key} not found`);
  }
}
