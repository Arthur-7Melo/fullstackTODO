import mongoose, { Schema, Document, Types} from "mongoose";

export interface ITodo extends Document{
  _id: Types.ObjectId;
  title: string;
  description?: string;
  priority: 'baixa' | 'alta';
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date
}

const TodoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    enum: ['baixa', 'alta'],
    default: 'baixa'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
},
 {timestamps: true}
);

export const Todo = mongoose.model<ITodo>('Todo', TodoSchema);