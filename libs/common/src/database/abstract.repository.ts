import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

/**
 * A common repository which all the repositories from our microservices extend from. It provides
 * commonly used CRUD operations. It makes sure we don't have to duplicate the code in all our
 * microservices.
 */
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  // We makes it protected so that sub-classes can have access to them and implement custom
  // functionality.
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    const savedDocument = await createdDocument.save();
    const jsonDocument = savedDocument.toJSON();
    return jsonDocument as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  /**
   * { new: true } returns the newly updated document instead of the old document.
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ) {
    const updatedDocument = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      { lean: true, new: true },
    );

    if (!updatedDocument) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return updatedDocument;
  }

  /**
   * Finds all the documents.
   */
  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
