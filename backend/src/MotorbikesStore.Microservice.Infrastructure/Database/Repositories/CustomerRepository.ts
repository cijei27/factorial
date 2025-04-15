import mongoose, { Document, Model } from "mongoose";
import { ICustomerRepository } from "../../../MotorbikesStore.Microservice.Domain/Interfaces/ICustomerRepository";
import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";

// Definición de documento Mongoose
export interface ICustomerDocument extends Document {
  // Mongoose generará su propio _id de tipo ObjectId
  name: string;
  email: string;
  credit: number;
}

const CustomerSchema = new mongoose.Schema<ICustomerDocument>({
  // Sin definir _id, Mongoose asignará un ObjectId automáticamente
  name: { type: String, required: true },
  email: { type: String, required: true },
  credit: { type: Number, default: 0 },
});

CustomerSchema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : "";
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Igual para toJSON
CustomerSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : "";
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const CustomerModel: Model<ICustomerDocument> =
  mongoose.model<ICustomerDocument>("Customer", CustomerSchema);

export class CustomerRepository implements ICustomerRepository {
  async create(customer: Customer): Promise<Customer> {
    // No asignamos _id; Mongoose generará uno de tipo ObjectId
    const docToSave = {
      name: customer.name,
      email: customer.email.value,
      credit: customer.credit.value,
    };
    const createdDoc = await CustomerModel.create(docToSave);
    return this.mapDocumentToEntity(createdDoc.toObject());
  }

  async findById(id: string): Promise<Customer | null> {
    const doc = await CustomerModel.findById(id);
    if (!doc) return null;
    return this.mapDocumentToEntity(doc.toObject());
  }

  async increaseCredit(
    id: string,
    data: Partial<Customer>
  ): Promise<Customer | null> {
    const updateData: Partial<ICustomerDocument> = {};

    if (data.credit) updateData.credit = data.credit.value; // Asegúrate de acceder al valor del crédito

    const updated = await CustomerModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) return null;
    return this.mapDocumentToEntity(updated.toObject());
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer | null> {
    const updateData: Partial<ICustomerDocument> = {};

    const updated = await CustomerModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) return null;
    return this.mapDocumentToEntity(updated.toObject());
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await CustomerModel.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );
    return !!deleted;
  }

  async findAllSortedByCredit(): Promise<Customer[]> {
    const docs = await CustomerModel.find().sort({ credit: -1 });
    return docs.map((doc) => this.mapDocumentToEntity(doc.toJSON()));
  }

  private mapDocumentToEntity(plain: any): Customer {
    return new Customer(
      plain.name,
      plain.email,
      plain.credit,
      plain.id // Devuelto por la transformación
    );
  }
}

export default new CustomerRepository();
