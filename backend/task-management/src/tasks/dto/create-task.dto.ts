export class CreateTaskDto {
  title: string;
  description?: string;
  isComplete?: boolean;
  userId: number;
}
