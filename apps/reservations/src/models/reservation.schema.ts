import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  /**
   * Time when this reservation was created.
   */
  @Prop()
  timestamp: Date;

  /**
   * Time when the reservation starts.
   */
  @Prop()
  startData: Date;

  /**
   * Time when the reservation ends.
   */
  @Prop()
  endDate: Date;

  /**
   * The user with whom this reservation is associated.
   */
  @Prop()
  userId: string;

  /**
   * The place with which this reservation is associated.
   */
  @Prop()
  placeId: string;

  /**
   * The invoice with which this reservation is associated.
   */
  @Prop()
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
