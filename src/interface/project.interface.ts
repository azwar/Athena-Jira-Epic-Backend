import { Document, Types } from 'mongoose';
export interface IProject extends Document {
  readonly id: Types.ObjectId;
  readonly name: string;
  readonly workspaceId: string;
  readonly code: string;
  readonly description: string;
  readonly creator: Types.ObjectId;
  readonly epicId: string;
  readonly createdAt?: number;
  readonly updatedAt?: number;
  readonly projectMember: Types.ObjectId[];
}
